'use client';

import { ShieldCheck, AlertCircle, RefreshCcw, HelpCircle } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 mb-8 shadow-sm text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 mb-6">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-4">
          นโยบายการคืนสินค้าและคืนเงิน
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          (Refund and Return Policy) <br/>
          GameStore ให้ความสำคัญกับความพึงพอใจของลูกค้า โปรดอ่านเงื่อนไขด้านล่างก่อนทำการสั่งซื้อสินค้าดิจิทัลทุกชนิด
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        
        {/* Section 1 */}
        <div className="bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-500/20 rounded-xl shrink-0 mt-1">
              <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">1. สินค้าประเภทดิจิทัล (Digital Goods)</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                สินค้าที่จำหน่ายบน GameStore ส่วนใหญ่เป็นสินค้าประเภทดิจิทัล เช่น บัตรเติมเงิน (Gift Cards), ไอเทมโค้ด (Item Codes), และบริการเติมเงินเข้าบัญชีเกมโดยตรง (Direct Top-up)
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                <li>เมื่อระบบจัดส่งรหัส (Code) หรือทำการเติมเงินเข้าบัญชีเกมสำเร็จแล้ว <strong>ทางเราขอสงวนสิทธิ์ในการไม่รับคืนสินค้า หรือคืนเงินในทุกกรณี</strong></li>
                <li>ผู้ซื้อมีหน้าที่ตรวจสอบ <strong>UID, Server, หรือ ID สำหรับการเติมเงิน</strong> ให้ถูกต้องก่อนกดยืนยันคำสั่งซื้อ หากผู้ซื้อกรอกข้อมูลผิดพลาดและระบบได้ทำการเติมเงินสำเร็จแล้ว จะไม่สามารถดึงยอดเงินคืนหรือเปลี่ยนบัญชีได้</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl shrink-0 mt-1">
              <RefreshCcw className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">2. กรณีที่สามารถขอคืนเงินได้ (Eligible for Refund)</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                คุณสามารถขอคืนเงิน (Refund) ได้เต็มจำนวนในกรณีต่อไปนี้:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                <li>ระบบเกิดข้อผิดพลาดทำให้ <strong>ไม่สามารถจัดส่งสินค้า</strong> หรือ <strong>เติมเงินไม่สำเร็จ</strong> ภายในระยะเวลาที่กำหนด (ปกติไม่เกิน 24 ชั่วโมง)</li>
                <li>สินค้าหรือรหัส (Code) ที่ได้รับ <strong>ใช้งานไม่ได้ หรือ ถูกใช้งานไปแล้วก่อนที่คุณจะได้รับ</strong> (ต้องมีหลักฐานยืนยัน เช่น วิดีโอขณะเปิดดูโค้ดและนำไปใช้งานทันที)</li>
                <li>สินค้าหมดสต็อกกะทันหันหลังจากที่คุณชำระเงินสำเร็จแล้ว</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-xl shrink-0 mt-1">
              <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">3. ขั้นตอนการขอคืนเงิน</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                หากคุณพบปัญหาและตรงตามเงื่อนไขในข้อ 2 โปรดดำเนินการดังนี้:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                <li>ติดต่อฝ่ายบริการลูกค้าผ่านช่องทาง <strong>Live Chat</strong> หรือ <strong>Line Official</strong> ภายใน 24 ชั่วโมงหลังเกิดปัญหา</li>
                <li>แจ้ง <strong>หมายเลขคำสั่งซื้อ (Order ID)</strong> และ <strong>รายละเอียดของปัญหา</strong> พร้อมแนบหลักฐาน (ภาพถ่ายหน้าจอ หรือ วิดีโอ)</li>
                <li>ทีมงานจะตรวจสอบปัญหาของท่านภายใน 1-3 วันทำการ</li>
                <li>หากได้รับการอนุมัติการคืนเงิน ยอดเงินจะถูกคืนกลับเข้าสู่ <strong>Credit Balance</strong> ของบัญชีท่านบน GameStore ทันที หรือคืนเข้าสู่บัญชีธนาคาร/บัตรเครดิตที่ใช้ชำระเงินภายใน 7-14 วันทำการ (ขึ้นอยู่กับนโยบายของธนาคาร)</li>
              </ol>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
