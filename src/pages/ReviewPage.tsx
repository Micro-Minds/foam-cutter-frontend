import emma from "../assets/emma.png";
import liam from "../assets/liam.png";
import sophia from "../assets/sophia.png";


export function ReviewPage() {
  return (
    <div className="bg-[#e5dfd5] min-h-screen pt-10 px-4 text-center">
      {/* Heading */}
      <p className="text-gray-600 text-lg">Testimonials</p>
      <h1 className="text-3xl md:text-4xl font-bold mb-10">
        Read What Others Have To Say
      </h1>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center mb-10">
        {/* Card 1 */}
        <div className="bg-[#3A5A40] rounded-xl p-6 w-full max-w-xs shadow-md text-white">
          <img
            src={emma}
            alt="Emma W"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-lg font-semibold mb-2">Emma W</h3>
          <p className="text-sm">
            The printing process was seamless! Uploading my designs was super
            easy, and the results were absolutely stunning. I’m amazed by the precision!
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#3A5A40] rounded-xl p-6 w-full max-w-xs shadow-md text-white">
          <img
            src={liam}
            alt="Liam T"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-lg font-semibold mb-2">Liam T</h3>
          <p className="text-sm">
            As a beginner, I was impressed by how user-friendly the system is.
            The step-by-step process and the incredible print quality exceeded my expectations!
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#3A5A40] rounded-xl p-6 w-full max-w-xs shadow-md text-white">
          <img
            src={sophia}
            alt="Sophia L"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-lg font-semibold mb-2">Sophia L</h3>
          <p className="text-sm">
            This platform is so accessible. I loved how I could revisit my old
            designs and print them again with ease. Highly recommended!
          </p>
        </div>
      </div>
    </div>
  );
}
