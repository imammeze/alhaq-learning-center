"use client";

import { useEffect, useState } from "react";
import { BookOpenIcon, PlayCircleIcon, FileTextIcon, AwardIcon } from "lucide-react";
import { getStudentModules } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ModulesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<any[]>([]);
  const [message, setMessage] = useState("");

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Modul Pembelajaran</h1>
        <p className="text-gray-500 text-sm mt-1">Akses materi pelajaran dan tugas Anda.</p>
      </div>

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
          {/* Module cards will go here when data exists */}
        </div>
      )}
    </div>
  );
}
