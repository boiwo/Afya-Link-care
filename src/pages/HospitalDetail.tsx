import { useParams, useNavigate } from "react-router-dom";
import { hospitals } from "@/data/hospitals";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, ArrowLeft, Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HospitalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hospital = hospitals.find((h) => h.id === id);

  if (!hospital) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Hospital Not Found</h1>
            <Button onClick={() => navigate("/clinics")}>
              Back to Clinics
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/clinics")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clinics
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-foreground">
                  {hospital.name}
                </h1>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-lg font-medium">{hospital.rating}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>{hospital.location}, {hospital.county}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5" />
                  <span>{hospital.contact}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>24/7 Emergency Services</span>
                </div>
              </div>

              <Button className="w-full mb-4 bg-primary hover:bg-primary/90">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
              
              <Button variant="outline" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Call Hospital
              </Button>
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">About This Hospital</h2>
              <p className="text-muted-foreground mb-4">
                {hospital.name} is a leading healthcare facility in {hospital.county} County, 
                providing comprehensive medical services to the community. With state-of-the-art 
                equipment and experienced medical professionals, we are committed to delivering 
                quality healthcare services to all our patients.
              </p>
              <p className="text-muted-foreground">
                Our facility operates 24/7 emergency services and maintains the highest standards 
                of medical care. We serve thousands of patients annually and are proud to be a 
                trusted healthcare provider in the region.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Services</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {hospital.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HospitalDetail;
