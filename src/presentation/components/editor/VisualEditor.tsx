"use client";
import { useResumeStore } from "@/presentation/store/useResumeStore";
import { BasicsForm } from "./forms/BasicsForm";
import { ExperienceForm } from "./forms/ExperienceForm";

export const VisualEditor = () => {
  const { currentResume } = useResumeStore();

  if (!currentResume) {
    return (
      <div className="flex h-full items-center justify-center p-10">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          <span className="text-sm text-gray-500 animate-pulse">
            Cargando editor...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[#0a0a0a] text-white custom-scrollbar">
      <div className="p-6 space-y-10 max-w-2xl mx-auto">
        <BasicsForm />
        <ExperienceForm />
      </div>
    </div>
  );
};
