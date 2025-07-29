import {Outlet} from "react-router-dom";
import {Navigation} from "./Naviagtions.tsx";
import { Footer } from "../components/footer.tsx";

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="bg-gray-800 text-white">
                <Navigation />
            </div>
            <main className="flex-grow pt-2 bg-[#f0ede7]">

                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;

/*every page inside /app/* will have
 the same navbar and footer
 and only the middle content (<Outlet />) changes 🔁
Dont need to add them in every page.
*/