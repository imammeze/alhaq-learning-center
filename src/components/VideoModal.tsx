import { PlayCircleIcon, XIcon, XCircleIcon } from "lucide-react";

interface VideoModalProps {
  selectedVideo: string | null;
  setSelectedVideo: (video: string | null) => void;
}

export function VideoModal({ selectedVideo, setSelectedVideo }: VideoModalProps) {
  if (!selectedVideo) return null;

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80"
        onClick={() => setSelectedVideo(null)} 
      />
      
      {/* Modal content */}
      <div 
        className="relative bg-white rounded-2xl w-full max-w-4xl flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 rounded-t-2xl">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <PlayCircleIcon className="w-5 h-5 text-red-600" />
            Video Pembelajaran
          </h3>
          <button 
            onClick={() => setSelectedVideo(null)} 
            className="p-2 hover:bg-red-50 hover:text-red-600 rounded-full text-gray-500 transition-colors"
          >
            <XCircleIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="w-full aspect-video bg-black rounded-b-2xl overflow-hidden">
          {getYouTubeId(selectedVideo) ? (
            <iframe 
              src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo)}?autoplay=1&playsinline=1&controls=1&rel=0&modestbranding=1`} 
              className="w-full h-full border-0 rounded-b-2xl"
              style={{ pointerEvents: 'auto' }}
              title="YouTube Video Player"
              allow="accelerometer; autoplay; con clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white rounded-b-2xl">
              Video tidak valid
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
