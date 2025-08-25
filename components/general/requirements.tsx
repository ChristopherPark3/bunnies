import { Check, AlertTriangle, FileText, Heart } from "lucide-react";

export const Requirements = () => {
  const requirements = [
    {
      icon: <Check className="w-6 h-6" />,
      title: "Current Vaccinations",
      description:
        "Up-to-date RHDV2 vaccination required (within the last 12 months).",
      emphasis: "Non RHDV2 vaccinated bunnies only accepted case by case"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health Check",
      description:
        "Recent vet check-up (within 6 months) confirming good health",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Medical Records",
      description:
        "Please bring vaccination records and any special care instructions",
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Spay/Neuter",
      description:
        "Recommended for all bunnies over 6 months for health and behavioral reasons",
    },
  ];

  const bringItems = [
    "Your bunny's regular food",
    "Favorite toys or comfort items",
    "Any medications with instructions",
    "Emergency contact information",
    "Vet contact details",
  ];

  return (
    <section id="requirements" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-warm-brown mb-6">
              Requirements & What to Bring
            </h2>
            <p className="text-lg text-muted-foreground">
              To ensure the safety and wellbeing of all bunnies in my care,
              please review these important requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-warm-brown mb-8 flex items-center">
                <div className="w-8 h-8 bg-sage/10 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-sage" />
                </div>
                Health Requirements
              </h3>
              <div className="space-y-6">
                {requirements.map((requirement, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-card rounded-lg shadow-soft"
                  >
                    <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="text-sage">{requirement.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-warm-brown mb-2">
                        {requirement.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {requirement.description}
                      </p>
                      {requirement.emphasis && (
                        <p className="text-muted-foreground text-sm mt-1">
                          <strong className="text-black">** {requirement.emphasis} **</strong>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-warm-brown mb-8 flex items-center">
                <div className="w-8 h-8 bg-sage/10 rounded-full flex items-center justify-center mr-3">
                  <Heart className="w-4 h-4 text-sage" />
                </div>
                What to Bring
              </h3>
              <div className="bg-card rounded-xl p-6 shadow-soft">
                <p className="text-muted-foreground mb-6">
                  To make your bunny feel at home, please bring these items:
                </p>
                <ul className="space-y-4">
                  {bringItems.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-sage rounded-full mr-4" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-sage/5 rounded-lg border border-sage/10">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-sage">Note:</strong> All items will
                    be returned to you at pickup. I provide fresh hay, water,
                    and a safe, clean environment for your bunny&apos;s stay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
