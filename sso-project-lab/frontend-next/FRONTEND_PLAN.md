# Frontend Implementation Plan (Updated with SSO & Nginx Architecture)

แผนการพัฒนาระบบ Frontend ด้วย Next.js สำหรับโปรเจกต์ร้านค้าออนไลน์ (E-Commerce) ที่รองรับ SSO แบบเต็มรูปแบบ โดยสื่อสารผ่าน Nginx Gateway เป็นประตูเดียว (Single Entry Point)

## เป้าหมาย (Goal)
สร้างโปรเจกต์ Next.js ในโฟลเดอร์ `frontend-next` โดยนำโค้ด HTML/CSS (Desktop & Mobile) ที่ให้มาแปลงเป็น React Components พร้อมกับสร้างระบบเรียก API (API Integration) ไปยัง **Nginx Gateway (`http://localhost`)** อย่างถูกต้องและปลอดภัยตามหลักการของระบบ Single Sign-On (SSO) โดยจะไม่มีระบบการสมัครสมาชิก (Register) ที่ Frontend อีกต่อไป

## ข้อควรระวังและการรีวิวจากผู้ใช้ (User Review Required)

> [!IMPORTANT]
> **ระบบประตูเดียว (Single Entry Point) & SSO** 
> 1. Frontend จะต้องเรียก API ทั้งหมดไปที่ `http://localhost/api/...` เท่านั้น ห้ามเรียกตรงไปที่ FastAPI (Port 8000) หรือ Central Auth (Port 3000) เด็ดขาด
> 2. **ไม่มีระบบ Register:** ระบบนี้เป็น SSO ที่ผูกกับ FreeRADIUS ดังนั้น Frontend จะมีแค่หน้า Login เท่านั้น การสมัครสมาชิกจะทำผ่านระบบกลางนอกเหนือแอปพลิเคชันนี้
> 3. **Role-based Authentication:** เมื่อล็อกอินสำเร็จผ่าน `/api/auth/login` ระบบ SSO (Central Auth) จะคืนค่า JWT Access Token พร้อม Role ของผู้ใช้ (เช่น `admin` หรือ `customer`) ให้ Frontend เก็บไว้ใน `localStorage` หรือ `Cookie` 
> 4. **การจ่ายเงิน:** ระบบอัปเดตให้รองรับการใช้ **เครดิต (Credit)** ในการซื้อสินค้า โดยจะมีหน้า Top-up (เติมเงิน) ให้ผู้ใช้

## การเปลี่ยนแปลงที่นำเสนอ (Proposed Changes)

### 1. การตั้งค่าโปรเจกต์ (Project Setup)
สร้างโปรเจกต์ `create-next-app` ใน `frontend-next` พร้อมตั้งค่า Tailwind CSS และ TypeScript

### 2. โครงสร้างคอมโพเนนต์หลัก (UI Components)
แปลง HTML เป็น React Components เพื่อรองรับการทำงานแบบ Dynamic:
- `Navbar` / `BottomNav` / `Footer`
- `ProductCard` / `OrderCard` / `AuthFlipper` (ปรับปรุงลบส่วน Register ออก เหลือเพียง Login)

### 3. โครงสร้างหน้าเว็บ (Pages)
- `app/page.tsx` (Home & Store)
- `app/auth/page.tsx` (Login - จัดการ State การล็อกอินและรับ JWT) *ลบ Register ออก*
- `app/(protected)/profile/page.tsx` (ดึงข้อมูล Profile จาก `/api/users/me` และประวัติการสั่งซื้อจาก `/api/orders/my-orders`)
- `app/(protected)/topup/page.tsx` (หน้าสำหรับเติมเครดิตเข้าสู่ระบบ ยิง API `POST /api/users/topup`)
- `app/cart/page.tsx` (จัดการตะกร้า และสั่งซื้อผ่าน `POST /api/orders/` ซึ่งจะทำการตัดเครดิตอัตโนมัติ)
- `app/(admin)/manage-products/page.tsx` (หน้าสำหรับ Admin ในการเพิ่ม/ลบสินค้า)

### 4. การจัดการ API ผ่าน Nginx (API Integration)
#### [UPDATE] `frontend-next/src/lib/api.ts` (Axios หรือ Fetch)
จะทำการสร้างฟังก์ชันสำหรับการเชื่อมต่อ Backend อย่างถูกต้องตามสถาปัตยกรรม Gateway:

- **ตั้งค่า Base URL:** กำหนดให้เรียกไปที่ `http://localhost` (Nginx) โดยใช้ตัวแปรแวดล้อม `NEXT_PUBLIC_API_URL`
- **การเพิ่ม Token เข้าไปใน Header อัตโนมัติ (Interceptor):** สร้างตัวดักจับ Request ว่าถ้าหากเป็นการยิง API ที่ต้องการ Authorization จะทำการดึง JWT Token ออกมาจาก Storage (เช่น localStorage) แล้วแนบ `Authorization: Bearer <token>` ไปด้วยโดยอัตโนมัติ

**รายการ API ที่จะสร้างการเชื่อมต่อ:**
1. `loginAPI(username, password)` -> `POST /api/auth/login` (ยิงผ่าน Nginx ไปยัง SSO Central Auth)
2. *ลบ registerAPI ออกจากระบบ*
3. `getProductsAPI()` -> `GET /api/products/`
4. `getUserProfileAPI()` -> `GET /api/users/me` (ดึงข้อมูลที่มี `credit_balance` กลับมาด้วย)
5. `topupAPI(amount)` -> `POST /api/users/topup` (เติมเงินเครดิต)
6. `getMyOrdersAPI()` -> `GET /api/orders/my-orders`
7. `createOrderAPI(cartData)` -> `POST /api/orders/` (ทำการซื้อสินค้าและตัดเครดิต)
8. `addProductAPI(data)` -> `POST /api/products/` (สำหรับ Admin)
9. `deleteProductAPI(id)` -> `DELETE /api/products/{id}` (สำหรับ Admin)

### 5. การจัดการ State ภายในแอป (State Management)
- **Auth & Role State:** เก็บสถานะผู้ใช้และเครดิตที่เหลืออยู่ เพื่อปรับเปลี่ยนเมนู เช่น แสดงเมนู Admin หาก Role เป็น `admin`
- **Cart State:** ใช้ Context API หรือ Zustand สำหรับจำข้อมูลสินค้าในตะกร้าระหว่างที่ผู้ใช้คลิกเลือกสินค้า และคำนวณยอดเงินรวม เพื่อเปรียบเทียบกับเครดิตของผู้ใช้

## แผนการตรวจสอบ (Verification Plan)
1. **การยืนยันตัวตน SSO:** ทดสอบเข้าสู่ระบบด้วย Username จาก FreeRADIUS (เช่น รหัสนักศึกษา หรือ admin66000001) ตรวจสอบว่าได้รับ JWT อย่างถูกต้อง
2. **การเติมเครดิต:** ทดสอบเข้าหน้า Top-up เติมเงินและเช็คยอดเงินอัปเดตในระบบผ่าน `/api/users/me`
3. **การสั่งซื้อด้วยเครดิต:** ทดสอบเพิ่มสินค้าลงตะกร้าและกดยืนยันสั่งซื้อ ตรวจสอบว่าระบบตัดสต๊อกและยอดเงินเครดิตในฐานข้อมูลอย่างถูกต้อง (สถานะ HTTP 200)
4. **การจัดการสินค้าของ Admin:** ล็อกอินด้วยบัญชี Admin ตรวจสอบว่าสามารถเพิ่มและลบสินค้าได้สำเร็จ หากล็อกอินด้วยบัญชีปกติ ต้องไม่สามารถทำรายการได้ (HTTP 403)
