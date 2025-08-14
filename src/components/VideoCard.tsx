import React from "react";

interface VideoCardProps {
  title: string;
  videoSrc: string; // this will be an iframe link now
}

export const VideoCard: React.FC<VideoCardProps> = ({ title, videoSrc }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-80 mb-6">
      <div className="w-full h-48">
        <iframe
          src={videoSrc}
          className="w-full h-full object-cover"
          title={title}
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};
