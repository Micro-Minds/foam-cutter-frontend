import { VideoCard } from "../components/VideoCard.tsx"; 

export function OurWorkPage() {
  const videos = [
    { 
      title: "3D Tower", 
      src:"https://www.youtube.com/embed/1fuCSezrm5I?autoplay=1&mute=1"
    },
    { 
      title: "Running Horse", 
      src: "https://www.youtube.com/embed/i3_p_yX5l7o?autoplay=1&mute=1"
    },
    { 
      title: "Grill Design", 
      src: "https://www.youtube.com/embed/Lq4AcK9nT6k?autoplay=1&mute=1"
    },
    { 
      title: "Ballet Girl", 
      src: "https://www.youtube.com/embed/vh9zKYgFbrQ?autoplay=1&mute=1"
    },
    { 
      title: "Large Tower", 
      src: "https://www.youtube.com/embed/_TpnqH4TMIA?autoplay=1&mute=1"

    }

  ];
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#f0ede7] py-10">
      <h1 className="text-2xl font-bold mb-6">Our Work Page</h1>
      <p className="text-gray-700 mb-10 text-center">
        Watch our CNC foam cutting process in action
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {videos.map((video, index) => (
          <VideoCard key={index} title={video.title} videoSrc={video.src} />
        ))}
      </div>
    </div>
  );
}
