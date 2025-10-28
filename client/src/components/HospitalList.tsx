
import { useEffect, useState } from "react";
import HospitalCard from "./HospitalCard";

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

const API_BASE = "https://afya-link-care-2.onrender.com/api";

const HospitalList = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHospitals = async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/hospitals`, { signal });
      if (!res.ok) throw new Error("Failed to fetch hospitals");
      const data = await res.json();
      setHospitals(data);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Error fetching hospitals:", err);
        setError("Could not load hospitals. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchHospitals(controller.signal);
    return () => controller.abort();
  }, []);

  if (loading) return <p className="text-center py-20">Loading hospitals...</p>;

  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error}</p>
        <button
          onClick={() => fetchHospitals()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );

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

