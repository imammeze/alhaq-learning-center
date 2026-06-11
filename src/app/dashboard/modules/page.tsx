"use client";

import { useEffect, useState } from "react";
import { BookOpenIcon, PlayCircleIcon, FileTextIcon, AwardIcon, XIcon, Loader2Icon } from "lucide-react";
import { getStudentModules, downloadStudentModule } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { VideoModal } from "@/components/VideoModal";

export default function ModulesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    const user = getUser();
    if (user?.role !== "siswa_mandiri") {
      router.push("/dashboard");
      return;
    }

    async function loadData() {
      try {
        const res = await getStudentModules();
        setModules(res.data || []);
        setMessage(res.message || "");
      } catch {
        // handle
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  const handleDownload = async (moduleId: string, filename: string) => {
    setDownloadingId(moduleId);
    try {
      const blob = await downloadStudentModule(moduleId);
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed", error);
      alert("Gagal mengunduh file.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Modul Pembelajaran</h1>
        <p className="text-gray-500 text-sm mt-1">Akses materi pelajaran dan tugas Anda.</p>
      </div>

      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <BookOpenIcon className="w-5 h-5 text-rose-900" />
                Preview Materi
              </h3>
              <button 
                onClick={() => setSelectedDoc(null)} 
                className="p-2 hover:bg-rose-50 hover:text-rose-900 rounded-full text-gray-500 transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-grow p-0 bg-gray-100">
              <iframe 
                src={selectedDoc} 
                className="w-full h-full border-0" 
                title="Document Preview"
              />
            </div>
          </div>
        </div>
      )}

      <VideoModal selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} />

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-900 rounded-full animate-spin" />
        </div>
      ) : modules.length === 0 ? (
        <div className="text-center py-20 px-4 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Modul</h3>
          <p className="text-gray-500 max-w-md mx-auto">{message || "Saat ini belum ada modul pembelajaran yang tersedia untuk Anda."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {modules.map((mod: any) => (
            <div key={mod.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:border-rose-300 hover:shadow-md transition-all">
              <div className="p-5 flex-grow border-b border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg uppercase tracking-wide">
                    {mod.program?.name}
                  </span>
                  {mod.programClass && (
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg uppercase tracking-wide">
                      {mod.programClass.name}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{mod.title}</h3>
                <p className="text-sm text-rose-900 font-semibold mb-3">Pertemuan {mod.meeting_number}</p>
                
                {mod.description && (
                  <p className="text-sm text-gray-500 line-clamp-3">{mod.description}</p>
                )}
              </div>
              <div className="p-4 bg-gray-50 flex flex-wrap gap-2">
                {mod.file_url && (
                  <>
                    <button 
                      onClick={() => setSelectedDoc(mod.file_url)}
                      className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-rose-900 text-white text-sm font-bold rounded-xl hover:bg-rose-950 transition-colors"
                    >
                      <BookOpenIcon className="w-4 h-4" /> Lihat
                    </button>
                    <button 
                      onClick={() => handleDownload(mod.id, `${mod.title}.pdf`)}
                      disabled={downloadingId === mod.id}
                      className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-white text-rose-900 border border-rose-200 text-sm font-bold rounded-xl hover:bg-rose-50 transition-colors disabled:opacity-70"
                    >
                      {downloadingId === mod.id ? (
                        <Loader2Icon className="w-4 h-4 animate-spin" />
                      ) : (
                        <FileTextIcon className="w-4 h-4" />
                      )}
                      {downloadingId === mod.id ? "Mengunduh..." : "Unduh"}
                    </button>
                  </>
                )}
                {mod.youtube_url && (
                  <button 
                    onClick={() => setSelectedVideo(mod.youtube_url)}
                    className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-white text-red-600 border border-gray-200 text-sm font-bold rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors"
                  >
                    <PlayCircleIcon className="w-4 h-4" /> Tonton Video
                  </button>
                )}
                {!mod.file_url && !mod.youtube_url && (
                  <span className="w-full text-center text-xs text-gray-400 py-1">Tidak ada lampiran materi</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
