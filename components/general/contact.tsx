import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-warm-brown mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to book your bunny&apos;s stay? Have questions about my
              services? I&apos;d love to hear from you and discuss your
              bunny&apos;s needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 w-full ">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="font-medium text-warm-brown">Email</p>
                <p className="text-muted-foreground">
                  kimsbunnyboarding@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="font-medium text-warm-brown">Phone</p>
                <p className="text-muted-foreground">(555) 123-BUNNY</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="font-medium text-warm-brown">Location</p>
                <p className="text-muted-foreground">
                  Downtown area, specific address shared upon booking
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="font-medium text-warm-brown">Availability</p>
                <p className="text-muted-foreground">
                  7 days a week, 7:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-sage/5 rounded-lg border border-sage/10">
          <h4 className="font-semibold text-sage mb-2">Response Time</h4>
          <p className="text-sm text-muted-foreground">
            I typically respond to all inquiries within 24 hours. For urgent
            matters, please call directly for the fastest response.
          </p>
        </div>
      </div>
    </section>
  );
};
