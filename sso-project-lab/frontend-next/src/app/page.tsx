import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sso_token');

  if (token) {
    redirect('/store');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-orange-50 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <main className="z-10 flex flex-col items-center justify-center p-8 text-center max-w-3xl">
        <div className="backdrop-blur-xl bg-white/70 p-12 rounded-[2rem] border border-white/50 shadow-2xl flex flex-col items-center transition-all hover:shadow-blue-500/20">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-orange-400 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-orange-500/30 transform rotate-3 hover:rotate-6 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500 tracking-tight mb-4 drop-shadow-sm">
            TPEJ STORE
          </h1>

          <p className="text-slate-600 text-lg md:text-xl max-w-md mb-10 leading-relaxed font-medium">
            Game ID Marketplace. Secure, fast, and seamless authentication for all our services.
          </p>

          <a
            href="/auth/"
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500/30 w-full md:w-auto shadow-xl shadow-orange-500/30 overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black mix-blend-overlay"></span>
            <span className="relative flex items-center gap-3 text-lg">
              Login with SSO
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>

          <div className="mt-8 text-sm text-slate-500 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.965 11.965 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secured by KMITL Central Auth
          </div>
        </div>
      </main>
    </div>
  );
}
