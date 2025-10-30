import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Hospital {
  id: number;
  name: string;
  location: string;
  county: string;
  contact: string;
  image: string;
  services?: string[];
  rating?: number;
}

const initialHospitals: Hospital[] = [
  {
    id: 1,
    name: "Kenyatta National Hospital",
    location: "Nairobi",
    county: "Nairobi",
    services: ["Emergency Care", "Surgery", "Maternity", "Pediatrics"],
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=400",
    contact: "+254 20 2726300"
  },
  {
    id: 2,
    name: "Aga Khan University Hospital",
    location: "Parklands, Nairobi",
    county: "Nairobi",
    services: ["Cardiology", "Oncology", "Neurology", "Orthopedics"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400",
    contact: "+254 20 3662000"
  },
  {
    id: 3,
    name: "Nairobi Hospital",
    location: "Argwings Kodhek Road",
    county: "Nairobi",
    services: ["General Medicine", "ICU", "Laboratory", "Radiology"],
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=400",
    contact: "+254 20 2845000"
  },
  {
    id: 4,
    name: "Moi Teaching and Referral Hospital",
    location: "Eldoret",
    county: "Uasin Gishu",
    services: ["Teaching Hospital", "Surgery", "Maternity", "Emergency"],
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=400",
    contact: "+254 53 2033471"
  },
 {
    id: 5,
    name: "Coast General Teaching Hospital",
    location: "Mombasa",
    county: "Mombasa",
    services: ["Emergency", "Outpatient", "Inpatient", "Surgery"],
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=400",
    contact: "+254 41 2314201"
  },
   {
    id: 6,
    name: "Kisumu County Referral Hospital",
    location: "Kisumu",
    county: "Kisumu",
    services: ["General Medicine", "Maternity", "Pediatrics", "Laboratory"],
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?auto=format&fit=crop&q=80&w=400",
    contact: "+254 57 2023215"
  },
  {
    id: 7,
    name: "MP Shah Hospital",
    location: "Nairobi",
    county: "Nairobi",
    services: ["Cardiology", "Maternity", "Surgery", "Radiology"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=400",
    contact: "+254 20 4285000"
  },
  {
    id: 8,
    name: "Gertrude's Children's Hospital",
    location: "Muthaiga, Nairobi",
    county: "Nairobi",
    services: ["Pediatrics", "Neonatal Care", "Emergency", "Surgery"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400",
    contact: "+254 20 7209000"
  },
   {
    id: 9,
    name: "Karen Hospital",
    location: "Karen, Nairobi",
    county: "Nairobi",
    services: ["General Medicine", "Surgery", "Maternity", "ICU"],
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=400",
    contact: "+254 20 6820000"
  },
  {
    id: 10,
    name: "Nakuru Provincial General Hospital",
    location: "Nakuru",
    county: "Nakuru",
    services: ["Emergency", "Surgery", "Maternity", "Outpatient"],
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1624343285636-aba82fd5a124?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871",
    contact: "+254 51 2210500"
  },
   {
    id: 11,
    name: "Thika Level 5 Hospital",
    location: "Thika",
    county: "Kiambu",
    services: ["Emergency", "Maternity", "Pediatrics", "Laboratory"],
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
    contact: "+254 67 21054"
  },
   {
    id: 12,
    name: "Baringo county referral hospital",
    location: "E/Ravine",
    county: "Baringo",
    services: ["General Medicine", "Surgery", "Maternity", "Radiology"],
    rating: 4.4,
    image: "https://plus.unsplash.com/premium_photo-1664303492452-76f0745336fd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=745",
    contact: "+254 44 21344"
  },
   {
    id: 14,
    name: "medical center",
    location: "Eldoret",
    county: "Uasin Gishu",
    services: ["General Medicine", "Surgery", "Maternity", "Radiology"],
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1581982231900-6a1a46b744c9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    contact: "+254 63 55667"
  },
  {
    id: 15,
    name: "pwani county referral hospital",
    location: "Mombasa",
    county: "Mombasa",
    services: ["General Medicine", "Surgery", "Maternity", "Radiology", "cardiology"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1710074213374-e68503a1b795?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=736",
    contact: "+254 72 784521"
  },
{
    id: 16,
    name: "Tenwek mission hospital",
    location: "Bomet",
    county: "Bomet",
    services: ["General Medicine", "Surgery", "Maternity", "Radiology", "Dental care"],
    rating: 4.1,
    image: "https://plus.unsplash.com/premium_photo-1661895714925-2c7a6be6be32?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    contact: "+254 89674532"
  }
];

const AdminDashboard = () => {
  const [hospitals, setHospitals] = useState(initialHospitals);
  const [form, setForm] = useState({ name: "", location: "", county: "", contact: "", image: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddHospital = () => {
    const newHospital: Hospital = { 
      id: hospitals.length ? Math.max(...hospitals.map(h => h.id)) + 1 : 1,
      ...form 
    };
    setHospitals([...hospitals, newHospital]);
    setForm({ name: "", location: "", county: "", contact: "", image: "" });
  };

  const handleEdit = (hospital: Hospital) => {
    setEditingId(hospital.id);
    setForm({
      name: hospital.name,
      location: hospital.location,
      county: hospital.county,
      contact: hospital.contact,
      image: hospital.image
    });
  };

  const handleUpdate = () => {
    setHospitals(
      hospitals.map(h => h.id === editingId ? { id: h.id, ...form } : h)
    );
    setEditingId(null);
    setForm({ name: "", location: "", county: "", contact: "", image: "" });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this hospital?")) {
      setHospitals(hospitals.filter(h => h.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Add/Edit Hospital Form */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="font-semibold mb-2">{editingId ? "Edit Hospital" : "Add New Hospital"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
          <Input placeholder="Location" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} />
          <Input placeholder="County" value={form.county} onChange={(e) => setForm({...form, county: e.target.value})} />
          <Input placeholder="Contact" value={form.contact} onChange={(e) => setForm({...form, contact: e.target.value})} />
          <Input placeholder="Image URL" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} />
        </div>
        <Button className="mt-2" onClick={editingId ? handleUpdate : handleAddHospital}>
          {editingId ? "Update Hospital" : "Add Hospital"}
        </Button>
      </div>

      {/* Existing Hospitals */}
      <h2 className="text-xl font-semibold mb-2">Existing Hospitals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals.map((hospital) => (
          <Card key={hospital.id}>
            <img src={hospital.image} alt={hospital.name} className="w-full h-48 object-cover rounded-t-lg" />
            <CardContent>
              <h3 className="font-bold">{hospital.name}</h3>
              <p className="text-sm text-gray-500">{hospital.location}, {hospital.county}</p>
              <p className="text-sm text-gray-500">Contact: {hospital.contact}</p>
              {hospital.rating && <p className="text-sm text-gray-500">Rating: {hospital.rating} ⭐</p>}
              {hospital.services && <p className="text-sm text-gray-500">Services: {hospital.services.join(", ")}</p>}
              <div className="mt-2 flex gap-2">
                <Button onClick={() => handleEdit(hospital)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(hospital.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;




