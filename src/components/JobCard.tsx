import React from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

interface JobCardProps {
    title: string;
    imageUrl: string;
    description: string;
    gcode: string;
    feedRate: number;
    estimatedTime: number;
    size: string;
    onSend: () => void;
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
        // Format G-code with proper line breaks
        // Split by common G-code line separators and rejoin with proper line breaks
        const formattedGCode = gcode
            .replace(/;/g, ';\n')  // Add line break after comments
            .replace(/\n\s*\n/g, '\n')  // Remove multiple empty lines
            .replace(/([GM]\d+)/g, '\n$1')  // Add line break before G and M commands
            .replace(/^\n/, '')  // Remove leading line break
            .trim();

        navigator.clipboard.writeText(formattedGCode)
            .then(() => {
                MySwal.fire({
                    icon: 'success',
                    title: 'G-code copied!',
                    text: 'G-code has been formatted and copied to clipboard.',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#3085d6',
                    background: '#f4f4f9',
                    iconColor: '#2ecc71',
                });
            })
            .catch((error) => {
                console.error('Copy failed:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to copy!',
                    text: 'Something went wrong while copying the G-code to clipboard.',
                    confirmButtonText: 'Close',
                    confirmButtonColor: '#d33',
                    background: '#f4f4f9',
                    iconColor: '#e74c3c',
                });
            });
    };
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out overflow-hidden font-sans">
            {/* Image */}
            <div className="w-full bg-white p-3 flex justify-center items-center border-b border-green-100">
                <img
                    src={imageUrl}
                    alt={title}
                    className="max-h-64 w-auto object-contain"
                />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col h-full">
                <h3 className="text-xl font-semibold text-green-700 mb-1">{title}</h3>

                {description && (
                    <p className="text-gray-600 text-sm mb-3 leading-snug">{description}</p>
                )}

                <div className="space-y-1 text-sm text-gray-700">
                    <p><span className="font-medium text-green-800">Feed Rate:</span> {feedRate} mm/min</p>
                    <p><span className="font-medium text-green-800">Estimated Time:</span> {estimatedTime} min</p>
                    <p><span className="font-medium text-green-800">Size:</span> {size}</p>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 flex gap-3">
                    <button
                        onClick={handleCopyGCode}
                        className="flex-1 px-4 py-2 text-sm font-medium text-green-700 border border-green-300 rounded-lg hover:bg-green-50 transition"
                    >
                        Copy G-code
                    </button>
                    <button
                        onClick={onSend}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
                    >
                        Send to Print
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
