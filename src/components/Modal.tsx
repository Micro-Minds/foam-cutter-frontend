import { motion, AnimatePresence } from "framer-motion";

export function Modal({ isOpen, onClose, onSubmit, formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
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
                        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold mb-4">Create Entry</h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                onSubmit();
                            }}
                            className="space-y-4"
                        >
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="mt-1 w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 w-full border rounded-lg px-3 py-2"
                                    rows={3}
                                    required
                                />
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium">Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="mt-1 w-full"
                                />
                            </div>

                            {/* Feed Rate */}
                            <div>
                                <label className="block text-sm font-medium">Feed Rate</label>
                                <input
                                    type="number"
                                    name="feedRate"
                                    value={formData.feedRate}
                                    onChange={handleChange}
                                    className="mt-1 w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">G code</label>
                                <input
                                    type="text"
                                    name="gcode"
                                    value={formData.gcode}
                                    onChange={handleChange}
                                    className="mt-1 w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>

                            {/* Time */}
                            <div>
                                <label className="block text-sm font-medium">Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="mt-1 w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
