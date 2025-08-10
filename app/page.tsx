import { NavigationBar } from "@/components/general/navigation-bar";
import { Hero } from "@/components/general/hero";
import { About } from "@/components/general/about";
import { Requirements } from "@/components/general/requirements";
import { Services } from "@/components/general/services";
import { Contact } from "@/components/general/contact";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <NavigationBar />
      <Hero />
      <About />
      <Services />
      <Requirements />
      <Contact />
    </div>
  );
}
