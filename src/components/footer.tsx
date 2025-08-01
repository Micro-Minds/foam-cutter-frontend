import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-[#344E41] text-white py-8 px-4 mt-auto">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm sm:text-base">
                {/* Left column */}
                <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-lg mb-2">Microminds</h3>
                    <ul className="space-y-1">
                        <li><Link to="/app/home" className="hover:text-green-300">Home</Link></li>
                        <li><Link to="/app/library" className="hover:text-green-300">Library</Link></li>
                        <li><Link to="/app/history" className="hover:text-green-300">History</Link></li>
                        <li><Link to="/app/about" className="hover:text-green-300">About</Link></li>
                        <li><Link to="/app/review" className="hover:text-green-300">Review</Link></li>
                    </ul>
                </div>

                {/* Center column */}
                <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">Contact</h3>
                    <div className="flex justify-center gap-6 text-2xl sm:text-xl mt-2">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
                        <a href="mailto:example@email.com" aria-label="Email"><FaEnvelope /></a>
                    </div>
                    <p className="mt-4 text-gray-400 text-xs sm:text-sm">© 2025 microminds</p>
                </div>

                {/* Right column */}
                <div className="text-center sm:text-right mt-6 sm:mt-0">
                    <h3 className="font-semibold text-lg mb-2">Address</h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        microminds@gmail.com<br />
                        MicroMinds Group Pvt. Ltd, Colombo, Sri Lanka<br />
                        +94 71 234 5678
                    </p>
                </div>
            </div>
        </footer>
    );
};
