const offers = [
  { id: 1, text: "Ad / Offer Image 1" },
  { id: 2, text: "Ad / Offer Image 2" },
  { id: 3, text: "Ad / Offer Image 3" },
  { id: 4, text: "Ad / Offer Image 4" },
  { id: 5, text: "Ad / Offer Image 5" },
];

const Offers = () => {
  return (
    <section className="w-full px-4 py-14">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-6 font-heading ml-7">
          Exclusive Privileges for New Members
        </h2>

        {/* Cards */}
        <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-5 md:overflow-visible scrollbar-hide">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="
                min-w-[260px] md:min-w-0
                h-[150px]
                rounded-xl
                bg-gray-100
                border border-dashed border-gray-300
                flex items-center justify-center
                text-sm font-medium text-gray-500
                shadow-sm
              "
            >
              {offer.text}
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </section>
  );
};

export default Offers;
