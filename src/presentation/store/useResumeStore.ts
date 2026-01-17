import { create } from "zustand";
import { ResumeProps, resumeSchema } from "@/domain/schemas/resume.schema";
import { DexieResumeRepository } from "@/infrastructure/persistence/DexieResumeRepository";
import { SaveResume } from "@/application/use-cases/SaveResume";
import { ListResumes } from "@/application/use-cases/ListResumes";

const repository = new DexieResumeRepository();
const saveUseCase = new SaveResume(repository);
const listUseCase = new ListResumes(repository);

type ExperienceItem = ResumeProps['experience'][number];

interface ResumeState {
  currentResume: ResumeProps | null;
  allResumes: ResumeProps[];
  isLoading: boolean;
  editMode: 'gui' | 'code';
  
  setEditMode: (mode: 'gui' | 'code') => void;
  loadAll: () => Promise<void>;
  setCurrentResume: (resume: ResumeProps) => void;
  updateBasics: (data: Partial<ResumeProps['basics']>) => Promise<void>;
  updateExperience: (index: number, data: Partial<ExperienceItem>) => Promise<void>;
  addExperience: () => Promise<void>;
  updateCustomHtml: (html: string) => Promise<void>;
  saveCurrent: (data: unknown) => Promise<void>;
}

export const useResumeStore = create<ResumeState>((set, get) => ({
  currentResume: null,
  allResumes: [],
  isLoading: false,
  editMode: 'gui',

  setEditMode: (mode) => set({ editMode: mode }),

  loadAll: async () => {
    set({ isLoading: true });
    try {
      const resumes = await listUseCase.execute();
      set({ allResumes: resumes, isLoading: false });
      if (resumes.length > 0 && !get().currentResume) {
        set({ currentResume: resumes[0] });
      }
    } catch (error) {
      set({ isLoading: false });
      console.error("Error al cargar datos:", error);
    }
  },

  setCurrentResume: (resume) => set({ currentResume: resume }),

  updateBasics: async (newData) => {
    const { currentResume } = get();
    if (!currentResume) return;

    const updatedData = {
      ...currentResume,
      basics: { ...currentResume.basics, ...newData },
      updatedAt: new Date()
    };
    await get().saveCurrent(updatedData);
  },

  updateExperience: async (index, data) => {
    const { currentResume } = get();
    if (!currentResume) return;
    const exp = [...currentResume.experience];
    if (exp[index]) {
        exp[index] = { ...exp[index], ...data };
        const updated = { ...currentResume, experience: exp, updatedAt: new Date() };
        await get().saveCurrent(updated);
    }
  },

  addExperience: async () => {
    const { currentResume } = get();
    if (!currentResume) return;
    const newRole: ExperienceItem = {
        company: "Nueva Empresa", position: "Cargo", period: "2024 - Presente", description: "" 
    };
    const exp = [...currentResume.experience, newRole];
    await get().saveCurrent({ ...currentResume, experience: exp, updatedAt: new Date() });
  },

  updateCustomHtml: async (html) => {
    const { currentResume } = get();
    if (!currentResume) return;
    await get().saveCurrent({ ...currentResume, customHtml: html, updatedAt: new Date() });
  },

  saveCurrent: async (data) => {
    try {
      const result = resumeSchema.safeParse(data);
      if (result.success) {
        await saveUseCase.execute(result.data);
        const resumes = await listUseCase.execute();
        const saved = resumes.find(r => r.id === result.data.id) || result.data;
        set({ currentResume: saved, allResumes: resumes, isLoading: false });
      }
    } catch (e) {
      console.error("Error de persistencia:", e);
    }
  }
}));