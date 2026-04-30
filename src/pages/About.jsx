import { FaStar } from "react-icons/fa";

import herobg from "../assets/About/hero.png";
import img1 from "../assets/About/img1.png";
import mission from "../assets/About/mission.png";
import vision from "../assets/About/vision.png";
import values from "../assets/About/values.png";

const About = () => {
    return (
        <div className="w-full">

            {/* HERO SECTION */}
            <div
                className="relative h-[350px] md:h-[450px] bg-cover bg-center flex items-center justify-center text-center"
                style={{
                    backgroundImage: `url(${herobg})`,
                }}
            >
                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 text-white px-4">
                    <h1 className="text-2xl md:text-5xl mb-2 font-serif">
                        Crafting Journeys, Creating Memories
                    </h1>
                    <p className="text-sm md:text-base max-w-xl mx-auto">
                        We design unforgettable travel experiences with curated packages, seamless planning, and end-to-end support.
                    </p>
                </div>
            </div>

            {/* OUR STORY */}
            <section className="py-12 px-6 max-w-6xl mx-auto text-center">
                <h2 className="text-4xl mb-6 font-serif">Our Story</h2>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <p className="text-black text-xl leading-relaxed">
                        Our journey began with a simple idea: make travel easy, affordable,
                        and memorable for everyone. From weekend getaways to international
                        holidays, we craft experiences that go beyond destinations.
                    </p>

                    <div className="p-2 rounded-xl text-left">
                        <img src={img1} alt="img1" />
                    </div>
                </div>
            </section>

            {/* MISSION VISION VALUES */}
            <section className="py-12 px-6 max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-8 font-serif">
                    Mission • Vision • Values
                </h2>

                <div className="grid md:grid-cols-3 gap-6">

                    {/* MISSION */}
                    <div className="border rounded-xl p-5 shadow-sm">
                        <h3 className="font-semibold mb-3 text-lg">Mission</h3>
                        <img src={mission} alt="mission" />
                        <p className="text-md text-gray-600 mt-10">
                            To make travel accessible, stress free, and experience-rich for every traveler
                        </p>
                    </div>

                    {/* VISION */}
                    <div className="border rounded-xl p-5 shadow-sm">
                        <h3 className="font-semibold mb-3 text-lg">Vision</h3>
                        <img src={vision} alt="vision" />
                        <p className="text-md text-gray-600 mt-10">
                            To become the most trusted global travel partner for curated trips.
                        </p>
                    </div>

                    {/* VALUES */}
                    <div className="border rounded-xl p-5 shadow-sm">
                        <h3 className="font-semibold mb-3 text-lg">Values</h3>
                        <img src={values} alt="values" />
                        <ul className="text-md text-gray-600 space-y-2 mt-5 ml-2">
                            <li className="flex items-center gap-2">
                                <span className="text-black">✔</span> Customer First
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-black">✔</span> Transparency
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-black">✔</span> Safety
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-black">✔</span> Experience Quality
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* WHAT WE OFFER */}
            <section className="py-14 px-6 max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-10 font-serif">
                    What We Offer
                </h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Domestic Tours",
                            icon: "🌍",
                            desc: "Explore the beauty of your own country with perfectly curated local travel experiences.",
                        },
                        {
                            title: "International Packages",
                            icon: "✈️",
                            desc: "Discover global destinations with hassle-free planning and all-inclusive travel packages.",
                        },
                        {
                            title: "Honeymoon Trips",
                            icon: "🏝️",
                            desc: "Celebrate love with romantic escapes designed for unforgettable moments together.",
                        },
                        {
                            title: "Family Vacations",
                            icon: "👨‍👩‍👧‍👦",
                            desc: "Create joyful memories with fun-filled trips crafted for the whole family.",
                        },
                        {
                            title: "Adventure Tours",
                            icon: "🧗🏻",
                            desc: "Fuel your thrill with action-packed journeys across mountains, forests, and beyond.",
                        },
                        {
                            title: "Corporate Trips",
                            icon: "🏢",
                            desc: "Seamless business travel and team outings planned with comfort and professionalism.",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-6 text-left transition duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            {/* Title + Icon */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-lg">{item.icon}</span>
                                <h4 className="font-semibold text-gray-800">
                                    {item.title}
                                </h4>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ACHIEVEMENTS */}
            <section className="py-14 px-6 max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-10 font-serif">
                    Our Achievements
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-items-center">
                    {[
                        { icon: "🌍", value: "250+", label: "Travelers" },
                        { icon: "🧳", value: "50+", label: "Trips Organized" },
                        { icon: "⭐", value: "4.8", label: "Average Rating" },
                        // { icon: "🏆", value: "10+", label: "Travel Awards" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-center transition duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            {/* Icon */}
                            <span className="text-xl mb-1">{item.icon}</span>

                            {/* Value */}
                            <p className="text-base font-semibold text-gray-800">
                                {item.value}
                            </p>

                            {/* Label */}
                            <p className="text-xs text-gray-600">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* TESTIMONIALS */}
            {/* <section className="py-12 px-6 max-w-6xl mx-auto text-center">
                <h2 className="text-2xl font-semibold mb-8">
                    Customer Testimonials
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="border rounded-xl p-5 shadow-sm text-left">
                            <p className="text-sm text-gray-600 mb-4">
                                "The best travel experience we’ve ever had. Highly recommended!"
                            </p>

                            <div className="flex items-center gap-3">
                                <img
                                    src="https://i.pravatar.cc/40"
                                    className="rounded-full"
                                    alt=""
                                />
                                <div>
                                    <p className="text-sm font-medium">Jorge Monahan</p>
                                    <div className="flex text-yellow-400 text-xs">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section> */}

        </div>
    );
};

export default About;