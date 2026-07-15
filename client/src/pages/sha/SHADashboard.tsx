import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  Heart, 
  Calendar, 
  FileText, 
  Pill, 
  Shield, 
  LogOut 
} from 'lucide-react';

export default function SHADashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Pick up dynamic state from registration or login; fallback to standard test data if missing
  const user = location.state?.userDetails || {
    firstName: 'john doe',
    idNumber: '0123456789',
    phoneNumber: '07123456789',
    county: 'Nairobi City'
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-white border-r border-slate-100 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Brand Header */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-[#0066cc] tracking-tight">DHA</span>
            <span className="text-xl font-bold text-slate-800 tracking-tight">Afyangu</span>
          </div>

          {/* Mini Profile Panel showing Registered User details */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Account Owner</p>
            <p className="text-sm font-bold text-slate-800 truncate">{user.firstName}</p>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">ID: {user.idNumber}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">County: {user.county}</p>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#0066cc] text-white font-medium rounded-xl text-sm transition">
              <Home size={18} /> Home
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-xl text-sm transition">
              <User size={18} /> My Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-xl text-sm transition">
              <Heart size={18} /> Personal Health
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-xl text-sm transition">
              <Calendar size={18} /> Appointments
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-xl text-sm transition">
              <FileText size={18} /> Health Records
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-xl text-sm transition">
              <Pill size={18} /> Prescriptions
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-xl text-sm transition">
              <Shield size={18} /> Insurance Cover
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
          <button 
            onClick={() => navigate('/')} 
            className="w-full flex items-center gap-3 px-4 py-2 text-slate-600 hover:text-red-500 font-medium rounded-xl text-sm transition"
          >
            <LogOut size={18} /> Logout
          </button>
          <div className="text-[10px] text-slate-400 px-4 space-y-1">
            <p className="hover:underline cursor-pointer">Terms & Conditions · Privacy</p>
            <p>Version: 1.0.208</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 max-w-7xl overflow-y-auto">
        {/* Welcome Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Welcome {user.firstName}
            </h1>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              Self-Employed
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            This is a history detailing your hospital visits and medical history.
          </p>
        </header>

        {/* Premium Contribution Card */}
        <section className="bg-gradient-to-r from-sky-50 to-emerald-50/30 p-6 lg:p-8 rounded-3xl border border-sky-100/50 shadow-sm mb-8 relative overflow-hidden">
          <div className="max-w-xl space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">SHIF Premium Contribution</h2>
              <p className="text-xs text-slate-500 mt-1">
                Pay for your SHIF premium contributions by clicking 'pay' to contribute to SHA.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500">SHA Coverage</span>
                <span className="text-[11px] font-extrabold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Inactive
                </span>
              </div>
              <div className="flex gap-8">
                <div>
                  <span className="text-xs text-slate-400 block">Payable Amount</span>
                  <span className="text-2xl font-black text-slate-900">KES 6,600</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Verification Number</span>
                  <span className="text-sm font-bold text-slate-700 block mt-1">{user.phoneNumber}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button className="px-6 py-2.5 bg-[#0066cc] text-white text-xs font-bold rounded-lg shadow-md hover:bg-blue-700 transition">
                Pay
              </button>
              <button className="px-5 py-2.5 bg-[#00A859] text-white text-xs font-bold rounded-lg shadow-md hover:bg-emerald-700 transition uppercase tracking-wider">
                Lipa SHA Pole Pole
              </button>
            </div>
          </div>
          
          {/* Logo Watermark */}
          <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 opacity-90 text-right space-y-1">
            <span className="text-3xl font-black text-[#0066cc] block leading-none">SHA</span>
            <span className="text-sm font-bold text-slate-500 block">Social Health Authority</span>
            <span className="text-[10px] italic text-[#00A859] font-semibold block">Bima Bora, Afya Nyumbani</span>
          </div>
        </section>

        {/* Bottom Grid Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Insurance Covers Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-[180px]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Insurance Covers</h3>
                <p className="text-xs text-slate-400 mt-0.5">You are currently insured by these providers</p>
              </div>
              <button className="text-[11px] font-bold text-[#0066cc] border border-[#0066cc]/20 px-2.5 py-1 rounded-lg hover:bg-blue-50/50">
                View all
              </button>
            </div>
            <div className="bg-slate-50/80 p-3 rounded-2xl flex items-center justify-between border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0066cc]/10 flex items-center justify-center text-xs font-black text-[#0066cc]">SHA</div>
                <span className="text-xs font-bold text-slate-700">Social Health Authority</span>
              </div>
              <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">Inactive</span>
            </div>
          </div>

          {/* Claims Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-[180px]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Claims</h3>
                <p className="text-xs text-slate-400 mt-0.5">Here are your recent claims</p>
              </div>
              <button className="text-[11px] font-bold text-[#0066cc] border border-[#0066cc]/20 px-2.5 py-1 rounded-lg hover:bg-blue-50/50">
                View all
              </button>
            </div>
            <div className="flex flex-col items-center justify-center pb-2">
              <span className="text-xs text-slate-400">You have no claims</span>
            </div>
          </div>

          {/* Recent Visits Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-[180px]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Recent Visits</h3>
                <p className="text-xs text-slate-400 mt-0.5">Your latest visits</p>
              </div>
              <button className="text-[11px] font-bold text-[#0066cc] border border-[#0066cc]/20 px-2.5 py-1 rounded-lg hover:bg-blue-50/50">
                View all
              </button>
            </div>
            <div className="flex flex-col items-center justify-center pb-2">
              <span className="text-xs text-slate-400">You have no visits</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}