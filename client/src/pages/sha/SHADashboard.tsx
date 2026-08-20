
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, User, Heart, Calendar, FileText, Pill, Shield, LogOut, 
  CheckCircle, AlertCircle, Phone, CreditCard, Loader2, Sparkles, 
  Plus, Search, Eye, Filter, Download, Activity, AlertTriangle, X
} from 'lucide-react';
import { toast } from 'sonner';

export default function SHADashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract user details passed from registration, otherwise fallback to default values
  const userDetails = location.state?.userDetails || {
    firstName: 'john doe',
    idNumber: '2345678',
    phoneNumber: '0712345678',
    county: 'Wajir',
    email: 'johndoe@example.com'
  };

  //  STATE MANAGEMENT 
  const [activeTab, setActiveTab] = useState('Home');
  const [isCovered, setIsCovered] = useState(false);
  const [monthlyRate, setMonthlyRate] = useState(550);
  const [amountPayable, setAmountPayable] = useState(6600);
  
  // Modals
  const [showPayModal, setShowPayModal] = useState(false);
  const [showPolePoleModal, setShowPolePoleModal] = useState(false);
  const [viewAllType, setViewAllType] = useState<'covers' | 'claims' | 'payments' | null>(null);

  // Forms & Inputs
  const [mpesaPhone, setMpesaPhone] = useState(userDetails.phoneNumber);
  const [customPayAmount, setCustomPayAmount] = useState('550');
  const [isProcessing, setIsProcessing] = useState(false);

  // --- INTERACTIVE MOCK DATA ---
  
  // 1. My Profile State
  const [profileData, setProfileData] = useState({
    firstName: userDetails.firstName,
    idNumber: userDetails.idNumber,
    phoneNumber: userDetails.phoneNumber,
    county: userDetails.county,
    email: userDetails.email,
    dob: '1995-06-15',
    gender: 'Male',
    occupation: 'Self-Employed'
  });
  const [dependents, setDependents] = useState([
    { name: 'Jane Doe', relation: 'Spouse', idNumber: '8765432' }
  ]);
  const [newDepName, setNewDepName] = useState('');
  const [newDepRelation, setNewDepRelation] = useState('Spouse');
  const [newDepId, setNewDepId] = useState('');

  
  const [healthMetrics, setHealthMetrics] = useState({
    bloodType: 'O+',
    allergies: 'Penicillin, Peanuts',
    chronicConditions: 'None',
    height: '175 cm',
    weight: '72 kg',
    emergencyContact: 'Mary Doe (0722000111)'
  });

  const [appointments, setAppointments] = useState([
    { id: 'APT-102', hospital: 'Wajir County Referral Hospital', department: 'General Consultation', date: '2026-07-20', time: '10:00 AM', status: 'Confirmed' }
  ]);
  const [bookHospital, setBookHospital] = useState('Wajir County Referral Hospital');
  const [bookDept, setBookDept] = useState('General Consultation');
  const [bookDate, setBookDate] = useState('');
  const [bookTime, setBookTime] = useState('09:00 AM');


  const [healthRecords, setHealthRecords] = useState([
    { id: 'REC-901', date: '2026-05-12', facility: 'Wajir County Referral Hospital', diagnosis: 'Acute Tonsillitis', doctor: 'Dr. Kiprop', status: 'Archived' },
    { id: 'REC-704', date: '2026-02-28', facility: 'Afya Link Clinic', diagnosis: 'Mild Food Poisoning', doctor: 'Dr. Amina', status: 'Archived' }
  ]);


  const [prescriptions, setPrescriptions] = useState([
    { id: 'RX-441', date: '2026-05-12', medication: 'Amoxicillin 500mg', instructions: '1 tablet 3 times a day for 7 days', status: 'Dispensed' },
    { id: 'RX-102', date: '2026-02-28', medication: 'ORS & Zinc Sulphate', instructions: 'Dissolve 1 sachet in 1L water', status: 'Completed' }
  ]);

  
  const [claims, setClaims] = useState([
    { id: 'CLM-9081', facility: 'Wajir County Referral Hospital', service: 'Outpatient Treatment', amount: 1500, status: 'Approved', date: '2026-05-12' },
    { id: 'CLM-3302', facility: 'Afya Link Clinic', service: 'Laboratory Tests', amount: 850, status: 'Pending Approval', date: '2026-06-01' }
  ]);

  
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);

  
  const handleMpesaSTKPush = (amount: number) => {
    if (!mpesaPhone.match(/^(?:254|\+254|0)?(7|1)\d{8}$/)) {
      toast.error("Please enter a valid Kenyan Safaricom phone number.");
      return;
    }

    setIsProcessing(true);
    toast.loading("Sending M-Pesa STK Push. Please check your phone...", { id: "mpesa-stk" });

    setTimeout(() => {
      toast.success("STK Push Received! Enter your M-Pesa PIN.", { id: "mpesa-stk" });
      
      setTimeout(() => {
        setIsProcessing(false);
        setShowPayModal(false);
        setShowPolePoleModal(false);
        
        const remaining = Math.max(0, amountPayable - amount);
        setAmountPayable(remaining);
        
        const newTx = {
          id: `TXN${Math.floor(100000 + Math.random() * 900000)}`,
          amount: amount,
          date: new Date().toLocaleDateString(),
          status: 'Completed'
        };
        setPaymentHistory([newTx, ...paymentHistory]);

        if (remaining === 0 || amount >= monthlyRate) {
          setIsCovered(true);
          toast.success(`Payment of KES ${amount.toLocaleString()} Confirmed! Your SHA coverage is now ACTIVE.`, { duration: 5000 });
        } else {
          toast.success(`Payment of KES ${amount.toLocaleString()} received. Keep paying to activate full coverage.`);
        }
      }, 3000);
    }, 2000);
  };

  
  const handleAddDependent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDepName || !newDepId) {
      toast.error("Please fill in all dependent details.");
      return;
    }
    setDependents([...dependents, { name: newDepName, relation: newDepRelation, idNumber: newDepId }]);
    setNewDepName('');
    setNewDepId('');
    toast.success("Dependent added successfully.");
  };

 
  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookDate) {
      toast.error("Please pick a date.");
      return;
    }
    const newApt = {
      id: `APT-${Math.floor(100 + Math.random() * 900)}`,
      hospital: bookHospital,
      department: bookDept,
      date: bookDate,
      time: bookTime,
      status: 'Confirmed'
    };
    setAppointments([newApt, ...appointments]);
    setBookDate('');
    toast.success(`Appointment successfully booked at ${bookHospital}!`);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen flex text-slate-800 font-sans">
      
      
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between p-6 fixed h-full z-20">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl text-[#0066cc] tracking-tight">DHA Afyangu</span>
          </div>

          
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100/50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account Owner</p>
            <h4 className="font-bold text-slate-800 text-sm truncate mt-1 capitalize">{profileData.firstName}</h4>
            <p className="text-xs text-slate-500 mt-0.5">ID: {profileData.idNumber}</p>
            <p className="text-xs text-slate-500">County: {profileData.county}</p>
          </div>

          <nav className="space-y-1">
            {[
              { name: 'Home', icon: Home },
              { name: 'My Profile', icon: User },
              { name: 'Personal Health', icon: Heart },
              { name: 'Appointments', icon: Calendar },
              { name: 'Health Records', icon: FileText },
              { name: 'Prescriptions', icon: Pill },
              { name: 'Insurance Cover', icon: Shield }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                    isActive 
                      ? 'bg-[#0066cc] text-white' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* MAIN VIEW AREA */}
      <main className="flex-1 ml-64 p-8 lg:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          
        
          {activeTab === 'Home' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 capitalize">
                  Welcome {profileData.firstName}
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${isCovered ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {isCovered ? 'Active Member' : 'Self-Employed'}
                  </span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">This is a history detailing your hospital visits and medical history.</p>
              </div>

              
              <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="max-w-2xl space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">SHIF Premium Contribution</h3>
                    <p className="text-sm text-slate-500 mt-1">Pay for your SHIF premium contributions by clicking 'pay' to contribute to SHA.</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-8 py-2">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">SHA Coverage</span>
                      <div className={`flex items-center gap-1.5 mt-1 font-black ${isCovered ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {isCovered ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                        {isCovered ? 'ACTIVE' : 'INACTIVE'}
                      </div>
                    </div>

                    <div className="h-8 w-[1px] bg-slate-100 hidden sm:block"></div>

                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payable Balance</span>
                      <p className="text-xl font-black text-slate-800 mt-0.5">KES {amountPayable.toLocaleString()}</p>
                    </div>

                    <div className="h-8 w-[1px] bg-slate-100 hidden sm:block"></div>

                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verification Number</span>
                      <p className="text-sm font-bold text-slate-700 mt-1">{profileData.phoneNumber}</p>
                    </div>
                  </div>

                  {amountPayable > 0 ? (
                    <div className="flex flex-wrap gap-4 pt-2">
                      <button 
                        onClick={() => setShowPayModal(true)}
                        className="bg-[#0066cc] hover:bg-[#0052a3] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-md shadow-blue-500/10"
                      >
                        Pay Full Premium
                      </button>
                      <button 
                        onClick={() => setShowPolePoleModal(true)}
                        className="bg-[#10b981] hover:bg-[#059669] text-white px-8 py-3.5 rounded-full font-bold text-sm transition shadow-md"
                      >
                        LIPA SHA POLE POLE
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 text-emerald-800 px-6 py-4 rounded-2xl flex items-center gap-3">
                      <CheckCircle size={20} className="shrink-0" />
                      <p className="text-sm font-semibold">Your SHA Premium is fully settled for this term. Thank you!</p>
                    </div>
                  )}
                </div>

                <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end text-right">
                  <span className="text-4xl font-black text-slate-200 tracking-tight">SHA</span>
                  <span className="text-xs font-bold text-slate-400 mt-1">Social Health Authority</span>
                  <span className="text-[10px] italic text-[#0066cc] mt-1 font-serif">Bima Bora, Afya Nyambani</span>
                </div>
              </section>

            
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-bold text-slate-800 text-sm">Insurance Covers</h4>
                      <button 
                        onClick={() => setViewAllType('covers')}
                        className="text-[10px] font-bold text-[#0066cc] uppercase tracking-wider hover:underline"
                      >
                        View all
                      </button>
                    </div>
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 text-[#0066cc] rounded-xl flex items-center justify-center font-bold text-xs">SHA</div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">Social Health Authority</p>
                          <p className="text-[10px] text-slate-400">Public Scheme</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${isCovered ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {isCovered ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Claims Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[180px]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-slate-800 text-sm">Claims</h4>
                      <button 
                        onClick={() => setViewAllType('claims')}
                        className="text-[10px] font-bold text-[#0066cc] uppercase tracking-wider hover:underline"
                      >
                        View all
                      </button>
                    </div>
                    
                    {claims.length > 0 ? (
                      <div className="space-y-3">
                        {claims.slice(0, 2).map((claim) => (
                          <div key={claim.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl text-xs border border-slate-100/50">
                            <div>
                              <p className="font-bold text-slate-800 truncate max-w-[120px]">{claim.facility}</p>
                              <p className="text-[10px] text-slate-400">{claim.service}</p>
                            </div>
                            <span className={`font-bold text-[10px] ${claim.status.includes('Approved') ? 'text-emerald-600' : 'text-amber-600'}`}>
                              {claim.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-6">You have no claims.</p>
                    )}
                  </div>
                </div>

                {/* 3. Recent Payments Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[180px]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-slate-800 text-sm">Recent Payments</h4>
                      <button 
                        onClick={() => setViewAllType('payments')}
                        className="text-[10px] font-bold text-[#0066cc] uppercase tracking-wider hover:underline"
                      >
                        View all
                      </button>
                    </div>
                    
                    {paymentHistory.length > 0 ? (
                      <div className="space-y-3">
                        {paymentHistory.slice(0, 2).map((tx) => (
                          <div key={tx.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl text-xs border border-slate-100">
                            <div>
                              <p className="font-bold text-slate-800">KES {tx.amount.toLocaleString()}</p>
                              <p className="text-[10px] text-slate-400">{tx.date}</p>
                            </div>
                            <span className="text-emerald-600 font-bold text-[10px]">Success</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-6">No recent payments logged.</p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: MY PROFILE */}
          {activeTab === 'My Profile' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900">My Profile</h2>
                <p className="text-sm text-slate-500 mt-1">Manage your account information and direct dependents.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Fields */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm md:col-span-2 space-y-6">
                  <h3 className="font-bold text-slate-800 text-base">Personal Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-xs text-slate-400">First Name</span>
                      <input 
                        type="text" 
                        value={profileData.firstName} 
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        className="w-full mt-1 p-3 border border-slate-100 rounded-xl bg-slate-50 capitalize font-bold"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">National ID</span>
                      <input 
                        type="text" 
                        value={profileData.idNumber} 
                        onChange={(e) => setProfileData({...profileData, idNumber: e.target.value})}
                        className="w-full mt-1 p-3 border border-slate-100 rounded-xl bg-slate-50 font-bold"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Phone Number</span>
                      <input 
                        type="tel" 
                        value={profileData.phoneNumber} 
                        onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                        className="w-full mt-1 p-3 border border-slate-100 rounded-xl bg-slate-50 font-bold"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Email Address</span>
                      <input 
                        type="email" 
                        value={profileData.email} 
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full mt-1 p-3 border border-slate-100 rounded-xl bg-slate-50 font-bold"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => toast.success("Profile details updated successfully!")}
                    className="bg-[#0066cc] text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-[#0052a3] transition"
                  >
                    Save Profile
                  </button>
                </div>

                {/* Dependents Segment */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
                  <h3 className="font-bold text-slate-800 text-base">Dependents</h3>
                  
                  {/* List */}
                  <div className="space-y-3">
                    {dependents.map((dep, index) => (
                      <div key={index} className="p-3 bg-slate-50 rounded-xl border border-slate-100/50 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-800">{dep.name}</p>
                          <p className="text-slate-400">{dep.relation} • ID: {dep.idNumber}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Dependent Form */}
                  <form onSubmit={handleAddDependent} className="space-y-3 pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Add New Dependent</p>
                    <input 
                      type="text" 
                      placeholder="Name" 
                      value={newDepName}
                      onChange={(e) => setNewDepName(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <select 
                        value={newDepRelation}
                        onChange={(e) => setNewDepRelation(e.target.value)}
                        className="p-2.5 border border-slate-200 rounded-xl text-xs bg-white"
                      >
                        <option value="Spouse">adult</option>
                        <option value="Child">Child</option>

                      </select>
                      <input 
                        type="text" 
                        placeholder="ID / Birth Cert" 
                        value={newDepId}
                        onChange={(e) => setNewDepId(e.target.value)}
                        className="p-2.5 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-slate-800 text-white py-2 rounded-xl text-xs font-bold hover:bg-slate-900 transition flex items-center justify-center gap-1"
                    >
                      <Plus size={14} /> Add Dependent
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PERSONAL HEALTH */}
          {activeTab === 'Personal Health' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Personal Health Profile</h2>
                <p className="text-sm text-slate-500 mt-1">Monitor your vital stats and self-reported medical information.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Health Card display */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
                      <Heart size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Critical Medical Information</h3>
                      <p className="text-xs text-slate-400">Shared with practitioners during hospital visits.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-50 pt-4">
                    <div>
                      <span className="text-xs text-slate-400">Blood Group</span>
                      <p className="font-bold text-slate-800 mt-0.5">{healthMetrics.bloodType}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Drug Allergies</span>
                      <p className="font-bold text-slate-800 mt-0.5">{healthMetrics.allergies}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Chronic Conditions</span>
                      <p className="font-bold text-slate-800 mt-0.5">{healthMetrics.chronicConditions}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Emergency Contact</span>
                      <p className="font-bold text-slate-800 mt-0.5">{healthMetrics.emergencyContact}</p>
                    </div>
                  </div>
                </div>

                {/* Edit details form */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800 text-base">Update Vitals</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-slate-400">Blood Type</label>
                      <select 
                        value={healthMetrics.bloodType} 
                        onChange={(e) => setHealthMetrics({...healthMetrics, bloodType: e.target.value})}
                        className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl bg-white"
                      >
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="O+">O+</option>
                        <option value="AB+">AB+</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-400">Emergency Contact Info</label>
                      <input 
                        type="text" 
                        value={healthMetrics.emergencyContact} 
                        onChange={(e) => setHealthMetrics({...healthMetrics, emergencyContact: e.target.value})}
                        className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Report Allergies</label>
                    <textarea 
                      value={healthMetrics.allergies} 
                      onChange={(e) => setHealthMetrics({...healthMetrics, allergies: e.target.value})}
                      className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl text-xs" 
                      rows={2}
                    />
                  </div>
                  <button 
                    onClick={() => toast.success("Medical profile updated!")}
                    className="w-full bg-slate-800 text-white py-3 rounded-xl text-xs font-bold hover:bg-slate-900 transition"
                  >
                    Save Health Vitals
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: APPOINTMENTS */}
          {activeTab === 'Appointments' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Hospital Appointments</h2>
                <p className="text-sm text-slate-500 mt-1">Book new consultations or check your schedule.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Appointment booking form */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
                  <h3 className="font-bold text-slate-800 text-base">Book Appointment</h3>
                  <form onSubmit={handleBookAppointment} className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-400">Select Medical Center</label>
                      <select 
                        value={bookHospital} 
                        onChange={(e) => setBookHospital(e.target.value)}
                        className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl text-xs bg-white"
                      >
                  <option value="Kenyatta National Hospital">Kenyatta National Hospital</option>
                        <option value="Aga Khan University Hospital">Aga Khan University Hospital</option>
                            <option value="Nairobi hospital">Nairobi hospital</option>
                        <option value="Moi Teaching and Referral Hospital">Moi Teaching and Referral Hospital</option>
                            <option value="Coast General Teaching Teaching Hospital">Coast General Teaching Hospital</option>
                        <option value="Kisumu County Referral Hospital">Kisumu County Referral Hospital</option>
                            <option value="Mp Shan Hospital">Mp Shan Hospital</option>
                        <option value="Gertrude's Children's Hospital">Gertrude's Children's Hospital</option>
                            <option value="Karen hospital">Karen hospital</option>
                        <option value="Nakuru provincial General Hospital">Nakuru provincial General Hospital</option>
                                           <option value="Thika Level 5 Hospital">Thika Level 5 Hospital</option>
                        <option value="Baringo County Referral Hospital">Baringo County Referral Hospital</option>
                                           <option value="Medical Center">Medical Center</option>
                        <option value="Pwani County Referral Hospital">Pwani County Referral Hospital</option>
                        <option value="Tenwek Mission Hospital">Tenwek Mission Hospital</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Select Department</label>
                      <select 
                        value={bookDept} 
                        onChange={(e) => setBookDept(e.target.value)}
                        className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl text-xs bg-white"
                      >
                        <option value="General Consultation">General Consultation</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Dental clinic">Dental clinic</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Appointment Date</label>
                      <input 
                        type="date" 
                        value={bookDate}
                        onChange={(e) => setBookDate(e.target.value)}
                        className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Preferred Time</label>
                      <select 
                        value={bookTime} 
                        onChange={(e) => setBookTime(e.target.value)}
                        className="w-full mt-1.5 p-3 border border-slate-200 rounded-xl text-xs bg-white"
                      >
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                      </select>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-[#0066cc] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#0052a3] transition"
                    >
                      Book Appointment
                    </button>
                  </form>
                </div>

                {/* Existing Appointments Schedule */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm md:col-span-2 space-y-6">
                  <h3 className="font-bold text-slate-800 text-base">Your Schedule</h3>
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div key={apt.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] bg-blue-50 text-[#0066cc] font-bold px-2 py-0.5 rounded-full">{apt.id}</span>
                          <h4 className="font-bold text-slate-800 text-sm mt-1">{apt.hospital}</h4>
                          <p className="text-xs text-slate-500">{apt.department}</p>
                        </div>
                        <div className="text-left sm:text-right space-y-1">
                          <p className="text-xs font-bold text-slate-700">{apt.date}</p>
                          <p className="text-[10px] text-slate-400">{apt.time}</p>
                          <span className="text-[10px] font-extrabold text-emerald-600 flex items-center gap-1 justify-end">
                            <CheckCircle size={12} /> {apt.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HEALTH RECORDS */}
          {activeTab === 'Health Records' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Health Records</h2>
                <p className="text-sm text-slate-500 mt-1">Official diagnoses and visit summaries synced directly from your service providers.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
                <div className="space-y-4">
                  {healthRecords.map((rec) => (
                    <div key={rec.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100/50 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">{rec.id}</span>
                          <span className="text-xs text-slate-400">{rec.date}</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-base">{rec.diagnosis}</h4>
                        <p className="text-xs text-slate-500 font-semibold">{rec.facility}</p>
                      </div>
                      <div className="flex flex-col justify-between items-start sm:items-end gap-2">
                        <p className="text-xs text-slate-400">Attending: <strong className="text-slate-700">{rec.doctor}</strong></p>
                        <span className="text-[10px] bg-slate-200 text-slate-600 font-extrabold px-3 py-1 rounded-full">{rec.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PRESCRIPTIONS */}
          {activeTab === 'Prescriptions' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Prescriptions</h2>
                <p className="text-sm text-slate-500 mt-1">Manage active or historical drug prescriptions details.</p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
                <div className="space-y-4">
                  {prescriptions.map((pres) => (
                    <div key={pres.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100/50 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-full">{pres.id}</span>
                          <span className="text-xs text-slate-400">{pres.date}</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-base">{pres.medication}</h4>
                        <p className="text-xs text-slate-500 italic">"{pres.instructions}"</p>
                      </div>
                      <div className="flex flex-col justify-end">
                        <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full text-center ${pres.status === 'Dispensed' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-600'}`}>
                          {pres.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: INSURANCE COVER */}
          {activeTab === 'Insurance Cover' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Insurance Cover Details</h2>
                <p className="text-sm text-slate-500 mt-1">Review coverage limits, benefits, and scheme structures.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
                  <h3 className="font-bold text-slate-800 text-base">Current Status</h3>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">Social Health Insurance (SHIF)</h4>
                      <p className="text-xs text-slate-400 mt-1">Universal scheme covering basic care package.</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${isCovered ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {isCovered ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
                  <h3 className="font-bold text-slate-800 text-base">Key Benefits Included</h3>
                  <ul className="space-y-3 text-xs text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500" /> Free primary healthcare center check-ups</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500" /> Subsidized emergency ambulance evacuations</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500" /> Chronic illness support programs</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500" /> Local public/mission hospital referrals</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* --- MODALS & OVERLAYS --- */}

      {/* 1. Pay Full Premium Modal */}
      {showPayModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-900 text-lg">Pay Full Term Contribution</h3>
              <button onClick={() => setShowPayModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-slate-500">You are completing payment for the current SHA registration term. Enter your phone number below.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">M-Pesa Mobile Number</label>
                <input 
                  type="tel" 
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  className="w-full mt-1.5 p-3.5 border border-slate-200 rounded-xl font-mono text-sm"
                  placeholder="e.g. 0712345678"
                  disabled={isProcessing}
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center">
                <span className="text-xs text-slate-500 font-bold">Total Term Payable</span>
                <span className="font-black text-slate-800 text-lg">KES {amountPayable.toLocaleString()}</span>
              </div>

              <button 
                onClick={() => handleMpesaSTKPush(amountPayable)}
                disabled={isProcessing}
                className="w-full bg-[#0066cc] text-white py-4 rounded-xl font-bold text-sm hover:bg-[#0052a3] transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing with Safaricom...
                  </>
                ) : (
                  <>
                    <CreditCard size={16} />
                    Request STK Push
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Pole Pole Installment Modal */}
      {showPolePoleModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-900 text-lg">Lipa SHA Pole Pole</h3>
              <button onClick={() => setShowPolePoleModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-slate-500">Pay your SHA balance step-by-step. Input your custom amount to activate or extend partial coverage.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">M-Pesa Mobile Number</label>
                <input 
                  type="tel" 
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  className="w-full mt-1.5 p-3.5 border border-slate-200 rounded-xl font-mono text-sm"
                  disabled={isProcessing}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Custom Amount (KES)</label>
                <input 
                  type="number" 
                  value={customPayAmount}
                  onChange={(e) => setCustomPayAmount(e.target.value)}
                  className="w-full mt-1.5 p-3.5 border border-slate-200 rounded-xl font-mono text-sm"
                  placeholder="e.g. 550"
                  disabled={isProcessing}
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center">
                <span className="text-xs text-slate-500 font-bold font-mono">Current Balance</span>
                <span className="font-bold text-rose-600 text-sm">KES {amountPayable.toLocaleString()}</span>
              </div>

              <button 
                onClick={() => handleMpesaSTKPush(Number(customPayAmount))}
                disabled={isProcessing}
                className="w-full bg-[#10b981] text-white py-4 rounded-xl font-bold text-sm hover:bg-[#059669] transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Lipa Instantly
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. View All Info Modals (Handles dynamic tables for Covers, Claims & Payments) */}
      {viewAllType && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-900 text-lg capitalize">{viewAllType} Logs</h3>
              <button onClick={() => setViewAllType(null)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="overflow-x-auto">
              {viewAllType === 'covers' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold">
                      <th className="py-3">Scheme Name</th>
                      <th className="py-3">Type</th>
                      <th className="py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-50">
                      <td className="py-4 font-bold text-slate-800">Social Health Insurance (SHIF)</td>
                      <td className="py-4 text-slate-500">Universal Health Care</td>
                      <td className="py-4 text-right">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${isCovered ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {isCovered ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}

              {viewAllType === 'claims' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold">
                      <th className="py-3">Claim ID</th>
                      <th className="py-3">Hospital</th>
                      <th className="py-3">Service</th>
                      <th className="py-3">Amount</th>
                      <th className="py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claims.map((claim) => (
                      <tr key={claim.id} className="border-b border-slate-50">
                        <td className="py-4 font-mono font-bold text-slate-800">{claim.id}</td>
                        <td className="py-4 text-slate-700">{claim.facility}</td>
                        <td className="py-4 text-slate-500">{claim.service}</td>
                        <td className="py-4 text-slate-800 font-bold">KES {claim.amount.toLocaleString()}</td>
                        <td className="py-4 text-right">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${claim.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            {claim.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {viewAllType === 'payments' && (
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold">
                      <th className="py-3">Transaction ID</th>
                      <th className="py-3">Date</th>
                      <th className="py-3">Amount</th>
                      <th className="py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.length > 0 ? (
                      paymentHistory.map((tx) => (
                        <tr key={tx.id} className="border-b border-slate-50">
                          <td className="py-4 text-slate-800 font-bold">{tx.id}</td>
                          <td className="py-4 text-slate-500">{tx.date}</td>
                          <td className="py-4 text-slate-800 font-bold">KES {tx.amount.toLocaleString()}</td>
                          <td className="py-4 text-right text-emerald-600 font-extrabold">{tx.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400 font-sans">No recent transactions found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}