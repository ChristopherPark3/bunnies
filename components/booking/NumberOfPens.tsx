import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const NumberOfPens = ({
  numberOfPens,
  setNumberOfPens,
}: {
  numberOfPens: number;
  setNumberOfPens: (numberOfPens: number) => void;
}) => {
  return (
    <div className="flex flex-col h-full w-full max-w-md items-center gap-8">
      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="text-3xl font-bold text-gray-800 select-none">
          Number of Pens
        </h1>
        <p className="text-sm text-gray-500 select-none">
          Please provide the number of pens your bunnies will occupy.
        </p>
      </div>
      {/* Pricing Information Section */}
      <div className="px-4">
        <div className="bg-sage/10 border border-sage/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 text-sage"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-warm-brown mb-2">
                Pricing Information
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                We charge based on the number of pens your bunnies will occupy:
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">
                    <strong>Bonded bunnies</strong> sharing a pen = 1 price
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-600">
                    <strong>Separate bunnies</strong> needing different pens =
                    separate prices
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full px-8 justify-center items-center">
        <div className="flex flex-row gap-8 items-center">
          <p className="text-7xl font-bold">{numberOfPens}</p>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={() => setNumberOfPens(numberOfPens + 1)}
              disabled={numberOfPens >= 3}
              className="select-none"
            >
              +
            </Button>
            <Button
              variant="outline"
              onClick={() => setNumberOfPens(numberOfPens - 1)}
              disabled={numberOfPens <= 1}
              className="select-none"
            >
              -
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
