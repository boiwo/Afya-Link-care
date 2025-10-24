import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Target, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description: "We prioritize the health and wellbeing of every patient, ensuring access to quality healthcare."
    },
    {
      icon: Target,
      title: "Our Mission",
      description: "To make healthcare accessible, transparent, and community-driven across Kenya."
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Building strong partnerships with healthcare providers and communities we serve."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "All facilities are verified to meet high standards of care and professionalism."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary/20">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              About AfyaLink
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connecting communities to quality healthcare across Kenya
            </p>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                AfyaLink is Kenya's trusted healthcare platform, dedicated to bridging the gap between 
                patients and quality healthcare providers. We understand that access to reliable healthcare 
                information and services is crucial for every community.
              </p>
              
              <p className="text-lg text-muted-foreground mb-6">
                Our platform provides a comprehensive directory of verified clinics and hospitals across 
                all 47 counties in Kenya. Whether you're looking for a nearby clinic, specialty care, or 
                emergency services, AfyaLink makes it easy to find and connect with trusted healthcare providers.
              </p>

              <p className="text-lg text-muted-foreground">
                We believe that everyone deserves access to quality healthcare. Through technology and 
                community partnerships, we're making healthcare more accessible, transparent, and 
                community-driven for all Kenyans.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Our Values
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
