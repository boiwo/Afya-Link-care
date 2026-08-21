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
  Clock,
  Calendar,
  CheckCircle,
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
  const [isBooked, setIsBooked] = useState(false);

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

        const res = await fetch(
          `${API_BASE}/hospitals/${hospitalId}`
        );

        if (!res.ok) {
          throw new Error(`Failed with status ${res.status}`);
        }

        const data = await res.json();
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

  const handleBooking = () => {
    if (!name || !date || !time || !phone) {
      alert("Please fill all fields");
      return;
    }

    setIsBooked(true);

    setTimeout(() => {
      setName("");
      setDate("");
      setTime("");
      setPhone("");
    }, 1000);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-20 text-center">
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
        <div className="container mx-auto py-20 text-center">
          <p className="text-red-500">{error}</p>
          <Button
            className="mt-4"
            onClick={() => navigate("/")}
          >
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
        <div className="container mx-auto py-20 text-center">
          Hospital not found
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card>
          <img
            src={hospital.image_url}
            alt={hospital.name}
            className="w-full h-80 object-cover"
          />

          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-4">
              {hospital.name}
            </h1>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>
                  {hospital.location}, {hospital.county}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>{hospital.phone}</span>
              </div>

              {hospital.rating && (
                <div className="flex items-center gap-2">
                  <Star size={18} />
                  <span>{hospital.rating}/5</span>
                </div>
              )}
            </div>

            <p className="text-gray-600 mb-6">
              {hospital.description}
            </p>

            {hospital.services &&
              hospital.services.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mb-3">
                    Services
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                    {hospital.services.map(
                      (service, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle
                            size={16}
                            className="text-green-500"
                          />
                          {service}
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Book Appointment
                  </DialogTitle>
                </DialogHeader>

                {!isBooked ? (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          value={name}
                          onChange={(e) =>
                            setName(e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <Label>Phone Number</Label>
                        <Input
                          value={phone}
                          onChange={(e) =>
                            setPhone(e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) =>
                            setDate(e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <Label>Time</Label>
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) =>
                            setTime(e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button onClick={handleBooking}>
                        <Clock className="mr-2 h-4 w-4" />
                        Confirm Booking
                      </Button>
                    </DialogFooter>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <CheckCircle
                      size={48}
                      className="mx-auto text-green-500 mb-3"
                    />
                    <p className="font-semibold">
                      Appointment booked successfully!
                    </p>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </>
  );
};

export default HospitalDetail;