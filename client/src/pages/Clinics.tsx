import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HospitalCard from "@/components/HospitalCard";
import { hospitals } from "@/data/hospitals";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Clinics = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.services.some((service) =>
        service.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary/20">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Find Healthcare Facilities
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Search for trusted clinics and hospitals across Kenya
            </p>

            <div className="max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, location, county, or service..."
                  className="pl-10 h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredHospitals.length} of {hospitals.length} facilities
              </p>
            </div>

            {filteredHospitals.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHospitals.map((hospital) => (
                  <HospitalCard key={hospital.id} hospital={hospital} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No facilities found matching your search.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Clinics;



