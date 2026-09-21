import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Star,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Copy,
  Loader2,
} from "lucide-react";
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

const API_BASE = "https://afya-link-care-5.onrender.com/api";

// CHANGE THESE TO YOUR REAL PAYMENT DETAILS
const TILL_NUMBER = "123456";
const BUSINESS_NAME = "AfyaLink";
const APPOINTMENT_FEE = 500;

const HospitalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hospitalId = Number(id);

  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");

  // Payment states
  const [appointmentId, setAppointmentId] = useState<number | null>(null);
  const [paymentStep, setPaymentStep] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);

  useEffect(() => {
    if (!hospitalId) {
      setError("Invalid hospital ID");
      setLoading(false);
      return;
    }

    const fetchHospital = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/hospitals/${hospitalId}`);

        if (!response.ok) {
          throw new Error(`Failed with status ${response.status}`);
        }

        const data = await response.json();
        setHospital(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load hospital details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [hospitalId]);

  const handleBooking = async () => {
    if (!name || !date || !time || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      setBookingLoading(true);

      const response = await fetch(`${API_BASE}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hospital_id: hospitalId,
          name,
          phone,
          date,
          time,
          amount: APPOINTMENT_FEE,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create appointment");
      }

      setAppointmentId(data.appointment_id);
      setPaymentStep(true);
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Unable to create appointment"
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const copyTillNumber = async () => {
    try {
      await navigator.clipboard.writeText(TILL_NUMBER);
      alert("Till Number copied successfully!");
    } catch (error) {
      console.error(error);
      alert("Unable to copy Till Number");
    }
  };

  const checkPaymentStatus = async () => {
    if (!appointmentId) {
      alert("Appointment information is missing.");
      return;
    }

    try {
      setCheckingPayment(true);

      const response = await fetch(
        `${API_BASE}/appointments/${appointmentId}/payment-status`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to check payment status");
      }

      if (
        data.payment_status === "PAID" &&
        data.appointment_status === "CONFIRMED"
      ) {
        setIsBooked(true);
      } else {
        alert(
          "Payment has not been confirmed yet. Please complete the M-Pesa payment and try again."
        );
      }
    } catch (error) {
      console.error(error);
      alert("Unable to check payment status.");
    } finally {
      setCheckingPayment(false);
    }
  };

  const resetBooking = () => {
    setName("");
    setPhone("");
    setDate("");
    setTime("");
    setAppointmentId(null);
    setPaymentStep(false);
    setIsBooked(false);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-24 text-center text-gray-500">
          Loading hospital details...
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-24 text-center">
          <p className="text-red-500">{error}</p>
          <Button className="mt-4" onClick={() => navigate("/")}>
            Go Back
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  if (!hospital) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-24 text-center text-gray-500">
          Hospital not found
        </div>
        <Footer />
      </>
    );
  }

 

  return (
    <>
      <Navbar />

      <div className="container mx-auto max-w-5xl px-4 py-10">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 -ml-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="overflow-hidden rounded-2xl border-gray-100 shadow-sm">
         
          <div className="relative aspect-[16/7] w-full overflow-hidden bg-gray-100">
            <img
              src={hospital.image_url}
              alt={hospital.name}
              className="h-full w-full object-cover"
            />

            {hospital.rating && (
              <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
                <Star size={14} className="fill-emerald-500 text-emerald-500" />
                <span className="text-sm font-semibold text-gray-900">
                  {hospital.rating}/5
                </span>
              </div>
            )}
          </div>

          <CardContent className="p-6 md:p-8">
            <div className="grid gap-8 md:grid-cols-3">
              
              <div className="md:col-span-2">
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {hospital.name}
                </h1>

                <div className="mt-4 space-y-2.5 text-gray-600">
                  <div className="flex items-center gap-2.5">
                    <MapPin size={17} className="shrink-0 text-emerald-600" />
                    <span className="text-sm">
                      {hospital.location}, {hospital.county}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone size={17} className="shrink-0 text-emerald-600" />
                    <span className="text-sm">{hospital.phone}</span>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-gray-500">
                  {hospital.description}
                </p>

                {hospital.services && hospital.services.length > 0 && (
                  <div className="mt-7">
                    <h2 className="mb-3 text-base font-semibold text-gray-900">
                      Services
                    </h2>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {hospital.services.map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle
                            size={15}
                            className="shrink-0 text-emerald-500"
                          />
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            
              <div className="md:col-span-1">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Appointment fee
                  </p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    KES {APPOINTMENT_FEE}
                  </p>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        onClick={resetBooking}
                        className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Appointment
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>
                          {paymentStep ? "M-Pesa Payment" : "Book Appointment"}
                        </DialogTitle>
                      </DialogHeader>

                      
                      {!paymentStep && !isBooked && (
                        <>
                          <div className="space-y-4">
                            <div>
                              <Label>Full Name</Label>
                              <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                              />
                            </div>

                            <div>
                              <Label>Phone Number</Label>
                              <Input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="0712345678"
                              />
                            </div>

                            <div>
                              <Label>Date</Label>
                              <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                              />
                            </div>

                            <div>
                              <Label>Time</Label>
                              <Input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                              />
                            </div>

                            <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-4 py-3">
                              <span className="text-sm text-gray-600">
                                Appointment fee
                              </span>
                              <span className="text-sm font-bold text-emerald-600">
                                KES {APPOINTMENT_FEE}
                              </span>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button
                              onClick={handleBooking}
                              disabled={bookingLoading}
                              className="bg-emerald-500 hover:bg-emerald-600"
                            >
                              {bookingLoading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Creating...
                                </>
                              ) : (
                                <>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Continue to Payment
                                </>
                              )}
                            </Button>
                          </DialogFooter>
                        </>
                      )}

                      
                      {paymentStep && !isBooked && (
                        <>
                          <div className="space-y-5">
                            
                            <div className="rounded-lg border bg-green-50 p-5">
                              <h3 className="mb-4 text-lg font-bold">
                                Pay with M-Pesa
                              </h3>

                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Business</span>
                                  <span className="font-semibold">
                                    {BUSINESS_NAME}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">
                                    Till Number
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-green-600">
                                      {TILL_NUMBER}
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={copyTillNumber}
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>

                                <div className="flex justify-between">
                                  <span className="text-gray-600">Amount</span>
                                  <span className="font-bold">
                                    KES {APPOINTMENT_FEE}
                                  </span>
                                </div>

                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Reference
                                  </span>
                                  <span className="font-bold">
                                    AFYALINK-{appointmentId}
                                  </span>
                                </div>
                              </div>
                            </div>


                            <div className="rounded-lg bg-gray-100 p-4">
                              <h4 className="mb-3 font-semibold">
                                Payment Instructions
                              </h4>

                              <ol className="ml-5 list-decimal space-y-2 text-sm">
                                <li>Open M-Pesa on your phone.</li>
                                <li>Select Lipa na M-Pesa.</li>
                                <li>Select Buy Goods and Services.</li>
                                <li>
                                  Enter Till Number:{" "}
                                  <strong>{TILL_NUMBER}</strong>
                                </li>
                                <li>
                                  Enter amount:{" "}
                                  <strong>KES {APPOINTMENT_FEE}</strong>
                                </li>
                                <li>
                                  Enter reference:{" "}
                                  <strong>AFYALINK-{appointmentId}</strong>
                                </li>
                                <li>Complete the payment.</li>
                                <li>Return here and click Check Payment.</li>
                              </ol>
                            </div>

                            <p className="text-center text-sm text-gray-500">
                              Your appointment will automatically be confirmed
                              after the payment is received.
                            </p>
                          </div>

                          <DialogFooter className="gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setPaymentStep(false)}
                            >
                              Back
                            </Button>

                            <Button
                              onClick={checkPaymentStatus}
                              disabled={checkingPayment}
                              className="bg-emerald-500 hover:bg-emerald-600"
                            >
                              {checkingPayment ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Checking...
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Check Payment
                                </>
                              )}
                            </Button>
                          </DialogFooter>
                        </>
                      )}

                      
                      {isBooked && (
                        <div className="py-8 text-center">
                          <CheckCircle
                            size={56}
                            className="mx-auto mb-4 text-green-500"
                          />
                          <h3 className="text-xl font-bold">
                            Appointment Confirmed Successfully!
                          </h3>

                          <p className="mt-3 text-sm text-gray-500">
                            Your M-Pesa payment of KES {APPOINTMENT_FEE} has
                            been received and your appointment is confirmed.
                          </p>

                          <p className="mt-3 text-sm font-semibold">
                            Appointment ID: {appointmentId}
                          </p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <p className="mt-3 text-center text-xs text-gray-400">
                    Pay securely via M-Pesa after booking
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </>
  );
};

export default HospitalDetail;
