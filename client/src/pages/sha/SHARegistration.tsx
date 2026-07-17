import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ShieldCheck, Check, ArrowRight, User, Phone, CheckCircle2 } from 'lucide-react';

// Complete list of 47 Kenyan Counties mapped by code
const KENYAN_COUNTIES = [
  { code: "001", name: "Mombasa" }, { code: "002", name: "Kwale" }, { code: "003", name: "Kilifi" },
  { code: "004", name: "Tana River" }, { code: "005", name: "Lamu" }, { code: "006", name: "Taita-Taveta" },
  { code: "007", name: "Garissa" }, { code: "008", name: "Wajir" }, { code: "009", name: "Mandera" },
  { code: "010", name: "Marsabit" }, { code: "011", name: "Isiolo" }, { code: "012", name: "Meru" },
  { code: "013", name: "Tharaka-Nithi" }, { code: "014", name: "Embu" }, { code: "015", name: "Kitui" },
  { code: "016", name: "Machakos" }, { code: "017", name: "Makueni" }, { code: "018", name: "Nyandarua" },
  { code: "019", name: "Nyeri" }, { code: "020", name: "Kirinyaga" }, { code: "021", name: "Murang'a" },
  { code: "022", name: "Kiambu" }, { code: "023", name: "Turkana" }, { code: "024", name: "West Pokot" },
  { code: "025", name: "Samburu" }, { code: "026", name: "Trans-Nzoia" }, { code: "027", name: "Uasin Gishu" },
  { code: "028", name: "Elgeyo-Marakwet" }, { code: "029", name: "Nandi" }, { code: "030", name: "Baringo" },
  { code: "031", name: "Laikipia" }, { code: "032", name: "Nakuru" }, { code: "033", name: "Narok" },
  { code: "034", name: "Kajiado" }, { code: "035", name: "Kericho" }, { code: "036", name: "Bomet" },
  { code: "037", name: "Kakamega" }, { code: "038", name: "Vihiga" }, { code: "039", name: "Bungoma" },
  { code: "040", name: "Busia" }, { code: "041", name: "Siaya" }, { code: "042", name: "Kisumu" },
  { code: "043", name: "Homa Bay" }, { code: "044", name: "Migori" }, { code: "045", name: "Kisii" },
  { code: "046", name: "Nyamira" }, { code: "047", name: "Nairobi City" }
];

export default function SHARegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', // Default name to display on the dashboard
    idNo: '',
    phone: '',
    county: '',
    declaration: false
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleDashboardRedirect = () => {
    navigate('/sha/dashboard', { 
      state: { 
        userDetails: {
          firstName: formData.firstName,
          idNumber: formData.idNo,
          phoneNumber: formData.phone,
          county: formData.county
        } 
      } 
    });
  };

  return (
    /* ✅ Changed py-12 to pt-24 pb-12 so the form layout clears the fixed top navbar perfectly */
    <div className="bg-[#FAF9F6] min-h-screen pt-24 pb-12 lg:pt-32 lg:pb-20 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: SHA Registration Form */}
        <div className="w-full z-10">
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100/80 min-h-[580px] flex flex-col justify-between">
            <div>
              {/* Step Indicator Header */}
              {step <= 3 && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Social Health Authority</h1>
                    <p className="text-xs text-slate-500 mt-1">Application for Social Health Insurance Scheme</p>
                  </div>
                  <div className="bg-sky-50 text-[#0066cc] font-bold text-xs uppercase px-4 py-2 rounded-full self-start sm:self-auto shrink-0">
                    Step {step} of 3
                  </div>
                </div>
              )}

              {/* Step 1: Identity Information */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <User className="text-[#0066cc]" size={20} /> Step 1: Identity Information
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        className="mt-2 w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0066cc] outline-none text-base transition" 
                        placeholder="e.g. Benard Boiwo"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">National ID Number</label>
                      <input 
                        type="text" 
                        className="mt-2 w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0066cc] outline-none text-base transition" 
                        placeholder="e.g. 38739153"
                        value={formData.idNo}
                        onChange={(e) => setFormData({...formData, idNo: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">County of Residence</label>
                      <select 
                        className="mt-2 w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0066cc] outline-none text-base transition bg-white"
                        value={formData.county}
                        onChange={(e) => setFormData({...formData, county: e.target.value})}
                      >
                        <option value="">Select County</option>
                        {KENYAN_COUNTIES.map((c) => (
                          <option key={c.code} value={c.name}>
                            {c.code} - {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button 
                    onClick={handleNext} 
                    disabled={!formData.idNo || !formData.county || !formData.firstName}
                    className="mt-8 w-full bg-[#0066cc] hover:bg-[#0052a3] text-white py-4.5 rounded-full font-bold text-base transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-md shadow-blue-500/10"
                  >
                    Continue <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {/* Step 2: Contact Verification */}
              {step === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Phone className="text-[#0066cc]" size={20} /> Step 2: Contact Verification
                  </h3>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Mobile Phone Number</label>
                    <input 
                      type="tel" 
                      className="mt-2 w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0066cc] outline-none text-base transition" 
                      placeholder="e.g. 0723176847"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <span className="text-xs text-slate-400 mt-2.5 block leading-relaxed">
                      Required to receive validation OTP codes during account processing.
                    </span>
                  </div>
                  
                  <div className="flex gap-4 mt-8">
                    <button onClick={handlePrev} className="flex-1 py-4 border border-slate-200 rounded-full font-bold text-base text-slate-600 hover:bg-slate-50 transition">
                      Back
                    </button>
                    <button 
                      onClick={handleNext} 
                      disabled={!formData.phone}
                      className="flex-1 bg-[#0066cc] hover:bg-[#0052a3] text-white py-4 transition rounded-full font-bold text-base disabled:opacity-50 shadow-md shadow-blue-500/10"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Declaration & Consent */}
              {step === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <ShieldCheck className="text-[#0066cc]" size={20} /> Step 3: Declaration & Consent
                  </h3>
                  
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/50 space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      I hereby declare that the particulars given above are true and complete. I authorize the Social Health Authority (SHA) to verify my registration credentials with primary government databases.
                    </p>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="mt-1 h-5 w-5 rounded border-slate-300 text-[#0066cc] focus:ring-[#0066cc]"
                        checked={formData.declaration}
                        onChange={(e) => setFormData({...formData, declaration: e.target.checked})}
                      />
                      <span className="text-sm font-semibold text-slate-700">I confirm these details are accurate.</span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={handlePrev} className="flex-1 py-4 border border-slate-200 rounded-full font-bold text-base text-slate-600 hover:bg-slate-50 transition">
                      Back
                    </button>
                    <button 
                      disabled={!formData.declaration}
                      onClick={handleNext}
                      className="flex-1 bg-[#0066cc] hover:bg-[#0052a3] text-white py-4 rounded-full font-bold text-base transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-md shadow-blue-500/10"
                    >
                      Submit Application <Check size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Success Screen */}
              {step === 4 && (
                <div className="text-center py-8 space-y-6 animate-fadeIn">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={44} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Application Submitted!</h2>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Your details have been registered under SHA. A verification text message has been sent to your phone.
                  </p>
                  <button 
                    onClick={handleDashboardRedirect} 
                    className="inline-block bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold px-10 py-4 rounded-full text-base transition shadow-md shadow-blue-500/15"
                  >
                    Go to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full h-[450px] md:h-[550px] lg:h-[620px]">
          <img 
            src="https://kismetcollege.com/wp-content/uploads/2025/11/IMG_9387-1024x1024.jpg" 
            alt="Kenyan healthcare professionals" 
            className="w-full h-full object-cover rounded-tl-[120px] rounded-br-[120px] rounded-bl-[120px] shadow-sm"
          />
        </div>

      </div>
    </div>
  );
}