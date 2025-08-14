import { motion, AnimatePresence } from "framer-motion";
import { toBase64 } from "../service/convertImageToBase64";
import {FiX} from "react-icons/fi";

interface LibraryItemFormData {
    title: string;
    time: number;
    feedRate: number;
    stepSize: number;
    size: string;
    description: string;
    image: string;
    gcode: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    formData: LibraryItemFormData;
    setFormData: React.Dispatch<React.SetStateAction<LibraryItemFormData>>;
}

export function Modal({
                          isOpen,
                          onClose,
                          onSubmit,
                          formData,
                          setFormData,
                      }: ModalProps) {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: e.target.type === "number" ? parseFloat(value) || 0 : value,
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const base64 = await toBase64(file);
            setFormData({
                ...formData,
                image: base64,
            });
        } catch (error) {
            console.error("Error converting file:", error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative overflow-hidden"
                        initial={{scale: 0.95, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0.95, opacity: 0}}
                        transition={{duration: 0.2}}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label="Close"
                        >
                            <FiX className="w-5 h-5"/>
                        </button>

                        {/* Modal Header */}
                        <div className="bg-green-800 px-6 py-4">
                            <h2 className="text-xl font-semibold text-white text-center">
                                Add New Library Item
                            </h2>
                        </div>

                        {/* Modal Form */}
                        <form
                            onSubmit={onSubmit}
                            className="px-6 py-6 space-y-6 overflow-y-auto max-h-[75vh]"
                        >
                            {/* Grouped Inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Time (Minutes)
                                    </label>
                                    <input
                                        type="number"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Feed Rate
                                    </label>
                                    <input
                                        type="number"
                                        name="feedRate"
                                        value={formData.feedRate}
                                        onChange={handleChange}
                                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Step Size
                                    </label>
                                    <input
                                        type="number"
                                        name="stepSize"
                                        value={formData.stepSize}
                                        onChange={handleChange}
                                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                        required
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Size (height × width)
                                    </label>
                                    <input
                                        type="text"
                                        name="size"
                                        value={formData.size}
                                        onChange={handleChange}
                                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    rows={3}
                                    required
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="mt-1 w-full text-sm"
                                    required
                                />
                                {formData.image && (
                                    <div className="mt-3">
                                        <p className="text-sm text-gray-500 mb-1">Preview:</p>
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="w-40 h-40 object-cover border border-gray-300 rounded-md"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* G-code */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    G-code
                                </label>
                                <input
                                    type="text"
                                    name="gcode"
                                    value={formData.gcode}
                                    onChange={handleChange}
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
