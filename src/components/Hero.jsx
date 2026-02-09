import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import heroVideo from "../assets/hero-video.mp4";

const Hero = () => {
  const [open, setOpen] = useState(null);

  const [fromCity, setFromCity] = useState("Hyderabad");
  const [country, setCountry] = useState("India");
  const [destination, setDestination] = useState("Goa");
  const [date, setDate] = useState(null);
  const [rooms, setRooms] = useState("Select Rooms");

  const wrapperRef = useRef(null);

  /* ---------- Close on outside click ---------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (key) => {
    setOpen((prev) => (prev === key ? null : key));
  };

  const dropdownBase =
  "absolute left-0 top-full mt-3 z-[9999] transition-all duration-300 ease-out";


  const closed =
    "opacity-0 scale-95 -translate-y-2 pointer-events-none";
  const openState =
    "opacity-100 scale-100 translate-y-0";

  return (
    <section className="relative w-full h-[90vh] overflow-visible">
      {/* 🎥 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">
        <h1 className="text-white font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center max-w-4xl leading-tight mt-28">
          Travel the world smoothly with <br className="hidden sm:block" />
          deals that actually hit
        </h1>

        {/* Search Card */}
        <div
          ref={wrapperRef}
          className="mt-20 w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-4 relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* FROM */}
            <div
              className="relative border rounded-xl p-3 cursor-pointer"
              onClick={() => toggle("from")}
            >
              <p className="text-xs text-white">From city</p>
              <p className="font-semibold text-white">{fromCity}</p>
              <p className="text-xs text-white">{country}</p>

              <div className={`${dropdownBase} ${open === "from" ? openState : closed}`}>
                <div className="bg-white rounded-xl shadow-lg p-3">
                  {["Hyderabad", "Bangalore", "Mumbai", "Delhi"].map((city) => (
                    <p
                      key={city}
                      className="p-2 rounded hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setFromCity(city);
                        setCountry("India");
                        setOpen(null);
                      }}
                    >
                      {city}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* DESTINATION */}
            <div
              className="relative border rounded-xl p-3 cursor-pointer"
              onClick={() => toggle("destination")}
            >
              <p className="text-xs text-white">Destination / Country</p>
              <p className="font-semibold text-white">{destination}</p>

              <div className={`${dropdownBase} ${open === "destination" ? openState : closed}`}>
                <div className="bg-white rounded-xl shadow-lg p-3">
                  {["Goa", "Kerala", "Dubai", "Singapore"].map((place) => (
                    <p
                      key={place}
                      className="p-2 rounded hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setDestination(place);
                        setOpen(null);
                      }}
                    >
                      {place}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* DATE (POPUP CALENDAR — FIXED) */}
            <div
              className="relative border rounded-xl p-3 cursor-pointer"
              onClick={() => toggle("date")}
            >
              <p className="text-xs text-white">Departure Date</p>
              <p className="font-semibold text-white">
                {date
                  ? date.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Select Date"}
              </p>

              {/* Floating Calendar Popup */}
              <div className={`${dropdownBase} ${open === "date" ? openState : closed}`}>
                <div className="bg-black/50 backdrop-blur-2xl border border-black/30 rounded-2xl shadow-2xl p-2 w-[320px]">
                  <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={(selected) => {
                      setDate(selected);
                      setOpen(null);
                    }}
                    disabled={{ before: new Date() }}
                    modifiersClassNames={{
                      selected: "bg-blue-600 text-white",
                      today: "border border-blue-400",
                    }}
                    className="text-white"
                  />
                </div>
              </div>
            </div>

            {/* ROOMS */}
            <div
              className="relative border rounded-xl p-3 cursor-pointer"
              onClick={() => toggle("rooms")}
            >
              <p className="text-xs text-white">Rooms & Guests</p>
              <p className="font-semibold text-white">{rooms}</p>

              <div className={`${dropdownBase} ${open === "rooms" ? openState : closed}`}>
                <div className="bg-white rounded-xl shadow-lg p-3">
                  {[
                    "1 Room • 2 Guests",
                    "2 Rooms • 4 Guests",
                    "3 Rooms • 6 Guests",
                  ].map((option) => (
                    <p
                      key={option}
                      className="p-2 rounded hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setRooms(option);
                        setOpen(null);
                      }}
                    >
                      {option}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-end mt-6">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition mr-[500px]">
              Go Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
