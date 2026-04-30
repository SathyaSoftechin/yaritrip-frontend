import { FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

import herobg from "../assets/Contact/hero.png";

const Contact = () => {
    return (
        <div className="w-full">

            {/* HERO */}
            <div
                className="relative h-[350px] md:h-[450px] bg-cover bg-center flex items-center justify-center text-center"
                style={{
                    backgroundImage: `url(${herobg})`,
                }}
            >
                <div className="absolute inset-0 bg-black/40" />

                <h1 className="relative z-10 text-white text-5xl md:text-5xl font-serif">
                    Contact Us
                </h1>
            </div>

            {/* MAIN SECTION */}
            <section className="relative bg-gray-100 pt-32 pb-12 px-4 md:px-6">

                {/* Floating Card Container */}
                <div className="max-w-6xl mx-auto -mt-40 relative z-10">

                    <div className="grid md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl shadow-xl">

                        {/* FORM */}
                        <div className="md:col-span-2 space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full p-3 rounded-md bg-gray-100 outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 rounded-md bg-gray-100 outline-none"
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                className="w-full p-3 rounded-md bg-gray-100 outline-none"
                            />
                            <textarea
                                rows="5"
                                placeholder="Your Message"
                                className="w-full p-3 rounded-md bg-gray-100 outline-none"
                            />
                            <button className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600">
                                Send Now
                            </button>
                        </div>

                        {/* CONTACT CARD */}
                        <div className="bg-gray-50 p-5 rounded-xl space-y-6">

                            {/* CALL */}
                            <div className="flex gap-3 items-start">
                                <div className="bg-blue-100 p-3 rounded-md text-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#367af2" d="m21 15.46l-5.27-.61l-2.52 2.52a15.05 15.05 0 0 1-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97z"/></svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-blue-600">Call Anytime</h4>
                                    <p className="text-sm text-gray-600">+91 23678 27867</p>
                                    <p className="text-sm text-gray-600">+91 67678 92878</p>
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="flex gap-3 items-start">
                                <div className="bg-blue-100 p-3 rounded-md ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><g fill="none"><path fill="#367af2" d="M2.757 6.071A.5.5 0 0 0 2 6.5v8A2.5 2.5 0 0 0 4.5 17h11a2.5 2.5 0 0 0 2.5-2.5v-8a.5.5 0 0 0-.757-.429L10 10.417z" /><path fill="url(#SVGj5XpYbUo)" d="M2.757 6.071A.5.5 0 0 0 2 6.5v8A2.5 2.5 0 0 0 4.5 17h11a2.5 2.5 0 0 0 2.5-2.5v-8a.5.5 0 0 0-.757-.429L10 10.417z" /><path fill="url(#SVGygvXycNq)" d="M2.757 6.071A.5.5 0 0 0 2 6.5v8A2.5 2.5 0 0 0 4.5 17h11a2.5 2.5 0 0 0 2.5-2.5v-8a.5.5 0 0 0-.757-.429L10 10.417z" /><path fill="url(#SVGt4VFbc3v)" fill-opacity="0.75" d="M2.757 6.071A.5.5 0 0 0 2 6.5v8A2.5 2.5 0 0 0 4.5 17h11a2.5 2.5 0 0 0 2.5-2.5v-8a.5.5 0 0 0-.757-.429L10 10.417z" /><path fill="url(#SVGdPNFZbrR)" fill-opacity="0.7" d="M2.757 6.071A.5.5 0 0 0 2 6.5v8A2.5 2.5 0 0 0 4.5 17h11a2.5 2.5 0 0 0 2.5-2.5v-8a.5.5 0 0 0-.757-.429L10 10.417z" /><path fill="url(#SVGqtSPpd1q)" d="M4.5 4A2.5 2.5 0 0 0 2 6.5v.6a.5.5 0 0 0 .247.431l7.5 4.4a.5.5 0 0 0 .506 0l7.5-4.4A.5.5 0 0 0 18 7.1v-.6A2.5 2.5 0 0 0 15.5 4z" /><defs><linearGradient id="SVGj5XpYbUo" x1="12.031" x2="16.923" y1="8.156" y2="16.616" gradientUnits="userSpaceOnUse"><stop offset=".228" stop-color="#0094f0" stop-opacity="0" /><stop offset=".431" stop-color="#0094f0" /></linearGradient><linearGradient id="SVGygvXycNq" x1="7.714" x2="2.272" y1="7.158" y2="17.134" gradientUnits="userSpaceOnUse"><stop offset=".228" stop-color="#0094f0" stop-opacity="0" /><stop offset=".431" stop-color="#0094f0" /></linearGradient><linearGradient id="SVGt4VFbc3v" x1="14.219" x2="15.057" y1="12.563" y2="17.991" gradientUnits="userSpaceOnUse"><stop stop-color="#2764e7" stop-opacity="0" /><stop offset="1" stop-color="#2764e7" /></linearGradient><linearGradient id="SVGdPNFZbrR" x1="12.476" x2="14.006" y1="7.351" y2="18.41" gradientUnits="userSpaceOnUse"><stop offset=".533" stop-color="#ff6ce8" stop-opacity="0" /><stop offset="1" stop-color="#ff6ce8" /></linearGradient><linearGradient id="SVGqtSPpd1q" x1="6.753" x2="12.394" y1="1.507" y2="15.118" gradientUnits="userSpaceOnUse"><stop stop-color="#6ce0ff" /><stop offset=".462" stop-color="#29c3ff" /><stop offset="1" stop-color="#4894fe" /></linearGradient></defs></g></svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-blue-600">Send Email</h4>
                                    <p className="text-sm text-gray-600">connect@yaritrip.com</p>
                                    <p className="text-sm text-gray-600">hello@yaritrip.com</p>
                                </div>
                            </div>

                            {/* SOCIAL */}
                            <div>
                                <h4 className="font-semibold mb-2">Follow us</h4>
                                <div className="flex gap-3">
                                    <div className="bg-blue-500 text-white p-2 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="url(#SVGKdMMobCR)" rx="60"/><rect width="256" height="256" fill="url(#SVGqYUiQbXV)" rx="60"/><path fill="#fff" d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355s22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334s-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334"/><defs><radialGradient id="SVGKdMMobCR" cx="0" cy="0" r="1" gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)" gradientUnits="userSpaceOnUse"><stop stop-color="#fd5"/><stop offset=".1" stop-color="#fd5"/><stop offset=".5" stop-color="#ff543e"/><stop offset="1" stop-color="#c837ab"/></radialGradient><radialGradient id="SVGqYUiQbXV" cx="0" cy="0" r="1" gradientTransform="rotate(78.68 -32.69 -16.937)scale(113.412 467.488)" gradientUnits="userSpaceOnUse"><stop stop-color="#3771c8"/><stop offset=".128" stop-color="#3771c8"/><stop offset="1" stop-color="#60f" stop-opacity="0"/></radialGradient></defs></g></svg></div>
                                    <div className="bg-blue-500 text-white p-2 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02"/></svg></div>
                                    <div className="bg-blue-500 text-white p-2 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 128 128"><path d="M75.916 54.2L122.542 0h-11.05L71.008 47.06L38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303L89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086l-39.42-56.386h16.972L65.19 53.824l4.954 7.086l41.353 59.15h-16.97L60.782 71.793Z"/></svg></div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default Contact;