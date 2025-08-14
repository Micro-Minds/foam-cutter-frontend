import { VideoCard } from "../components/VideoCard.tsx"; 

export function OurWorkPage() {
  const videos = [
    { 
      title: "3D Tower", 
      src:"https://drive.google.com/file/d/1k6evCB6H6tYyzPdpykH0gLMgjUYPQkqI/preview?autoplay=1&mute=1"
    },
    { 
      title: "Running Horse", 
      src: "https://drive.google.com/file/d/1MhBQ2lTmgk_5EzrcfWvN-y2Ip9xDG8q0/preview?autoplay=1&mute=1" 
    },
    { 
      title: "Grill Design", 
      src: "https:drive.google.com/file/d/14MCPqXfggTstIff6f4s_NLH4QEiKoP85/preview?autoplay=1&mute=1"
    },
    { 
      title: "Ballet Girl", 
      src: "https://drive.google.com/file/d/1LFcLKo2QfOspBgsvcjTbn2SCtbiLSYqb/preview?autoplay=1&mute=1"
    },
    { 
      title: "Large Tower", 
      src: "https://drive.google.com/file/d/1Y4z2AzGbNhhutzvKzgg947NtDm9u2jFX/preview?autoplay=1&mute=1"

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
