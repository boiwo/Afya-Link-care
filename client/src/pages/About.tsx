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
        {/* Header Hero Section */}
        <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary/20">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              About AfyaLink
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connecting communities to quality healthcare across Kenya
            </p>
          </div>
        </section>

        {/* Split Image & Content Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Interactive/Team Image */}
            <div className="w-full">
              <img 
                src="https://www.afyalink.co.ke/assets/img/about.png" // Place your dashboard/team image in your public/images folder
                alt="AfyaLink Dashboard Team" 
                className="w-full h-auto object-cover rounded-xl shadow-lg border border-border"
              />
            </div>

            {/* Right Column: About details, Vision, and Mission */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">About Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AfyaLink is Kenya's trusted healthcare platform, dedicated to bridging the gap between 
                  patients and quality healthcare providers. We understand that access to reliable healthcare 
                  information and services is crucial for every community. Our platform provides a comprehensive 
                  directory of verified clinics and hospitals across all 47 counties in Kenya.
                </p>
              </div>

              {/* Our Vision Block */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Our Vision</h3>
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                    To revolutionize healthcare management in Kenya through innovative, reliable, and user-friendly technology.
                  </p>
                </div>
              </div>

              {/* Our Mission Block */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Our Mission</h3>
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                    To provide hospitals and clinics with an integrated system that improves efficiency, accuracy, and patient experience.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Values Section */}
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