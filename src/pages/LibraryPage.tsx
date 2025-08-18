import design1 from "../assets/design1.jpg";
import {
    getAllLibraryItems,
    saveNewLibraryItem,
} from "../service/libraryService.ts";

import {getNextLibraryId} from "../service/genarateIDs.ts";
import {useEffect, useState} from "react";
import {sendGcodeToESP} from "../service/sendGCodeToEsp.ts";
import {Modal} from "../components/Modal.tsx";
import JobCard from "../components/JobCard.tsx";
import {LibraryItem} from "../interfaces/LibraryItem.ts";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export function LibraryPage() {

    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        gcode:"",
        title: "",
        description: "",
        image: "",
        feedRate: 100,
        size:"",
        stepSize:1,
        time: 1
    });
    const [items, setItems] = useState<LibraryItem[]>([]);

    async function fetchData() {
        const result:LibraryItem[]= await getAllLibraryItems();
        setItems(result);
        console.log(items);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitted:", formData);
        setModalOpen(false);
        const id = await getNextLibraryId();
        const ref = saveNewLibraryItem(id, formData.gcode, formData.feedRate, formData.size, formData.stepSize,
            formData.time, formData.image, formData.title, formData.description)
        console.log(ref);
        fetchData();


    };



    const handleSend = async (title: string, gcode:string) => {

        MySwal.fire({
            title: `⚠️ Preparing to print "${title}"`,
            text: 'Please ensure the CNC is connected and the rigifoam is properly held before starting the print.',
            icon: 'warning',
            confirmButtonText: 'Got it!',
            confirmButtonColor: '#3085d6',
            background: '#f4f4f9',
            iconColor: '#f39c12',
            showCloseButton: true,
            backdrop: true,
            customClass: {
                title: 'text-xl font-semibold text-green-800',
            }
        });

        await sendGcodeToESP(gcode);

    };

    const handleAdd = async () => {
        setModalOpen(true);
    };


    return (
        <div className="bg-[#f0ede7] min-h-screen p-8">
            <div className="flex justify-center sm:justify-end items-center mb-8">
                <button
                    onClick={handleAdd}
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-green-900 transition-all duration-300 ease-in-out sm:w-[200px] w-full text-center font-semibold shadow-lg transform hover:scale-105"
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


            {items.length === 0 ? (
                <p>No designs in the library.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map((item) => (
                        <JobCard
                            key={item.id}
                            title={item.title}
                            feedRate={item.feedRate}
                            estimatedTime={item.time}
                            size={item.size}
                            description={item.description}
                            gcode={item.gcode}
                            imageUrl={item.image || design1}
                            onSend={() => handleSend(item.title,item.gcode)}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}