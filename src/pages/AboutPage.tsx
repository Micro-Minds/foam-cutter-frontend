import precisionIcon from "../assets/precisionIcon.png";
import uiIcon from "../assets/uiIcon.png";
import historyIcon from "../assets/historyIcon.png";
import member1 from "../assets/Mask group (1).png";
import member2 from "../assets/Mask group (2).png";
import member3 from "../assets/Mask group (3).png";
import member4 from "../assets/Mask group (4).png";

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

      {/* New Project Description */}
      <div className="max-w-4xl mx-auto mt-16 px-4 md:px-0 text-left">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">About Our CNC Foam Cutting Machine Project</h2>
        <p className="text-gray-700 mb-8 leading-relaxed">
          Our CNC foam cutting machine project was developed to deliver a precise, efficient, and easy-to-use solution for cutting foam materials used in 
          industries such as packaging, prototyping, architecture, and model making. We recognized the need for an affordable, customizable cutting tool
           that could help improve workflow and reduce material waste. This project showcases our dedication and technical skills as IT students at the 
           University of Moratuwa, aiming to address real-world industrial challenges by making advanced cutting technology more accessible. 
           We extend our sincere thanks to the Dean of the IT Faculty for their invaluable support and encouragement throughout this project
        </p>
      </div>

      {/* Team Section */}
      <div className="max-w-4xl mx-auto mt-16 ">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Meet Our Team - MicroMinds</h2>
        <p className="text-gray-700 mb-8 px-4 md:px-0">
          We are MicroMinds, a team of passionate 1st-year IT students from the University of Moratuwa.
          Together, we have created Edge Maker to bring you the best experience in precision design and printing.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <img
            src={member1}
            alt="Team Member 1"
            className="w-24 h-24 rounded-full object-cover shadow-lg"
          />
          <img
            src={member2}
            alt="Team Member 2"
            className="w-24 h-24 rounded-full object-cover shadow-lg"
          />
          <img
            src={member3}
            alt="Team Member 3"
            className="w-24 h-24 rounded-full object-cover shadow-lg"
          />
          <img
            src={member4}
            alt="Team Member 4"
            className="w-24 h-24 rounded-full object-cover shadow-lg"
          />
        </div>
      </div>

      

    </div>

  );
}
