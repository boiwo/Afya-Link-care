import { MapPin, Calendar, BookOpen, Shield, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Find Nearby Clinics",
      description: "Discover trusted healthcare facilities in your area with our comprehensive directory",
    },
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Schedule appointments online and manage your healthcare visits effortlessly",
    },
    {
      icon: BookOpen,
      title: "Health Resources",
      description: "Access reliable health information and articles to stay informed",
    },
    {
      icon: Shield,
      title: "Verified Providers",
      description: "All clinics are verified to ensure quality and trustworthy healthcare",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Browse clinics and book appointments anytime, anywhere",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Read reviews and ratings from real patients in your community",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose AfyaLink?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're making healthcare more accessible, transparent, and community-driven across Kenya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
