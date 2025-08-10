import { Heart, Award, Clock, Lock, LockKeyhole } from "lucide-react";
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
      <div className="container mx-auto px-4 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-warm-brown mb-6">About Me</h2>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            👋 Hi! I&apos;m Kim, I&apos;m an animal lover and passionate about
            all animals big, small, and in between. I graduated from San
            Francisco State University with a degree in Zoology in 2022, and
            have been around animals my whole life. I have been working in the
            veterinary industry for more than 5 years, and I&apos;ve been
            working closely with exotics for the last 2 years.
          </p>
          <br />
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            I have my own 3 freeroam buns at home (Billy, Belinda, and Vienna),
            a handful of small reptiles, and two small dogs. I understand that
            going out of town can be a stressful time when it comes to finding
            someone to watch your buns, but that&apos;s where I come in!
            I&apos;m here to help take the stress away and give your buns
            amazing care while you&apos;re away.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
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
      </div>
      <div className="flex size-full items-center justify-center bg-background px-96 mt-8">
        <Marquee>
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
          <MarqueeContent pauseOnHover={false} pauseOnClick={false}>
            {new Array(10).fill(null).map((_, index) => (
              <MarqueeItem className="" key={index}>
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
    </section>
  );
};
