import { hospitals } from "@/data/hospitals";
import HospitalCard from "./HospitalCard";

const HospitalList = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trusted Healthcare Facilities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with verified hospitals and clinics across Kenya
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospitalList;
