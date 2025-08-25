import { Checkbox } from "../ui/checkbox";

interface AdditionalServices {
  sanitaryShaving: boolean;
  nailTrim: boolean;
  medication: boolean;
}

interface AdditionalServicesProps {
  additionalServices: AdditionalServices;
  setAdditionalServices: (services: AdditionalServices) => void;
}

export const AdditionalServices = ({
  additionalServices,
  setAdditionalServices,
}: AdditionalServicesProps) => {
  const handleServiceChange = (
    service: keyof AdditionalServices,
    checked: boolean
  ) => {
    setAdditionalServices({
      ...additionalServices,
      [service]: checked,
    });
  };

  return (
    <div className="flex flex-col gap-4 px-8">
      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="text-3xl font-bold text-gray-800 select-none">
          Additional Services
        </h1>
        <p className="text-sm text-gray-500 select-none">
          We offer a variety of additional services to make your bunny&apos;s
          stay more comfortable.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Grooming</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                className="rounded"
                checked={additionalServices.sanitaryShaving}
                onCheckedChange={(checked) =>
                  handleServiceChange("sanitaryShaving", checked as boolean)
                }
              />
              <span className="text-sm flex gap-1">
                <p>Sanitary shaving/deshedding -</p>
                <p className="font-bold underline">$20</p>
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                className="rounded"
                checked={additionalServices.nailTrim}
                onCheckedChange={(checked) =>
                  handleServiceChange("nailTrim", checked as boolean)
                }
              />
              <span className="text-sm flex gap-1">
                <p>Nail trim -</p>
                <p className="font-bold underline">$10</p>
              </span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Medical Care</h2>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                className="rounded"
                checked={additionalServices.medication}
                onCheckedChange={(checked) =>
                  handleServiceChange("medication", checked as boolean)
                }
              />
              <span className="text-sm flex gap-1">
                <p>Medication administration -</p>
                <p className="font-bold underline">$5/day</p>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
