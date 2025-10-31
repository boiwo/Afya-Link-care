// import { useEffect, useState } from "react";
// import HospitalCard from "./HospitalCard";

// interface Hospital {
//   id: string;
//   name: string;
//   location?: string;
//   county?: string;
//   services?: string[];
//   rating?: number;
//   image_url?: string;
//   contact?: string;
//   description?: string;
// }

// const API_BASE = "https://afya-link-care-5.onrender.com";


// const HospitalList = () => {
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const response = await fetch(`${API_BASE}/api/hospitals`);
//         if (!response.ok) throw new Error("Failed to fetch hospitals");

//         const data = await response.json();

//         const cleaned = data.map((h: any) => {
//           let imageUrl = h.image_url || "";
//           if (imageUrl.includes("onrender.comhttps")) {
//             imageUrl = imageUrl.substring(imageUrl.indexOf("https://", 10));
//           }
//           if (!imageUrl.startsWith("https://")) {
//             imageUrl = `https://${imageUrl.replace(/^https?:\/\//, "")}`;
//           }
//           return { 
//             ...h, 
//             image_url: imageUrl, 
//             contact: h.phone || h.contact || "N/A" 
//           };
//         });

//         setHospitals(cleaned);
//       } catch (err: any) {
//         setError(err.message || "An unexpected error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHospitals();
//   }, []);

//   const filtered = hospitals.filter((h) =>
//     [h.name, h.location, h.county, ...(h.services || [])]
//       .join(" ")
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   if (loading)
//     return (
//       <div className="p-10 text-center text-gray-500 animate-pulse">
//         Loading hospitals...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="p-10 text-center text-red-600 font-medium">
//         {error}
//       </div>
//     );

//   return (
//     <section className="p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold mb-2 text-blue-600">
//           Find Healthcare Facilities
//         </h1>
//         <p className="text-gray-600">
//           Search for trusted clinics and hospitals across Kenya
//         </p>
//       </div>

//       {/* Search */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="🔍 Search by name, location, county, or service..."
//           className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-400 outline-none"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Facility Count */}
//       <p className="mb-4 text-gray-600">
//         Showing <span className="font-semibold">{filtered.length}</span> of{" "}
//         {hospitals.length} facilities
//       </p>

//       {/* Grid */}
//       {filtered.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((hospital) => (
//             <HospitalCard key={hospital.id} hospital={hospital} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 mt-8">
//           No hospitals found matching your search.
//         </p>
//       )}
//     </section>
//   );
// };

// export default HospitalList;

import { useEffect, useState } from "react";
import HospitalCard from "./HospitalCard";

interface Hospital {
  id: string;
  name: string;
  location?: string;
  county?: string;
  services?: string[];
  rating?: number;
  image_url?: string;
  contact?: string;
  description?: string;
}

// Use environment check for dev vs prod
const API_BASE = import.meta.env.PROD
  ? "https://afya-link-care-5.onrender.com" // Deployed backend
  : "http://127.0.0.1:5000";                 // Local dev backend

const HospitalList = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/hospitals`);
        if (!response.ok) throw new Error("Failed to fetch hospitals");

        const data = await response.json();

        // Fix image URLs
        const cleaned = data.map((h: any) => {
          let imageUrl = h.image_url || "";

          // Handle Render or malformed URLs
          if (imageUrl.startsWith("/")) {
            imageUrl = `${API_BASE}${imageUrl}`;
          } else if (!imageUrl.startsWith("http")) {
            imageUrl = `${API_BASE}/static/${imageUrl}`;
          }

          return {
            ...h,
            image_url: imageUrl,
            contact: h.phone || h.contact || "N/A",
          };
        });

        setHospitals(cleaned);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const filtered = hospitals.filter((h) =>
    [h.name, h.location, h.county, ...(h.services || [])]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500 animate-pulse">
        Loading hospitals...
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-600 font-medium">
        {error}
      </div>
    );

  return (
    <section className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-blue-600">
          Find Healthcare Facilities
        </h1>
        <p className="text-gray-600">
          Search for trusted clinics and hospitals across Kenya
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name, location, county, or service..."
          className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Facility Count */}
      <p className="mb-4 text-gray-600">
        Showing <span className="font-semibold">{filtered.length}</span> of{" "}
        {hospitals.length} facilities
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          No hospitals found matching your search.
        </p>
      )}
    </section>
  );
};

export default HospitalList;

