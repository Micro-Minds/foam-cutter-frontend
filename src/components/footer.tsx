import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-white/90 backdrop-blur-md border-t border-gray-200/20 text-emerald-700 py-8 px-4 mt-auto shadow-lg">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm sm:text-base">
                {/* Left column */}
                <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-lg mb-2">Edge Maker</h3>
                    <ul className="space-y-1">
                        <li><Link to="/app/home" className="hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded-lg transition-all duration-200">Home</Link></li>
                        <li><Link to="/app/library" className="hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded-lg transition-all duration-200">Library</Link></li>
                        <li><Link to="/app/ourwork" className="hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded-lg transition-all duration-200">Our Work</Link></li>
                        {/* <li><Link to="/app/history" className="hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded-lg transition-all duration-200">History</Link></li> */}
                        <li><Link to="/app/about" className="hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded-lg transition-all duration-200">About</Link></li>
                        <li><Link to="/app/review" className="hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded-lg transition-all duration-200">Review</Link></li>
                    </ul>
                </div>

                {/* Center column */}
                <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">Contact</h3>
                    <div className="flex justify-center gap-6 text-2xl sm:text-xl mt-2 text-emerald-600">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-emerald-800 hover:bg-emerald-50 p-2 rounded-lg transition-all duration-200"><FaInstagram /></a>
                        <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-emerald-800 hover:bg-emerald-50 p-2 rounded-lg transition-all duration-200"><FaWhatsapp /></a>
                        <a href="mailto:example@email.com" aria-label="Email" className="hover:text-emerald-800 hover:bg-emerald-50 p-2 rounded-lg transition-all duration-200"><FaEnvelope /></a>
                    </div>
                    <p className="mt-4 text-emerald-500 text-xs sm:text-sm">© 2025 microminds</p>
                </div>

                {/* Right column */}
                <div className="text-center sm:text-right mt-6 sm:mt-0">
                    <h3 className="font-semibold text-lg mb-2">Address</h3>
                    <p className="text-emerald-600 text-sm sm:text-base leading-relaxed">
                        microminds@gmail.com<br />
                        MicroMinds Group Pvt. Ltd, Colombo, Sri Lanka<br />
                        +94 71 234 5678
                    </p>
                </div>
            </div>
        </footer>
    );
};
