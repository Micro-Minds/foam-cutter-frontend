import { motion, AnimatePresence } from "framer-motion";
import { toBase64 } from "../service/covertImageToBase64.ts";

export function Modal({ isOpen, onClose, onSubmit, formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const base64 = await toBase64(file);
            console.log(base64)
            setFormData({
                ...formData,
                image: base64
            });
        } catch (error) {
            console.error("Error converting file:", error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative flex flex-col"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold p-6 pb-2 text-black text-center mb-10">
                            Add new library item
                        </h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                onSubmit();
                            }}
                            className="px-6 pb-6 space-y-4 overflow-y-auto max-h-[70vh]"
                        >
                            {/* Row: Title, Time, Feed Rate */}
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-green-700">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="mt-1 w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-green-700">Time (Minutes)</label>
                                    <input
                                        type="number"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="mt-1 w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-green-700">Feed Rate</label>
                                    <input
                                        type="number"
                                        name="feedRate"
                                        value={formData.feedRate}
                                        onChange={handleChange}
                                        className="mt-1 w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-green-700">StepSize</label>
                                    <input
                                        type="number"
                                        name="stepSize"
                                        value={formData.stepSize}
                                        onChange={handleChange}
                                        className="mt-1 w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                </div>

                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-green-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    rows={3}
                                    required
                                />
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium text-green-700">Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="mt-1 w-full"
                                />

                                {formData.image && (
                                    <div className="mt-3">
                                        <p className="text-sm text-gray-500">Preview:</p>
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="mt-1 w-40 h-40 object-cover rounded-lg border border-green-300"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* G code */}
                            <div>
                                <label className="block text-sm font-medium text-green-700">G code</label>
                                <input
                                    type="text"
                                    name="gcode"
                                    value={formData.gcode}
                                    onChange={handleChange}
                                    className="mt-1 w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
