"use client";
import { EditorTabs } from "@/presentation/components/editor/EditorTabs";
import { VisualEditor } from "@/presentation/components/editor/VisualEditor";
import { CodeEditor } from "@/presentation/components/editor/CodeEditor";
import { useResumeStore } from "@/presentation/store/useResumeStore";
import { Resume } from "@/domain/entities/Resume";
import { SanitizerService } from "@/infrastructure/security/SanitizerService";
import { useEffect, useDeferredValue } from "react";

export default function EditorPage() {
  const { editMode, loadAll, saveCurrent, currentResume } = useResumeStore();
  // React 19 concurrent rendering [Ref: React 19 Best Practices]
  const deferredResume = useDeferredValue(currentResume);

  useEffect(() => {
    loadAll().then(() => {
      if (!useResumeStore.getState().currentResume) {
        saveCurrent(Resume.create({ basics: { name: "Tu Nombre", email: "yo@tu.com" }, experience: [] }).toPersistence());
      }
    });
  }, []);

  return (
    <main className="flex h-screen w-full bg-black overflow-hidden font-sans">
      <div className="w-1/2 flex flex-col border-r border-gray-800 shadow-2xl z-10">
        <EditorTabs />
        <div className="flex-1 overflow-hidden">
          {editMode === 'gui' ? <VisualEditor /> : <CodeEditor />}
        </div>
      </div>

      <div className="w-1/2 bg-gray-100 flex flex-col items-center overflow-y-auto">
        <div className="bg-white w-[210mm] min-h-[297mm] my-10 shadow-2xl p-16 font-serif">
          {/* Renderizado de Datos GUI */}
          <h1 className="text-5xl font-black uppercase text-gray-900 leading-none">{deferredResume?.basics.name}</h1>
          <p className="text-blue-600 font-bold mt-2">{deferredResume?.basics.label}</p>
          
          <div className="mt-10 space-y-6">
            <h2 className="border-b-4 border-black text-2xl font-black inline-block pr-4">Experiencia</h2>
            {deferredResume?.experience.map((exp, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg">{exp.company}</h3>
                  <p className="italic text-gray-600">{exp.position}</p>
                </div>
                <span className="text-sm font-bold bg-gray-200 px-2 py-1 rounded h-fit">{exp.period}</span>
              </div>
            ))}
          </div>

          {/* Renderizado de Modo Código Sanitizado */}
          {deferredResume?.customHtml && (
            <div 
              className="mt-10 border-t-2 border-dashed pt-6"
              dangerouslySetInnerHTML={{ __html: SanitizerService.clean(deferredResume.customHtml) }} 
            />
          )}
        </div>
      </div>
    </main>
  );
}