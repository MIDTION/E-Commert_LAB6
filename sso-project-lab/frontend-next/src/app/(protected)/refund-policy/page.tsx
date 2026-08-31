'use client';

import { ShieldCheck, AlertCircle, RefreshCcw, HelpCircle } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-8 md:p-12 mb-8 shadow-sm text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-blue-500 to-orange-400 text-white mb-6 shadow-xl shadow-orange-500/20 transform rotate-3">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500 mb-4 tracking-tight">
            นโยบายการคืนสินค้าและคืนเงิน
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            (Refund and Return Policy) <br/>
            TPEJ STORE ให้ความสำคัญกับความพึงพอใจของลูกค้า โปรดอ่านเงื่อนไขด้านล่างก่อนทำการสั่งซื้อสินค้าดิจิทัลทุกชนิด
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        
        {/* Section 1 */}
        <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start gap-5">
            <div className="p-4 bg-orange-50 rounded-2xl shrink-0 border border-orange-100">
              <AlertCircle className="w-7 h-7 text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">1. สินค้าประเภทดิจิทัล (Digital Goods)</h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-4">
                สินค้าที่จำหน่ายบน TPEJ STORE ส่วนใหญ่เป็นสินค้าประเภทดิจิทัล เช่น บัตรเติมเงิน (Gift Cards), ไอเทมโค้ด (Item Codes), และบริการเติมเงินเข้าบัญชีเกมโดยตรง (Direct Top-up)
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 font-medium">
                <li>เมื่อระบบจัดส่งรหัส (Code) หรือทำการเติมเงินเข้าบัญชีเกมสำเร็จแล้ว <strong>ทางเราขอสงวนสิทธิ์ในการไม่รับคืนสินค้า หรือคืนเงินในทุกกรณี</strong></li>
                <li>ผู้ซื้อมีหน้าที่ตรวจสอบ <strong>UID, Server, หรือ ID สำหรับการเติมเงิน</strong> ให้ถูกต้องก่อนกดยืนยันคำสั่งซื้อ หากผู้ซื้อกรอกข้อมูลผิดพลาดและระบบได้ทำการเติมเงินสำเร็จแล้ว จะไม่สามารถดึงยอดเงินคืนหรือเปลี่ยนบัญชีได้</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start gap-5">
            <div className="p-4 bg-green-50 rounded-2xl shrink-0 border border-green-100">
              <RefreshCcw className="w-7 h-7 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">2. กรณีที่สามารถขอคืนเงินได้ (Eligible for Refund)</h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-4">
                คุณสามารถขอคืนเงิน (Refund) ได้เต็มจำนวนในกรณีต่อไปนี้:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 font-medium">
                <li>ระบบเกิดข้อผิดพลาดทำให้ <strong>ไม่สามารถจัดส่งสินค้า</strong> หรือ <strong>เติมเงินไม่สำเร็จ</strong> ภายในระยะเวลาที่กำหนด (ปกติไม่เกิน 24 ชั่วโมง)</li>
                <li>สินค้าหรือรหัส (Code) ที่ได้รับ <strong>ใช้งานไม่ได้ หรือ ถูกใช้งานไปแล้วก่อนที่คุณจะได้รับ</strong> (ต้องมีหลักฐานยืนยัน เช่น วิดีโอขณะเปิดดูโค้ดและนำไปใช้งานทันที)</li>
                <li>สินค้าหมดสต็อกกะทันหันหลังจากที่คุณชำระเงินสำเร็จแล้ว</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start gap-5">
            <div className="p-4 bg-blue-50 rounded-2xl shrink-0 border border-blue-100">
              <HelpCircle className="w-7 h-7 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-3">3. ขั้นตอนการขอคืนเงิน</h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-4">
                หากคุณพบปัญหาและตรงตามเงื่อนไขในข้อ 2 โปรดดำเนินการดังนี้:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-slate-600 font-medium">
                <li>ติดต่อฝ่ายบริการลูกค้าผ่านช่องทาง <strong>Live Chat</strong> หรือ <strong>Line Official</strong> ภายใน 24 ชั่วโมงหลังเกิดปัญหา</li>
                <li>แจ้ง <strong>หมายเลขคำสั่งซื้อ (Order ID)</strong> และ <strong>รายละเอียดของปัญหา</strong> พร้อมแนบหลักฐาน (ภาพถ่ายหน้าจอ หรือ วิดีโอ)</li>
                <li>ทีมงานจะตรวจสอบปัญหาของท่านภายใน 1-3 วันทำการ</li>
                <li>หากได้รับการอนุมัติการคืนเงิน ยอดเงินจะถูกคืนกลับเข้าสู่ <strong>Credit Balance</strong> ของบัญชีท่านบน TPEJ STORE ทันที หรือคืนเข้าสู่บัญชีธนาคาร/บัตรเครดิตที่ใช้ชำระเงินภายใน 7-14 วันทำการ (ขึ้นอยู่กับนโยบายของธนาคาร)</li>
              </ol>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
