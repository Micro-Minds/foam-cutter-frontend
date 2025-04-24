import {Outlet} from "react-router-dom";
import {Navigation} from "./Naviagtions.tsx";

const RootLayout = () => {
    return (

        <>
            <div className="bg-gray-800 text-white">
                <Navigation/>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-0 mt-10 h-24 overflow-auto bg-white">
                <Outlet/>
            </main>
        </>


    );
};

export default RootLayout;
