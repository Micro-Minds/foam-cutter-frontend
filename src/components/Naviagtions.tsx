import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import logo from "../assets/logo.png"; 

export function Navigation() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);                          
                                                                                                       
    function closeMobileMenu() {                                                                        // initialize variables, define functions, use react hooks, etc
    setMobileMenuOpen(false);
    }

    function handleLogout() {
        console.log("Logging out...");
        window.location.href = "/";                                                                      //current URL changes to / 
    }

    return (
        <>
            {/* Fixed Navigation Bar */}
           <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/20 text-emerald-700 flex justify-between items-center px-4 py-4 sm:px-8 fixed top-0 left-0 w-full z-40 shadow-lg h-16 sm:h-20">
                <div className="flex items-center">
                    {/* Mobile Menu Toggle */}
                    <button
                        className="sm:hidden p-2 focus:outline-none hover:bg-emerald-50 rounded-lg transition-colors duration-200 z-50"
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}                              //when user clicks on hamburger icon then setMobileMenuOpen to true
                    >
                        {isMobileMenuOpen ? <AiOutlineClose size={24} className="text-emerald-600" /> : <AiOutlineBars size={24} className="text-emerald-600" />}  {/*if isMobileMenuOpen is true then show close icon else show hamburger icon*/} 
                    </button>                                                                          
                    <img 
                        src={logo}
                        alt="Edge Maker Logo" 
                        className="w-8 h-8 sm:w-10 sm:h-10 ml-4 rounded-lg object-cover"
                    />
                    <h1 className="ml-2 text-xl sm:text-2xl font-bold tracking-wide text-emerald-800 bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
                        Edge Maker V1
                    </h1>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden bg-white/95 backdrop-blur-md text-emerald-700 fixed top-0 left-0 w-full z-20 shadow-xl border-b border-gray-200/20 pt-16">
                        <ul className="space-y-1 px-6 py-6 text-lg">
                            <li><Link to="/app/home" onClick={closeMobileMenu} className="block hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200">Home</Link></li>
                            <li><Link to="/app/library" onClick={closeMobileMenu} className="block hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200">Library</Link></li>
                            <li><Link to="/app/ourwork" onClick={closeMobileMenu} className="block hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200">OurWork</Link></li>
                            {/* <li><Link to="/app/history" onClick={closeMobileMenu} className="block hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200">History</Link></li> */}
                            <li><Link to="/app/about" onClick={closeMobileMenu} className="block hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200">About</Link></li>
                            <li><Link to="/app/review" onClick={closeMobileMenu} className="block hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200">Review</Link></li>
                            <li><button onClick={handleLogout} className="block text-left w-full hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200">Logout</button></li>
                            
                        </ul>
                    </div>
                )}

                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center space-x-2">                                  {/* Hide this on all screens then display flex on sm(>640px)*/}  
                    <Link to="/app/home" className="hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium">Home</Link>
                    <Link to="/app/library" className="hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium">Library</Link>
                    <Link to='/app/ourwork' className="hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium">OurWork</Link>
                    {/* <Link to="/app/history" className="hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium">History</Link> */}
                    <Link to="/app/about" className="hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium">About</Link>
                    <Link to="/app/review" className="hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium">Review</Link>
                    <button onClick={handleLogout} className="hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium border border-emerald-200 hover:border-emerald-300">Logout</button> 
                </div>

            </header>
            
            {/* Spacer div to push content below fixed navbar */}
            <div className="h-16 sm:h-20"></div>
        </>
    );
};  