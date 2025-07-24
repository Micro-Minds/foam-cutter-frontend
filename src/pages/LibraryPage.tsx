import design1 from "../assets/design1.jpg"; // replace with your real images
import design2 from "../assets/design2.jpg";

export function LibraryPage() {
  const handleSend = (title: string) => {
    alert(
      `⚠️ Preparing to print "${title}"\n\nPlease ensure the CNC is connected and the rigifoam is properly held before starting the print.`
    );
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
  ];

  return (
    <div className="bg-[#e5dfd5] min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Design Library</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {designs.map((design, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden p-6 max-w-sm mx-auto"
          >

          <img
            src={design.image}
            alt={design.title}
            className="w-full max-h-64 object-contain rounded"
          />

            <h2 className="text-xl font-semibold mt-4 mb-2">{design.title}</h2>
            <p className="text-gray-700 mb-2">{design.description}</p>
            <p className="text-sm text-gray-600">
              <strong>Size:</strong> {design.size}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Approx. Time:</strong> {design.time}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Feed Rate:</strong> {design.feedRate}
            </p>
            <button
              onClick={() => handleSend(design.title)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Send to Print
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
