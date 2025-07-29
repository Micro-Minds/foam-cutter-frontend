import design1 from "../assets/design1.jpg"; 
import design2 from "../assets/design2.jpg";
import chess from "../assets/chess.jpg";
import horseImage from "../assets/horse.jpg";
import {
  estimateCuttingTimeWithFixedFeed,
  updateFeedRateAndStepSize
} from "../generateGCodes/genarateLibraryImagesGcodes.ts";
import {getAllLibraryItems, saveNewLibraryItem} from "../service/libraryService.ts";
import {getNextLibraryId} from "../service/genarateIDs.ts";
import {sendGcodeToESP} from "../service/sendGCodeToEsp.ts";

export const STAR_5: string = `G21
G90
(5-point star)
G0 X0 Y38.042
G1 X23.511 Y30.901
G1 X30.901 Y7.389
G1 X38.042 Y30.901
G1 X61.553 Y38.042
G1 X38.042 Y45.183
G1 X30.901 Y68.695
G1 X23.511 Y45.183
G1 X0 Y38.042
M30`;

export function LibraryPage() {
  const handleSend = async (title: string) => {

    estimateCuttingTimeWithFixedFeed(STAR_5, 400);
    const id = await getNextLibraryId();
    const ref = saveNewLibraryItem(id, STAR_5, 200, 50, 1, 5);
    console.log(ref);
    //remapGCode2DInCm(STAR_5,1,200,8);
    updateFeedRateAndStepSize(STAR_5, 1, 400);

    getAllLibraryItems();

    alert(
        `⚠️ Preparing to print "${title}"\n\nPlease ensure the CNC is connected and the rigifoam is properly held before starting the print.`
    );


  };

  const handleAdd = () => {
    alert("➕ Add Design: You can now open a form/modal to add a new design.");
  };

  const handleUpdate = (title: string) => {
    alert(`✏️ Update "${title}": Implement update form or modal here.`);
  };

  const handleDelete = (title: string) => {
    const confirmDelete = confirm(`❌ Are you sure you want to delete "${title}"?`);
    if (confirmDelete) {
      alert(`Deleted "${title}" (you should now remove it from the list).`);
    }
  };

  const designs = [
    {
      title: "FIT 23",
      image: design1,
      description:
        "The official logo of the Faculty of Information Technology, Batch 23. A perfect commemorative design for events or souvenirs.",
      size: "200mm × 150mm",
      time: "8 minutes",
      feedRate: "1200 mm/min",
    },
    {
      title: "Ballet Girl",
      image: design2,
      description:
        "An elegant silhouette of a ballet dancer. Ideal for wall art or creative décor, cut smoothly with the hot wire CNC.",
      size: "180mm × 180mm",
      time: "12 minutes",
      feedRate: "1000 mm/min",
    },
    {
      title: "Chess Pawn",
      image: chess, 
      description:
        "A classic chess pawn silhouette, great for educational models or decorative pieces. Easy to cut with precise edges.",
      size: "160mm × 100mm",
      time: "6 minutes",
      feedRate: "1100 mm/min",
    },
    {
      title: "Horse Silhouette",
      image: horseImage, 
      description:
        "A bold and dynamic silhouette of a horse. Perfect for decorative or artistic CNC cuts with detailed curves and edges.",
      size: "220mm × 170mm",
      time: "10 minutes",
      feedRate: "1100 mm/min",
    }
  ];

  return (
    <div className="bg-[#e5dfd5] min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center w-full">Design Library</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ml-4 min-w-[160px] text-center"
        >
          + Add Design
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {designs.map((design, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 w-full max-w-[320px] mx-auto sm:mx-0 transform transition duration-300 hover:shadow-xl hover:scale-[1.02]"

          >
            <img
              src={design.image}
              alt={design.title}
              className="w-full h-36 object-contain rounded bg-white"
            />

            <h2 className="text-xl font-semibold mt-4 mb-2">{design.title}</h2>
            <p className="text-gray-700 mb-2">{design.description}</p>
            <p className="text-sm text-gray-600">
              <strong>Size:</strong> {design.size}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Approx. Time:</strong> {design.time}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Feed Rate:</strong> {design.feedRate}
            </p>

            <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
              <button
                onClick={() => handleSend(design.title)}
                className="bg-green-600 text-white px-2 py-1 text-sm rounded hover:bg-green-700 transition"
              >
                Send to Print
              </button>
              <button
                onClick={() => handleUpdate(design.title)}
                className="bg-yellow-500 text-white px-2 py-1 text-sm rounded hover:bg-yellow-600 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(design.title)}
                className="bg-red-600 text-white px-2 py-1 text-sm rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
