"use client";
import { useEffect, useDeferredValue } from "react";
import { EditorTabs } from "@/presentation/components/editor/EditorTabs";
import { VisualEditor } from "@/presentation/components/editor/VisualEditor";
import { CodeEditor } from "@/presentation/components/editor/CodeEditor";
import { LivePreview } from "@/presentation/components/preview/LivePreview";
import { useResumeStore } from "@/presentation/store/useResumeStore";
import { Resume } from "@/domain/entities/Resume";

export default function EditorPage() {
  const { editMode, loadAll, saveCurrent, currentResume } = useResumeStore();
  const deferredResume = useDeferredValue(currentResume);

  useEffect(() => {
    loadAll().then(() => {
      const state = useResumeStore.getState();
      if (!state.currentResume && state.allResumes.length === 0) {
        saveCurrent(
          Resume.create({
            basics: { name: "Tu Nombre", email: "ejemplo@cv.com" },
          }).toPersistence(),
        );
      }
    });
  }, []);

  return (
    <main className="flex h-screen w-full bg-[#111] overflow-hidden font-sans">
      <div className="w-1/2 flex flex-col border-r border-gray-800 z-10 bg-[#0a0a0a]">
        <EditorTabs />
        <div className="flex-1 overflow-hidden relative">
          {editMode === "gui" ? <VisualEditor /> : <CodeEditor />}
        </div>
      </div>

      <div className="w-1/2 bg-gray-500/10 flex flex-col items-center overflow-y-auto p-8">
        {deferredResume ? (
          <div className="scale-[0.85] origin-top transform transition-all duration-300 ease-out">
            <LivePreview resume={deferredResume} />
          </div>
        ) : (
          <div className="text-gray-500 mt-20">Cargando lienzo...</div>
        )}
      </div>
    </main>
  );
}
