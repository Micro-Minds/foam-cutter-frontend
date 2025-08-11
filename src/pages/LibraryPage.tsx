import design1 from "../assets/design1.jpg";
import design2 from "../assets/design2.jpg";
import chess from "../assets/chess.jpg";
import horseImage from "../assets/horse.jpg";

import {
    deleteLibraryItem,
    getAllLibraryItems,
    saveNewLibraryItem,
} from "../service/libraryService.ts";

import {getNextLibraryId} from "../service/genarateIDs.ts";
import {useEffect, useState} from "react";
import {sendGcodeToESP} from "../service/sendGCodeToEsp.ts";
import {Modal} from "../components/Modal.tsx";

// export const STAR_5: string = `G21
// G90
// (5-point star)
// G0 X0 Y38.042
// G1 X23.511 Y30.901
// G1 X30.901 Y7.389
// G1 X38.042 Y30.901
// G1 X61.553 Y38.042
// G1 X38.042 Y45.183
// G1 X30.901 Y68.695
// G1 X23.511 Y45.183
// G1 X0 Y38.042
// M30`;

const horse= `
G21         ; Set units to millimeters
G90         ; Use absolute positioning
G0 Z5       ; Raise Z to 5mm (lift the tool)
G0 X0 Y0    ; Move to origin
G1 Z-1 F100 ; Lower Z slowly to -1mm (cutting depth)
G1 X20 Y0 F200 ; Cut in a straight line 20mm in X direction
G1 X20 Y20    ; Cut 20mm in Y direction
G1 X0 Y20     ; Cut back to X=0
G1 X0 Y0      ; Cut back to origin, completing a square
G0 Z5        ; Lift Z back up
M30          ; Program end
`;

export function LibraryPage() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        gcode:"",
        title: "",
        description: "",
        image: "",
        feedRate: 100,
        size:50,
        stepSize:1,
        time: 1
    });
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result:any = await getAllLibraryItems();
            setItems(result);
            console.log(result);
        }
        fetchData();
    }, []);

    const handleSubmit = async () => {
        console.log("Submitted:", formData);
        setModalOpen(false);
        const id = await getNextLibraryId();
        const ref = saveNewLibraryItem(id, formData.gcode, formData.feedRate, formData.size, formData.stepSize,
            formData.time, formData.title, formData.description, formData.image)
        console.log(ref);

    };

    function handleStop() {
        //sendGcodeToESP(`M0`);
    }

    const handleSend = async (title: string) => {

        //updateFeedRateAndStepSize(STAR_5, 1, 400);
        alert(
            `⚠️ Preparing to print "${title}"\n\nPlease ensure the CNC is connected and the rigifoam is properly held before starting the print.`
        );
        await sendGcodeToESP(horse);

    };

    const handleAdd = async () => {

        setModalOpen(true);
        const id = await getNextLibraryId();
    };

    const handleUpdate = (title: string) => {
        alert(`✏️ Update "${title}": Implement update form or modal here.`);
        // test update item function
        //updateLibraryItem("C012",STAR_5,100,20,1,5.1)
    };

    const handleDelete = (title: string) => {
        const confirmDelete = confirm(`❌ Are you sure you want to delete "${title}"?`);
        if (confirmDelete) {
            alert(`Deleted "${title}" (you should now remove it from the list).`);
            // delete
            const deleted = deleteLibraryItem("C013");
            console.log(deleted);
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

    function handleRestart() {
        sendGcodeToESP(restartCommands);
    }

    return (
        <div className="bg-[#e5dfd5] min-h-screen p-8">

            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={handleStop}
                    className="bg-green-400 text-black px-6 py-2 rounded hover:bg-blue-700 transition ml-4 min-w-[160px] text-center"
                >
                    Emergency Stop 🛑
                </button>

                <button
                    onClick={handleRestart}
                    className="bg-green-400 text-black px-6 py-2 rounded hover:bg-blue-700 transition ml-4 min-w-[160px] text-center"
                >
                    Restart
                </button>

            </div>


            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-center w-full">Design Library</h1>
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ml-4 min-w-[160px] text-center"
                >
                    + Add Design
                </button>
            </div>


            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
            />

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
                            {/* <button
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
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}