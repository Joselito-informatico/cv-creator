"use client";
import { useResumeStore } from "../../store/useResumeStore";

export const VisualEditor = () => {
  const { currentResume, updateBasics, updateExperience, addExperience } = useResumeStore();

  if (!currentResume) {
    return (
      <div className="p-10 text-gray-500 animate-pulse">
        Sincronizando con base de datos local...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-60px)] bg-gray-900 text-white custom-scrollbar">
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-blue-400 border-b border-gray-800 pb-2">
          Información Básica
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-gray-500 font-bold">Nombre Completo</label>
            <input 
              type="text" 
              value={currentResume.basics.name} 
              onChange={(e) => updateBasics({ name: e.target.value })} 
              className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-gray-500 font-bold">Email</label>
            <input 
              type="email" 
              value={currentResume.basics.email} 
              onChange={(e) => updateBasics({ email: e.target.value })} 
              className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-gray-800 pb-2">
          <h2 className="text-xl font-bold text-green-400">Experiencia</h2>
          <button 
            onClick={addExperience} 
            className="text-xs bg-green-600 hover:bg-green-500 px-3 py-1 rounded-full text-white font-bold transition-transform active:scale-95"
          >
            + Añadir
          </button>
        </div>
        
        {/* Usamos Optional Chaining para seguridad máxima */}
        <div className="space-y-4">
          {currentResume.experience?.map((exp, idx) => (
            <div key={idx} className="p-4 bg-gray-800 rounded-lg space-y-3 border border-gray-700 shadow-xl">
              <input 
                className="bg-transparent w-full font-bold text-white outline-none border-b border-gray-700 focus:border-green-500 pb-1" 
                placeholder="Empresa"
                value={exp.company} 
                onChange={(e) => updateExperience(idx, { company: e.target.value })} 
              />
              <input 
                className="bg-transparent w-full text-sm text-gray-400 outline-none" 
                placeholder="Cargo / Posición"
                value={exp.position} 
                onChange={(e) => updateExperience(idx, { position: e.target.value })} 
              />
              <input 
                className="bg-transparent w-full text-xs text-gray-500 outline-none italic" 
                placeholder="Periodo (Ej: 2020 - 2024)"
                value={exp.period} 
                onChange={(e) => updateExperience(idx, { period: e.target.value })} 
              />
            </div>
          ))}
          
          {currentResume.experience?.length === 0 && (
            <p className="text-center text-gray-600 py-4 text-sm">No hay experiencia profesional registrada.</p>
          )}
        </div>
      </section>
    </div>
  );
};