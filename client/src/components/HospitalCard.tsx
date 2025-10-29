import { MapPin, Phone, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hospital } from "@/data/hospitals";
import { useNavigate } from "react-router-dom";

interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard = ({ hospital }: HospitalCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video overflow-hidden">
        <img
          src={hospital.image || "/placeholder-hospital.jpg"}
          alt={hospital.name || "Hospital image"}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-foreground">{hospital.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{hospital.rating ?? "N/A"}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              {hospital.location ?? "Unknown"}, {hospital.county ?? ""}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{hospital.contact ?? "Not available"}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {hospital.services?.length ? (
            <>
              {hospital.services.slice(0, 3).map((service, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {service}
                </span>
              ))}
              {hospital.services.length > 3 && (
                <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  +{hospital.services.length - 3} more
                </span>
              )}
            </>
          ) : (
            <span className="text-xs text-muted-foreground">No services listed</span>
          )}
        </div>

        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => navigate(`/hospital/${hospital.id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default HospitalCard;

