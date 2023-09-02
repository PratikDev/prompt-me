import { FC } from "react";

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const CardSkeleton: FC = () => {
  const randomLineCount = randomNumber(4, 7);

  const darkClass = "dark:bg-slate-700";
  const lightClass = "bg-slate-400";

  return (
    <>
      <div className="w-full mb-3 mx-auto border p-3 rounded-md break-inside-avoid shadow-sm">
        <div className="animate-pulse ">
          <div className="flex space-x-4">
            <div
              className={`rounded-full ${darkClass} ${lightClass} h-10 w-10`}
            ></div>

            <div className="flex-1 space-y-5 py-1">
              <div className={`h-3 ${darkClass} ${lightClass} rounded`}></div>

              <div className="space-y-3">
                {Array.from({ length: randomLineCount }).map((_, index) => {
                  const minGridValue = 3;
                  const maxGridValue = 6;
                  const randomGridClass = `grid-cols-${randomNumber(
                    minGridValue,
                    maxGridValue
                  )}`;

                  return (
                    <div
                      key={index}
                      className={`grid gap-4 ${randomGridClass}`}
                    >
                      <div
                        className={`h-2 ${darkClass} ${lightClass} rounded col-span-2`}
                      ></div>
                      <div
                        className={`h-2 ${darkClass} ${lightClass} rounded col-span-1`}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center flex-wrap gap-x-2 gap-y-1.5">
            {Array.from({ length: randomNumber(2, 5) }).map((_, index) => (
              <div
                key={index}
                className={`w-12 h-4 ${darkClass} ${lightClass} bg-slate-400 rounded-full`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSkeleton;
