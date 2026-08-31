# Frontend Implementation Plan (Updated with Backend Integration)

แผนการพัฒนาระบบ Frontend ด้วย Next.js สำหรับโปรเจกต์ร้านค้าออนไลน์ (E-Commerce) ที่รองรับ SSO และการเชื่อมต่อกับ FastAPI Backend ตามเอกสาร `BACKEND_PLAN.md`

## เป้าหมาย (Goal)
สร้างโปรเจกต์ Next.js ในโฟลเดอร์ `frontend-next` โดยนำโค้ด HTML/CSS (Desktop & Mobile) ที่ให้มาแปลงเป็น React Components พร้อมกับสร้างระบบเรียก API (API Integration) ไปยัง Backend (FastAPI: Port 8000) อย่างถูกต้องและปลอดภัยตามหลักการของระบบ Authentication / SSO

## ข้อควรระวังและการรีวิวจากผู้ใช้ (User Review Required)

> [!IMPORTANT]
> **การเชื่อมต่อ Auth API (Login/Register)** 
> อ้างอิงจาก `BACKEND_PLAN.md` Backend จะเปิดรับ API ที่ `http://localhost:8000/api/auth/login` (รับข้อมูลแบบ `x-www-form-urlencoded`) และคืนค่าเป็น **JWT Access Token** 
> 
> **ในส่วนของ Frontend:** จะใช้ UI Login/Register ที่เตรียมไว้ (Auth Flipper) เมื่อผู้ใช้กด Login จะยิงข้อมูลไปที่ API ดังกล่าว และเมื่อได้ JWT กลับมา จะเก็บ Token ไว้ใน `localStorage` หรือ `Cookie` เพื่อใช้เป็น **Bearer Token** สำหรับแนบไปใน Header ของการเรียก API อื่นๆ (เช่น ดึงโปรไฟล์, สร้างออเดอร์) ซึ่งตรงตามหลักการทำ API-Driven SSO Authentication

## การเปลี่ยนแปลงที่นำเสนอ (Proposed Changes)

### 1. การตั้งค่าโปรเจกต์ (Project Setup)
สร้างโปรเจกต์ `create-next-app` ใน `frontend-next` พร้อมตั้งค่า Tailwind CSS และ TypeScript

### 2. โครงสร้างคอมโพเนนต์หลัก (UI Components)
แปลง HTML เป็น React Components เพื่อรองรับการทำงานแบบ Dynamic:
- `Navbar` / `BottomNav` / `Footer`
- `ProductCard` / `OrderCard` / `AuthFlipper`

### 3. โครงสร้างหน้าเว็บ (Pages)
- `app/page.tsx` (Home & Store)
- `app/auth/page.tsx` (Login & Register - จัดการ State การล็อกอินที่นี่)
- `app/profile/page.tsx` (ดึงข้อมูล Profile จาก `/api/users/me` และประวัติการสั่งซื้อจาก `/api/orders/my-orders`)
- `app/cart/page.tsx` (จัดการตะกร้า และสั่งซื้อผ่าน `POST /api/orders/`)

### 4. การจัดการ API ยิงไปที่ Backend (API Integration)
#### [NEW] `frontend-next/src/lib/api.ts` (Axios หรือ Fetch)
จะทำการสร้างฟังก์ชันสำหรับการเชื่อมต่อ Backend อย่างถูกต้องตาม `BACKEND_PLAN.md`:

- **ตั้งค่า Base URL:** กำหนดให้เรียกไปที่ `http://localhost:8000` (หรือผ่าน Nginx ถ้ามีการรันผ่าน Gateway จริงๆ ตามตัวแปรแวดล้อม `NEXT_PUBLIC_API_URL`)
- **การเพิ่ม Token เข้าไปใน Header อัตโนมัติ (Interceptor):** สร้างตัวดักจับ Request ว่าถ้าหากเป็นการยิง API ที่ต้องการ Authorization จะทำการดึง JWT Token ออกมาจาก Storage (เช่น localStorage) แล้วแนบ `Authorization: Bearer <token>` ไปด้วยโดยอัตโนมัติ

**รายการ API ที่จะสร้างการเชื่อมต่อ:**
1. `loginAPI(username, password)` -> `POST /api/auth/login` (แปลง payload เป็น `URLSearchParams` ตามสเปค OAuth2)
2. `registerAPI(data)` -> `POST /api/auth/register`
3. `getProductsAPI()` -> `GET /api/products/`
4. `getUserProfileAPI()` -> `GET /api/users/me`
5. `getMyOrdersAPI()` -> `GET /api/orders/my-orders`
6. `createOrderAPI(cartData)` -> `POST /api/orders/`

### 5. การจัดการ State ภายในแอป (State Management)
- **Auth State:** เก็บสถานะว่าผู้ใช้ล็อกอินอยู่หรือไม่ เพื่อสลับการแสดงผลเมนู Profile / Login และทำการ Redirect หน้าเว็บ หากพยายามเข้าหน้า Profile แต่ยังไม่ล็อกอิน
- **Cart State:** ใช้ Context API หรือ Zustand สำหรับจำข้อมูลสินค้าในตะกร้าระหว่างที่ผู้ใช้คลิกเลือกสินค้า และคำนวณยอดเงินรวม

## แผนการตรวจสอบ (Verification Plan)
1. **การยืนยันตัวตน:** ทดลองสมัครสมาชิกและเข้าสู่ระบบ ตรวจสอบว่าได้รับ JWT และสามารถดึงข้อมูล Profile ได้อย่างถูกต้อง (สถานะ HTTP 200)
2. **การสั่งซื้อ:** ทดสอบเพิ่มสินค้าลงตะกร้าและกดยืนยันสั่งซื้อ ตรวจสอบว่าระบบส่ง Token พร้อม Payload สินค้าไปที่ Backend ได้อย่างถูกต้อง และแสดงผลประวัติการสั่งซื้อ
3. **การแสดงผล:** ตรวจสอบ Responsive Design ว่าตรงตามตัวอย่าง HTML ทั้งโหมด Desktop และ Mobile
