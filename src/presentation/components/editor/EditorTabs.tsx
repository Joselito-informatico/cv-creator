"use client";
import { useResumeStore } from "../../store/useResumeStore";

export const EditorTabs = () => {
  const { editMode, setEditMode } = useResumeStore();

  return (
    <div className="flex border-b border-gray-800 bg-gray-900 p-1">
      <button
        onClick={() => setEditMode('gui')}
        className={`flex-1 px-4 py-2 text-sm font-medium transition-all ${
          editMode === 'gui' 
            ? "bg-blue-600 text-white rounded-md shadow-lg" 
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        ✨ Modo Fácil
      </button>
      <button
        onClick={() => setEditMode('code')}
        className={`flex-1 px-4 py-2 text-sm font-medium transition-all ${
          editMode === 'code' 
            ? "bg-gray-700 text-white rounded-md shadow-lg" 
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        {"{ }"} Modo Código
      </button>
    </div>
  );
};