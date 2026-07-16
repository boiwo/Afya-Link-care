
// import { MapPin, Calendar, BookOpen, Shield, Clock, Users } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";

// const Features = () => {
//   const features = [
//     {
//       icon: MapPin,
//       title: "Find Nearby Clinics",
//       description: "Discover trusted healthcare facilities in your area with our comprehensive directory",
//     },
//     {
//       icon: Calendar,
//       title: "Easy Booking",
//       description: "Schedule appointments online and manage your healthcare visits effortlessly",
//     },
//     {
//       icon: BookOpen,
//       title: "Health Resources",
//       description: "Access reliable health information and articles to stay informed",
//     },
//     {
//       icon: Shield,
//       title: "Verified Providers",
//       description: "All clinics are verified to ensure quality and trustworthy healthcare",
//     },
//     {
//       icon: Clock,
//       title: "24/7 Access",
//       description: "Browse clinics and book appointments anytime, anywhere",
//     },
//     {
//       icon: Users,
//       title: "Community Driven",
//       description: "Read reviews and ratings from real patients in your community",
//     },
//   ];

//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
//       <div className="max-w-7xl mx-auto">
        
//         {/* LARGE STRATEGIC COOPERATION HERO BANNER */}
//         <div className="relative w-full rounded-2xl overflow-hidden shadow-xl mb-16 border border-border/40">
//           {/* Main Strategic Image Container */}
//           <div className="relative h-[380px] sm:h-[480px] md:h-[540px] w-full">
//             <img 
//               src="https://www.health.go.ke/sites/default/files/2026-07/strategic_cooperation_signing.jpg" 
//               alt="Kenya and United States Strategic Grant Signing Agreement" 
//               className="w-full h-full object-cover object-center"
//               onError={(e) => {
//                 // Fallback direct source in case the absolute path changes on MoH portal
//                 e.currentTarget.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQMC6y_Yl-Hx3-HzST8hxWTQki1fdj7bYwjEN1bhmxVRM27GBuo5mma-PK&s=10";
//               }}
//             />
//             {/* Elegant overlay gradient to transition nicely with page colors */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
//             {/* Overlay Text Content */}
//             <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
//               <span className="inline-block bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md mb-3">
//                 National Milestone
//               </span>
//               <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight max-w-4xl mb-2">
//                 Kenya and United States strengthen health cooperation through strategic grant agreement
//               </h3>
//               <p className="text-xs sm:text-sm text-slate-200 max-w-2xl font-light leading-relaxed">
//                 Witnessing the historic $1.6B SOAG signing to accelerate Universal Health Coverage (Taifa Care) and establish a resilient, digitized healthcare framework across Kenya.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* STRATEGIC PARTNERS LOGO LIST - High Resolution & Full Color */}
//         <div className="mb-24 pb-12 border-b border-border/60">
//           <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase text-center mb-10">
//             In Strategic Cooperation With National Initiatives
//           </p>
          
//           <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
            
//             {/* Ministry of Health Kenya (MoH) - Clean official seal & text */}
//             <div className="h-16 flex items-center gap-3 transition-transform duration-300 hover:scale-105">
//               <img 
//                 src="https://www.africa-newsroom.com/files/thumb/4c9bf9ac3eceae7/800/600" 
//                 alt="Coat of arms of Kenya" 
//                 className="h-full w-auto object-contain max-h-14"
//               />
//               <div className="text-left leading-tight">
//                 <span className="text-[10px] block text-muted-foreground font-bold uppercase tracking-wider">Republic of Kenya</span>
//                 <span className="text-sm font-extrabold text-slate-800 tracking-tight">Ministry of Health</span>
//               </div>
//             </div>

//             {/* USAID Kenya - Clean, Crisp Vector Identity */}
//             <div className="h-14 flex items-center transition-transform duration-300 hover:scale-105">
//               <img 
//                 src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSAaZpHtg5ZqI0ylF-KT79TyJRY0T6ymTd1NMxaq7V7is4mr63E8wATOn9zpRPVpXEr3kMdHi5Je76RtllR11bsdDPh0fO0WPLZ" 
//                 alt="USAID Kenya Official Logo" 
//                 className="h-full w-auto object-contain max-h-12"
//               />
//             </div>

//             {/* Social Health Authority (SHA) - Official Vector SVG */}
//             <div className="h-14 flex items-center transition-transform duration-300 hover:scale-105">
//               <img 
//                 src="https://sha.go.ke/images/sha_logo.svg" 
//                 alt="Social Health Authority SHA Logo" 
//                 className="h-full w-auto object-contain max-h-12"
//               />
//             </div>

//           </div>
//         </div>

//         {/* FEATURES HEADER */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
//             Why Choose AfyaLink?
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             We're making healthcare more accessible, transparent, and community-driven across Kenya.
//           </p>
//         </div>

//         {/* FEATURES GRID */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <Card
//               key={index}
//               className="border-border hover:shadow-lg transition-shadow duration-300"
//             >
//               <CardContent className="pt-6">
//                 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
//                   <feature.icon className="w-6 h-6 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-foreground mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-muted-foreground">
//                   {feature.description}
//                 </p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;
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
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* STRATEGIC COOPERATION ARTICLE CARD (Clean MoH-Style Layout) */}
        <div className="bg-card rounded-2xl overflow-hidden border border-border/70 shadow-sm mb-16">
          
          {/* Large High-Quality Image Container */}
          <div className="relative w-full aspect-[21/9] min-h-[300px] bg-slate-100">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Coat_of_arms_of_Kenya_%28Official%29.svg/512px-Coat_of_arms_of_Kenya_%28Official%29.svg.png" // Fallback / actual image URL
              srcSet="https://www.africa-newsroom.com/files/thumb/4c9bf9ac3eceae7/800/600 800w"
              sizes="100vw"
              alt="Kenya and United States Strategic Grant Agreement Signing" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Clean Typography Container (Positioned below the image for maximum readability) */}
          <div className="p-6 sm:p-10 border-t border-border/40">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
                National Milestone
              </span>
              <span className="text-xs text-muted-foreground font-medium">July 15, 2026</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-4 leading-tight">
              Kenya and United States strengthen health cooperation through strategic grant agreement
            </h2>
            
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-5xl">
              Witnessing the signing of the Strategic Objective Grant Agreement (SOAG) under the Kenya–United States Health Cooperation Framework at the National Treasury Headquarters in Nairobi. Over the next five years, the framework mobilizes approximately USD 1.6 billion to accelerate Universal Health Coverage (Taifa Care), expand the digital health superhighway, and enhance healthcare infrastructure transparency.
            </p>
          </div>
        </div>

        {/* STRATEGIC PARTNERS LOGOS */}
        <div className="mb-24 pb-12 border-b border-border/60">
          <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase text-center mb-8">
            In Strategic Cooperation With National Initiatives
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            
            {/* Ministry of Health */}
            <div className="h-14 flex items-center gap-3">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Coat_of_arms_of_Kenya_%28Official%29.svg/512px-Coat_of_arms_of_Kenya_%28Official%29.svg.png" 
                alt="Coat of Arms of Kenya" 
                className="h-full w-auto object-contain max-h-12"
              />
              <div className="text-left leading-tight">
                <span className="text-[9px] block text-muted-foreground font-bold uppercase tracking-wider">Republic of Kenya</span>
                <span className="text-xs font-black text-slate-800 dark:text-slate-200 tracking-tight">Ministry of Health</span>
              </div>
            </div>

            {/* USAID */}
            <div className="h-12 flex items-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/USAID-Identity.svg/1024px-USAID-Identity.svg.png" 
                alt="USAID Kenya" 
                className="h-full w-auto object-contain max-h-10"
              />
            </div>

            {/* SHA */}
            <div className="h-12 flex items-center">
              <img 
                src="https://sha.go.ke/images/sha_logo.svg" 
                alt="Social Health Authority" 
                className="h-full w-auto object-contain max-h-10"
              />
            </div>

          </div>
        </div>

        {/* FEATURES HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose AfyaLink?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're making healthcare more accessible, transparent, and community-driven across Kenya.
          </p>
        </div>

        {/* FEATURES GRID */}
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