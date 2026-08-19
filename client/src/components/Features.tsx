import {
  MapPin,
  Calendar,
  BookOpen,
  Shield,
  Clock,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Find Nearby Clinics",
      description:
        "Discover trusted healthcare facilities in your area with our comprehensive directory.",
    },
    {
      icon: Calendar,
      title: "Easy Booking",
      description:
        "Schedule appointments online and manage your healthcare visits effortlessly.",
    },
    {
      icon: BookOpen,
      title: "Health Resources",
      description:
        "Access reliable health information and articles to stay informed.",
    },
    {
      icon: Shield,
      title: "Verified Providers",
      description:
        "All clinics are verified to ensure quality and trustworthy healthcare.",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description:
        "Browse clinics and book appointments anytime, anywhere.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Read reviews and ratings from real patients in your community.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            STRATEGIC COOPERATION BANNER
        ====================================================== */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl mb-20 border border-border/40">

          <div className="relative h-[360px] sm:h-[460px] md:h-[520px] w-full">

            <img
              src="https://www.health.go.ke/sites/default/files/2026-07/strategic_cooperation_signing.jpg"
              alt="Kenya and United States Strategic Health Cooperation"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src =
                  "https://media.istockphoto.com/id/2217109321/photo/doctors-performing-surgery-in-operating-room.jpg?s=612x612&w=0&k=20&c=11gg15f6h2COVvTJ7uSU_RIeRlB_c5-4JRkSsJkPEiI=";
              }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            {/* Banner Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-12 text-white">

              <span className="inline-block bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md mb-4">
                National Milestone
              </span>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight max-w-4xl mb-3 leading-tight">
                Kenya and United States strengthen health cooperation through
                strategic grant agreement
              </h3>

              <p className="text-sm sm:text-base text-slate-200 max-w-3xl font-light leading-relaxed">
                Witnessing the historic $1.6B SOAG signing to accelerate
                Universal Health Coverage (Taifa Care) and establish a
                resilient, digitized healthcare framework across Kenya.
              </p>

            </div>
          </div>
        </div>


        {/* =====================================================
            STRATEGIC PARTNERS SECTION
        ====================================================== */}
        <div className="mb-24 pb-14 border-b border-border/60">

          {/* Section Heading */}
          <div className="text-center mb-12">

            <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3">
              Strategic Partnerships
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              In Cooperation With National Health Initiatives
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AfyaLink works alongside key healthcare institutions and
              development partners to support accessible, reliable, and
              community-driven healthcare services across Kenya.
            </p>

          </div>


          {/* =================================================
              PARTNERS GRID
          ================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">


            {/* =================================================
                MINISTRY OF HEALTH
            ================================================== */}
            <div
              className="
                group
                min-h-[180px]
                rounded-2xl
                border border-border/60
                bg-white
                px-6 py-8
                flex items-center justify-center
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl
                hover:border-primary/30
              "
            >

              <div className="flex items-center gap-4">

                {/* Ministry Logo */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">

                  <img
                    src="https://www.africa-newsroom.com/files/thumb/4c9bf9ac3eceae7/800/600"
                    alt="Republic of Kenya Ministry of Health"
                    className="
                      max-w-full
                      max-h-full
                      object-contain
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  />

                </div>


                {/* Ministry Text */}
                <div className="text-left">

                  <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Republic of Kenya
                  </span>

                  <span className="block text-sm sm:text-base font-extrabold text-slate-800 leading-tight">
                    Ministry of Health
                  </span>

                  <span className="block text-xs text-muted-foreground mt-2">
                    National Health Partner
                  </span>

                </div>

              </div>

            </div>


            {/* =================================================
                USAID — DEVELOPMENT PARTNER
            ================================================== */}
            <div
              className="
                group
                min-h-[180px]
                rounded-2xl
                border border-border/60
                bg-white
                px-6 py-8
                flex items-center justify-center
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl
                hover:border-primary/30
              "
            >

              <div className="flex flex-col items-center justify-center text-center w-full">

                {/* USAID Logo */}
                <div className="h-24 w-full flex items-center justify-center mb-4">

                  <img
                    src="https://c8.alamy.com/comp/2CDJ9FE/agency-for-international-development-usaid-2CDJ9FE.jpg"
                    alt="USAID - From the American People"
                    className="
                      w-auto
                      max-w-[230px]
                      max-h-[90px]
                      object-contain
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  />

                </div>

                <p className="text-xs font-medium text-muted-foreground">
                  Development Partner
                </p>

              </div>

            </div>


            {/* =================================================
                SOCIAL HEALTH AUTHORITY — SHA
            ================================================== */}
            <div
              className="
                group
                min-h-[180px]
                rounded-2xl
                border border-border/60
                bg-white
                px-6 py-8
                flex items-center justify-center
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl
                hover:border-primary/30
              "
            >

              <div className="flex flex-col items-center justify-center text-center w-full">

                {/* SHA Logo */}
                <div className="h-24 w-full flex items-center justify-center mb-4 overflow-hidden">

                  <img
                    src="https://www.flexi-personnel.com/wp-content/uploads/2025/01/SHA-logo.webp"
                    alt="Social Health Authority Kenya"
                    className="
                      w-auto
                      max-w-[240px]
                      max-h-[95px]
                      object-contain
                      scale-125
                      transition-transform
                      duration-300
                      group-hover:scale-[1.35]
                    "
                  />

                </div>

                <p className="text-xs font-medium text-muted-foreground">
                  Social Health Authority
                </p>

              </div>

            </div>

          </div>
        </div>


        {/* =====================================================
            WHY CHOOSE AFYALINK
        ====================================================== */}
        <div className="text-center mb-14">

          <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase mb-3">
            Why AfyaLink?
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose AfyaLink?
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're making healthcare more accessible, transparent, and
            community-driven across Kenya.
          </p>

        </div>


        {/* =====================================================
            FEATURES GRID
        ====================================================== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Card
                key={index}
                className="
                  group
                  border-border/70
                  bg-card
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  hover:border-primary/30
                "
              >

                <CardContent className="pt-7 pb-7">

                  {/* Feature Icon */}
                  <div
                    className="
                      w-12 h-12
                      rounded-xl
                      bg-primary/10
                      flex items-center justify-center
                      mb-5
                      transition-all
                      duration-300
                      group-hover:bg-primary
                    "
                  >

                    <Icon
                      className="
                        w-6 h-6
                        text-primary
                        transition-colors
                        duration-300
                        group-hover:text-white
                      "
                    />

                  </div>


                  {/* Feature Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>


                  {/* Feature Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                </CardContent>

              </Card>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Features;