"use client";
import { useResumeStore } from "@/presentation/store/useResumeStore";

export const ExperienceForm = () => {
  const { currentResume, updateExperience, addExperience } = useResumeStore();
  const experience = currentResume?.experience || [];

  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-center border-b border-gray-800 pb-2">
        <h2 className="text-xl font-bold text-green-400">Experiencia</h2>
        <button
          onClick={addExperience}
          className="text-xs bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white border border-green-600/50 px-3 py-1 rounded-full font-bold transition-all"
        >
          + Añadir Rol
        </button>
      </div>
      <div className="space-y-4">
        {experience.map((exp, idx) => (
          <div
            key={idx}
            className="group p-4 bg-gray-800/40 hover:bg-gray-800 rounded-lg space-y-3 border border-gray-700/50 hover:border-green-500/50 transition-all"
          >
            <input
              className="w-full bg-transparent font-bold text-white outline-none border-b border-transparent focus:border-green-500 placeholder-gray-600"
              placeholder="Empresa"
              value={exp.company}
              onChange={(e) =>
                updateExperience(idx, { company: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                className="bg-transparent text-xs text-gray-300 outline-none placeholder-gray-600"
                placeholder="Cargo"
                value={exp.position}
                onChange={(e) =>
                  updateExperience(idx, { position: e.target.value })
                }
              />
              <input
                className="bg-transparent text-xs text-gray-500 outline-none text-right italic placeholder-gray-700"
                placeholder="Periodo"
                value={exp.period}
                onChange={(e) =>
                  updateExperience(idx, { period: e.target.value })
                }
              />
            </div>
          </div>
        ))}
        {experience.length === 0 && (
          <div className="text-center p-6 text-gray-600 text-sm">
            No hay experiencia registrada.
          </div>
        )}
      </div>
    </section>
  );
};
