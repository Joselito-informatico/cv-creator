"use client";
import { useResumeStore } from "@/presentation/store/useResumeStore";

export const BasicsForm = () => {
  const { currentResume, updateBasics } = useResumeStore();
  const basics = currentResume?.basics;

  if (!basics) return null;

  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-bold text-blue-400 border-b border-gray-800 pb-2">
        Información Básica
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">
            Nombre Completo
          </label>
          <input
            type="text"
            value={basics.name}
            onChange={(e) => updateBasics({ name: e.target.value })}
            className="w-full bg-gray-800/50 border border-gray-700 rounded p-2 focus:border-blue-500 outline-none text-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">
            Email Profesional
          </label>
          <input
            type="email"
            value={basics.email}
            onChange={(e) => updateBasics({ email: e.target.value })}
            className="w-full bg-gray-800/50 border border-gray-700 rounded p-2 focus:border-blue-500 outline-none text-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">
            Título / Label
          </label>
          <input
            type="text"
            value={basics.label || ""}
            onChange={(e) => updateBasics({ label: e.target.value })}
            className="w-full bg-gray-800/50 border border-gray-700 rounded p-2 focus:border-blue-500 outline-none text-sm"
            placeholder="Ej: Senior Software Architect"
          />
        </div>
      </div>
    </section>
  );
};
