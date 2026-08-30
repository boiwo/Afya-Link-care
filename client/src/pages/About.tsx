import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Target, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description:
        "We prioritize the health and wellbeing of every patient, ensuring access to quality healthcare.",
    },
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To make healthcare accessible, transparent, and community-driven across Kenya.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description:
        "Building strong partnerships with healthcare providers and communities we serve.",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description:
        "All facilities are verified to meet high standards of care and professionalism.",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">

        {/* ==============================
            ABOUT HEADER
        ============================== */}
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

        {/* ==============================
            ABOUT US SECTION
        ============================== */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT - ABOUT IMAGE */}
            <div className="w-full">
              <img
                src="https://www.afyalink.co.ke/assets/img/about.png"
                alt="AfyaLink Dashboard Team"
                className="w-full h-auto object-cover rounded-2xl shadow-xl border border-border"
              />
            </div>

            {/* RIGHT - ABOUT CONTENT */}
            <div className="space-y-8">

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  About Us
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  AfyaLink is Kenya's trusted healthcare platform, dedicated
                  to bridging the gap between patients and quality healthcare
                  providers. We understand that access to reliable healthcare
                  information and services is crucial for every community.
                  Our platform provides a comprehensive directory of verified
                  clinics and hospitals across all 47 counties in Kenya.
                </p>
              </div>

              {/* VISION */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Heart className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Our Vision
                  </h3>

                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                    To revolutionize healthcare management in Kenya through
                    innovative, reliable, and user-friendly technology.
                  </p>
                </div>
              </div>

              {/* MISSION */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Target className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Our Mission
                  </h3>

                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                    To provide hospitals and clinics with an integrated system
                    that improves efficiency, accuracy, and patient experience.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==============================
            SPECIALIST NURSES SECTION
        ============================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
          <div className="max-w-7xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* NURSE IMAGE - LEFT */}
              <div className="w-full flex justify-center">
                <div className="relative w-full max-w-lg">

                  <img
                    src="https://oasishealthcaregroup.com/wp-content/uploads/2024/01/Theater-1024x683.jpg"
                    alt="Specialist Nurse"
                    className="
                      w-full
                      h-[550px]
                      sm:h-[600px]
                      object-cover
                      object-top
                      rounded-2xl
                      shadow-2xl
                      border
                      border-border
                    "
                  />

                  {/* IMAGE LABEL */}
                  <div className="
                    absolute
                    bottom-5
                    left-5
                    right-5
                    bg-background/90
                    backdrop-blur-md
                    rounded-xl
                    p-4
                    shadow-lg
                  ">
                    <p className="text-sm font-semibold text-primary">
                      AfyaLink Healthcare
                    </p>

                    <p className="text-lg font-bold text-foreground">
                      Specialist Nurses
                    </p>
                  </div>

                </div>
              </div>

              {/* NURSE CONTENT - RIGHT */}
              <div className="space-y-6">

                <div>
                  <span className="
                    inline-block
                    px-4
                    py-2
                    rounded-full
                    bg-primary/10
                    text-primary
                    text-sm
                    font-semibold
                    mb-4
                  ">
                    Professional Healthcare Services
                  </span>

                  <h2 className="
                    text-3xl
                    sm:text-4xl
                    font-bold
                    text-foreground
                    mb-5
                  ">
                    Specialist Nurses
                  </h2>

                  <p className="
                    text-muted-foreground
                    leading-relaxed
                    text-base
                    sm:text-lg
                  ">
                    Our Specialist Nurses service connects patients with
                    qualified healthcare professionals and provides access to
                    reliable nursing and healthcare services.
                  </p>
                </div>

                {/* FEATURES */}
                <div className="space-y-4">

                  <div className="flex items-start gap-4">
                    <div className="
                      flex-shrink-0
                      w-11
                      h-11
                      rounded-full
                      bg-primary/10
                      flex
                      items-center
                      justify-center
                    ">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground">
                        Compassionate Care
                      </h3>

                      <p className="text-sm text-muted-foreground mt-1">
                        Patient-focused nursing care designed around individual
                        healthcare needs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="
                      flex-shrink-0
                      w-11
                      h-11
                      rounded-full
                      bg-primary/10
                      flex
                      items-center
                      justify-center
                    ">
                      <Award className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground">
                        Qualified Professionals
                      </h3>

                      <p className="text-sm text-muted-foreground mt-1">
                        Access reliable healthcare professionals committed to
                        quality service.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="
                      flex-shrink-0
                      w-11
                      h-11
                      rounded-full
                      bg-primary/10
                      flex
                      items-center
                      justify-center
                    ">
                      <Users className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground">
                        Patient Support
                      </h3>

                      <p className="text-sm text-muted-foreground mt-1">
                        Helping patients find the right nursing and healthcare
                        support when they need it.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ==============================
            OUR VALUES
        ============================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our Values
              </h2>

              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at AfyaLink.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              {values.map((value, index) => {
                const Icon = value.icon;

                return (
                  <Card
                    key={index}
                    className="
                      text-center
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:shadow-xl
                    "
                  >
                    <CardContent className="pt-6">

                      <div className="
                        w-16
                        h-16
                        rounded-full
                        bg-primary/10
                        flex
                        items-center
                        justify-center
                        mx-auto
                        mb-5
                      ">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>

                      <h3 className="
                        text-xl
                        font-semibold
                        text-foreground
                        mb-3
                      ">
                        {value.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>

                    </CardContent>
                  </Card>
                );
              })}

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;