

// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import {
//   MapPin,
//   Phone,
//   Star,
//   ArrowLeft,
//   Clock,
//   Calendar,
//   CheckCircle,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState, useEffect } from "react";

// interface Hospital {
//   id: number;
//   name: string;
//   location: string;
//   county: string;
//   description: string;
//   image_url: string;
//   phone: string;
//   rating?: number;
//   services?: string[];
// }

// const HospitalDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [hospital, setHospital] = useState<Hospital | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [name, setName] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [phone, setPhone] = useState("");
//   const [isBooked, setIsBooked] = useState(false);

//   // ✅ Fetch hospital details from Flask backend
//   useEffect(() => {
//     if (!id) return;
//     fetch(`http://127.0.0.1:5000/hospitals/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setHospital(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching hospital:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Optional: send booking info to backend
//     console.log("Appointment Booked:", {
//       name,
//       date,
//       time,
//       phone,
//       hospital: hospital?.name,
//     });

//     setIsBooked(true);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Loading hospital details...</p>
//       </div>
//     );
//   }

//   if (!hospital) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold mb-4">Hospital Not Found</h1>
//             <Button onClick={() => navigate("/")}>Back to Hospitals</Button>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-background">
//         <div className="max-w-6xl mx-auto">
//           <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Hospitals
//           </Button>

//           <div className="grid lg:grid-cols-2 gap-8 mb-8">
//             <div className="aspect-video overflow-hidden rounded-lg">
//               <img
//                 src={hospital.image_url}
//                 alt={hospital.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div>
//               <div className="flex items-start justify-between mb-4">
//                 <h1 className="text-3xl font-bold text-foreground">
//                   {hospital.name}
//                 </h1>
//                 {hospital.rating && (
//                   <div className="flex items-center gap-1 text-yellow-500">
//                     <Star className="w-5 h-5 fill-current" />
//                     <span className="text-lg font-medium">{hospital.rating}</span>
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-3 mb-6">
//                 <div className="flex items-center gap-3 text-muted-foreground">
//                   <MapPin className="w-5 h-5" />
//                   <span>{hospital.location}, {hospital.county}</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-muted-foreground">
//                   <Phone className="w-5 h-5" />
//                   <span>{hospital.phone}</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-muted-foreground">
//                   <Clock className="w-5 h-5" />
//                   <span>24/7 Emergency Services</span>
//                 </div>
//               </div>

//               {/* Booking Modal */}
//               <Dialog onOpenChange={(open) => { if (!open) setIsBooked(false); }}>
//                 <DialogTrigger asChild>
//                   <Button className="w-full mb-4 bg-primary hover:bg-primary/90">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     Book Appointment
//                   </Button>
//                 </DialogTrigger>

//                 <DialogContent>
//                   {!isBooked ? (
//                     <>
//                       <DialogHeader>
//                         <DialogTitle>Book Appointment at {hospital.name}</DialogTitle>
//                       </DialogHeader>

//                       <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="grid gap-2">
//                           <Label htmlFor="name">Full Name</Label>
//                           <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
//                         </div>

//                         <div className="grid gap-2">
//                           <Label htmlFor="date">Date</Label>
//                           <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//                         </div>

//                         <div className="grid gap-2">
//                           <Label htmlFor="time">Time</Label>
//                           <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
//                         </div>

//                         <div className="grid gap-2">
//                           <Label htmlFor="phone">Phone Number</Label>
//                           <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//                         </div>

//                         <DialogFooter>
//                           <Button type="submit" className="w-full">Confirm Booking</Button>
//                         </DialogFooter>
//                       </form>
//                     </>
//                   ) : (
//                     <div className="flex flex-col items-center text-center space-y-4 py-8">
//                       <CheckCircle className="w-16 h-16 text-green-500" />
//                       <h2 className="text-2xl font-semibold">Appointment Confirmed!</h2>
//                       <p>
//                         Thank you, <strong>{name}</strong> — your appointment at{" "}
//                         <strong>{hospital.name}</strong> has been booked for{" "}
//                         <strong>{date}</strong> at <strong>{time}</strong>.
//                       </p>
//                       <Button onClick={() => navigate("/")} className="mt-4">
//                         Back to Home
//                       </Button>
//                     </div>
//                   )}
//                 </DialogContent>
//               </Dialog>

//               <Button variant="outline" className="w-full">
//                 <Phone className="w-4 h-4 mr-2" /> Call Hospital
//               </Button>
//             </div>
//           </div>

//           <Card className="mb-8">
//             <CardContent className="p-6">
//               <h2 className="text-2xl font-bold mb-4">About This Hospital</h2>
//               <p className="text-muted-foreground mb-4">{hospital.description}</p>
//             </CardContent>
//           </Card>

//           {hospital.services && (
//             <Card>
//               <CardContent className="p-6">
//                 <h2 className="text-2xl font-bold mb-4">Our Services</h2>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   {hospital.services.map((service, index) => (
//                     <div key={index} className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
//                       <div className="w-2 h-2 rounded-full bg-primary"></div>
//                       <span className="font-medium">{service}</span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default HospitalDetail;
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, ArrowLeft, Clock, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Hospital {
  id: number;
  name: string;
  location: string;
  county: string;
  description: string;
  image_url: string;
  phone: string;
  rating?: number;
  services?: string[];
}

const API_BASE = "http://127.0.0.1:5000/api"; // Flask backend

const HospitalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Booking state
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  // Fetch hospital details
  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE}/hospitals/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Hospital not found");
        return res.json();
      })
      .then((data) => {
        setHospital(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hospital:", err);
        setError("Hospital not found.");
        setLoading(false);
      });
  }, [id]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Appointment booked:", { name, date, time, phone, hospital: hospital?.name });
    setIsBooked(true);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading hospital details...</div>;
  if (error || !hospital) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error || "Hospital Not Found"}</h1>
          <Button onClick={() => navigate("/")}>Back to Hospitals</Button>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hospitals
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img src={hospital.image_url} alt={hospital.name} className="w-full h-full object-cover" />
            </div>

            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-foreground">{hospital.name}</h1>
                {hospital.rating && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="text-lg font-medium">{hospital.rating}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" /> {hospital.location}, {hospital.county}
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5" /> {hospital.phone}
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5" /> 24/7 Emergency Services
                </div>
              </div>

              {/* Booking Modal */}
              <Dialog onOpenChange={(open) => { if (!open) setIsBooked(false); }}>
                <DialogTrigger asChild>
                  <Button className="w-full mb-4 bg-primary hover:bg-primary/90">
                    <Calendar className="w-4 h-4 mr-2" /> Book Appointment
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  {!isBooked ? (
                    <>
                      <DialogHeader>
                        <DialogTitle>Book Appointment at {hospital.name}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="date">Date</Label>
                          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="time">Time</Label>
                          <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="w-full">Confirm Booking</Button>
                        </DialogFooter>
                      </form>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-center space-y-4 py-8">
                      <CheckCircle className="w-16 h-16 text-green-500" />
                      <h2 className="text-2xl font-semibold">Appointment Confirmed!</h2>
                      <p>Thank you, <strong>{name}</strong> — your appointment at <strong>{hospital.name}</strong> has been booked for <strong>{date}</strong> at <strong>{time}</strong>.</p>
                      <Button onClick={() => navigate("/")} className="mt-4">Back to Home</Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full">
                <Phone className="w-4 h-4 mr-2" /> Call Hospital
              </Button>
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">About This Hospital</h2>
              <p className="text-muted-foreground mb-4">{hospital.description}</p>
            </CardContent>
          </Card>

          {hospital.services?.length && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Our Services</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {hospital.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HospitalDetail;

