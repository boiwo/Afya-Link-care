import { useEffect, useState } from "react";
import HospitalCard from "./HospitalCard";

interface Hospital {
  id: string;
  name: string;
  location?: string;
  county?: string;
  services?: string[];
  rating?: number;
  image_url?: string; // must match backend
  contact?: string;
}

const API_BASE = "https://afya-link-care-3.onrender.com"; // backend URL

const HospitalList = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/hospitals`);
        if (!response.ok) throw new Error("Failed to fetch hospitals");
        const data = await response.json();

        // 🧹 Clean malformed image URLs before rendering
        const sanitized = data.map((h: Hospital) => {
          let imageUrl = h.image_url || "";

          // Fix missing colon in https
          if (imageUrl.startsWith("https//"))
            imageUrl = imageUrl.replace("https//", "https://");
          if (imageUrl.startsWith("http//"))
            imageUrl = imageUrl.replace("http//", "http://");

          // Remove backend URL accidentally prepended
          if (imageUrl.includes("onrender.comhttps")) {
            imageUrl = imageUrl.replace(/https:\/\/[^/]+https/, "https:");
          }

          return { ...h, image_url: imageUrl };
        });

        setHospitals(sanitized);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) return <p>Loading hospitals...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {hospitals.map((hospital) => (
        <HospitalCard key={hospital.id} hospital={hospital} />
      ))}
    </section>
  );
};

export default HospitalList;
