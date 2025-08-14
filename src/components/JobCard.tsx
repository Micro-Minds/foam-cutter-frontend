import React from "react";

interface JobCardProps {
    title: string;
    imageUrl: string; // new: image at top
    description?: string;
    gcode: string;
    feedRate: number;
    estimatedTime: number; // in minutes
    size: string; // example: "200x150 mm"
    onSend: () => void; // callback for print
}

const JobCard: React.FC<JobCardProps> = ({
                                             title,
                                             imageUrl,
                                             description,
                                             gcode,
                                             feedRate,
                                             estimatedTime,
                                             size,
                                             onSend
                                         }) => {
    const handleCopyGCode = () => {
        navigator.clipboard.writeText(gcode);
        alert("G-code copied to clipboard!");
    };

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col">
            {/* Image */}
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-40 object-cover rounded-t-xl"
            />

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-green-800">{title}</h3>
                {description && (
                    <p className="text-gray-600 text-sm mb-2">{description}</p>
                )}
                <p className="text-gray-700 text-sm"><b>Feed Rate:</b> {feedRate} mm/min</p>
                <p className="text-gray-700 text-sm"><b>Estimated Time:</b> {estimatedTime} min</p>
                <p className="text-gray-700 text-sm"><b>Size:</b> {size}</p>

                {/* Buttons */}
                <div className="mt-auto flex gap-2 pt-4">
                    <button
                        onClick={handleCopyGCode}
                        className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded-lg"
                    >
                        Copy G-code
                    </button>
                    <button
                        onClick={onSend}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-lg"
                    >
                        Send to Print
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
