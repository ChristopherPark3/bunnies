import {
  Heart,
  Award,
  Clock,
  Lock,
  LockKeyhole,
  CircleAlert,
} from "lucide-react";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "../ui/kibo-ui/marquee";
import Image from "next/image";

const myBunnies = [];

export const About = () => {
  return (
    <section id="about" className="py-20 w-full">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-warm-brown mb-12 text-center">About Me!</h2>
          
          {/* Main content with image and text */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
            {/* Image section */}
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="https://kxxewjaybzjpalexpvew.supabase.co/storage/v1/object/sign/assets/kim/kim-2.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NGRjYWQ5Mi1lMjhiLTQ0MDAtYjlhMi00MjVlOTNjYWU1YzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMva2ltL2tpbS0yLmpwZWciLCJpYXQiOjE3NTYwODgyNTQsImV4cCI6NDg3ODE1MjI1NH0.MKdk_Nv0MlIihMcoEcuyvMr9s5F_crqXaJQ9rGjXcwY"
                  alt="Kim"
                  className="w-full max-w-md h-auto object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Text content section */}
            <div className="flex flex-col gap-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hi all! My name is Kimberly, I am a SFSU alumni with a major in
                Zoology! I am offering a bunny boarding service! I am a ER
                veterinary technician, who is very dependable and passionate
                about all animals small and big. I have 5 years working in vet
                med and 2 years of veterinary exotic animal experience (worked
                with Dr. Tino Luehman, Dr. Link , and Dr. Neely) and medical
                fostering for rescues (FUR - friends of unwanted rabbits)
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you&apos;re gone only for a few days, or even up to a few
                weeks- I understand how challenging it can be to find a trusting
                bunny-sitter. This is why I am offering my boarding service in
                my own home, where they will have a stress-free and peaceful
                environment. Our room is dedicated to the bunnies where they
                will have their own playpen, and allocated free roam/play time.
                Indoor baby monitoring camera on 24/7. I have my own 3 rabbits
                that I rescued and love very much, and can relate to bunny
                parents!
              </p>

              <div className="bg-sage/5 border-l-4 border-sage p-4 rounded-r-lg">
                <p className="text-lg leading-relaxed font-semibold text-warm-brown">
                  We do have 2 small dogs on site, who are very gentle with the
                  bunnies and ignore them most of the time. But to ensure peace of
                  mind to you, no dogs will have contact with any boarding
                  rabbits, as the rabbits will have their own room devoted to them.
                </p>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-all duration-300">
              <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-sage" />
              </div>
              <h3 className="text-xl font-semibold text-warm-brown mb-3">
                Passionate Care
              </h3>
              <p className="text-muted-foreground">
                Every bunny receives individual attention and care tailored to
                their personality and needs.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-all duration-300">
              <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-sage" />
              </div>
              <h3 className="text-xl font-semibold text-warm-brown mb-3">
                Veterinary Technician
              </h3>
              <p className="text-muted-foreground">
                Active Veterinary Technician at an emergency veterinary hospital
                with over 2 years of experience working with exotics.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-all duration-300">
              <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <LockKeyhole className="w-8 h-8 text-sage" />
              </div>
              <h3 className="text-xl font-semibold text-warm-brown mb-3">
                Dedicated Space
              </h3>
              <p className="text-muted-foreground">
                Bunnies have their own space in a dedicated boarding room. Each
                bunny will have their own kennel with a playpen and their own
                safe space.
              </p>
            </div>
          </div>
        </div>

        {/* Marquee section */}
        <div className="w-full bg-background py-8">
          <div className="container mx-auto px-4">
            <Marquee>
              <MarqueeFade side="left" />
              <MarqueeFade side="right" />
              <MarqueeContent pauseOnHover={false} pauseOnClick={false}>
                {new Array(10).fill(null).map((_, index) => (
                  <MarqueeItem className="mx-2" key={index}>
                    <Image
                      alt={`Placeholder ${index}`}
                      className="overflow-hidden rounded-xl"
                      src={`/billy-belinda-vienna.jpeg`}
                      width={300}
                      height={300}
                    />
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};
