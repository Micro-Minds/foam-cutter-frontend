import precisionIcon from "../assets/precisionIcon.png";
import uiIcon from "../assets/uiIcon.png";
import historyIcon from "../assets/historyIcon.png";

export function AboutPage() {
  return (
    <div className="bg-[#e5dfd5] min-h-screen pt-10 px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold tracking-widest mb-2">
        Why Choose Us
      </h1>
      <h2 className="text-xl md:text-2xl text-gray-500 mb-10">
        Why Choose Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center mb-10">
        {/* Card 1 */}
        <div className="bg-[#A3B18A] rounded-xl p-6 w-full max-w-xs shadow-md">
          <img src={precisionIcon} alt="Precision" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Precision of Printing</h3>
          <p className="text-gray-700">Achieve perfect designs every time</p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#A3B18A] rounded-xl p-6 w-full max-w-xs shadow-md">
          <img src={uiIcon} alt="User Interface" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">User-Friendly Interface</h3>
          <p className="text-gray-700">
            Upload and manage your designs effortlessly
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#A3B18A] rounded-xl p-6 w-full max-w-xs shadow-md">
          <img src={historyIcon} alt="Design History" className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Secure Design History</h3>
          <p className="text-gray-700">
            Keep track of all your past creations
          </p>
        </div>
      </div>
    </div>
  );
}
