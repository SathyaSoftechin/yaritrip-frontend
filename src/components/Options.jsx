import { useState } from "react";

const options = [
  { label: "Holiday Packages", icon: "🧳", active: true },
  { label: "Flights", icon: "✈️" },
  { label: "Hotels", icon: "🏨" },
  { label: "Homestays", icon: "🏡" },
  { label: "Trains", icon: "🚆" },
  { label: "Cabs", icon: "🚕" },
  { label: "Buses", icon: "🚌" },
  { label: "Tours & Attractions", icon: "🎡" },
  { label: "Cruise", icon: "🚢" },
  { label: "Forex card & Currency", icon: "💱" },
  { label: "Travel Insurance", icon: "🛡️" },
];

const VISIBLE_COUNT = 6;
const CARD_WIDTH = 150;
const GAP = 16;

const Options = () => {
  const [start, setStart] = useState(0);

  const canSlideLeft = start > 0;
  const canSlideRight = start + VISIBLE_COUNT < options.length;

  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="border rounded-3xl p-6 relative overflow-hidden">

          {/* LEFT ARROW */}
          {canSlideLeft && (
            <button
              onClick={() => setStart((s) => Math.max(0, s - 1))}
              className="
                absolute left-3 top-1/2 -translate-y-1/2 z-20
                w-11 h-11 rounded-full
                bg-white/70 backdrop-blur-md
                border border-white/40
                shadow-lg
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110 hover:shadow-blue-300/50
                active:scale-95
              "
            >
              <svg
                className="w-5 h-5 text-gray-800"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* RIGHT ARROW */}
          {canSlideRight && (
            <button
              onClick={() => setStart((s) => s + 1)}
              className="
                absolute right-3 top-1/2 -translate-y-1/2 z-20
                w-11 h-11 rounded-full
                bg-white/70 backdrop-blur-md
                border border-white/40
                shadow-lg
                flex items-center justify-center
                transition-all duration-300
                hover:scale-110 hover:shadow-blue-300/50
                active:scale-95
              "
            >
              <svg
                className="w-5 h-5 text-gray-800"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* VIEWPORT */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${start * (CARD_WIDTH + GAP)}px)`,
              }}
            >
              {options.map((item) => {
                const isActive = item.active;

                return (
                  <div
                    key={item.label}
                    className={`
                      flex-shrink-0 w-[150px] h-[140px]
                      transition-all duration-300
                      ${isActive 
                        ? "border-blue-500 bg-blue-50 "
                        : "border-gray-200 bg-white"}
                    `}
                  >
                    <div className="h-full flex flex-col items-center gap-2 px-3 py-4">

                      {/* ICON */}
                      <span className="text-3xl">{item.icon}</span>

                      {/* LABEL */}
                      <span
                        className={`text-sm font-medium text-center leading-tight
                          ${isActive ? "text-blue-600" : "text-gray-800"}
                        `}
                      >
                        {item.label}
                      </span>

                      {/* BADGE (CLOSE TO LABEL) */}
                      <div className="h-[26px] flex items-center justify-center">
                        {isActive ? (
                          <span className="opacity-0 text-xs px-3">
                            Coming Soon
                          </span>
                        ) : (
                          <div className="relative overflow-hidden rounded-full border border-gray-200 bg-gray-100 px-3 py-[2px]">
                            <span className="relative z-10 text-xs font-semibold text-red-500 whitespace-nowrap">
                              Coming Soon
                            </span>
                            <span className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Shine animation */}
      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-120%); }
            100% { transform: translateX(120%); }
          }
          .animate-shine {
            animation: shine 2.2s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Options;
