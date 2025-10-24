import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Trusted Healthcare Platform</span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Your Health, <span className="text-primary">Connected</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Find trusted clinics, book appointments, and access quality healthcare across Kenya. 
                AfyaLink brings healthcare closer to your community.
              </p>
            </div>

            <div className="bg-card rounded-xl shadow-lg p-2 max-w-2xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by county, clinic name, or service..."
                    className="pl-10 h-12 border-0 bg-background"
                  />
                </div>
                <Button className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                  <a href="/clinics">
                    <Search className="w-4 h-4 mr-2" />
                    Find Clinics
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800"
                alt="Healthcare professional"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
