import { create } from "zustand";
import { ResumeProps, resumeSchema } from "../../domain/schemas/resume.schema";
import { DexieResumeRepository } from "../../infrastructure/persistence/DexieResumeRepository";
import { SaveResume } from "../../application/use-cases/SaveResume";
import { ListResumes } from "../../application/use-cases/ListResumes";

const repository = new DexieResumeRepository();
const saveUseCase = new SaveResume(repository);
const listUseCase = new ListResumes(repository);

interface ResumeState {
  currentResume: ResumeProps | null;
  allResumes: ResumeProps[];
  isLoading: boolean;
  editMode: 'gui' | 'code';
  setEditMode: (mode: 'gui' | 'code') => void;
  loadAll: () => Promise<void>;
  updateBasics: (data: Partial<ResumeProps['basics']>) => Promise<void>;
  updateExperience: (index: number, data: any) => Promise<void>;
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
    const resumes = await listUseCase.execute();
    set({ allResumes: resumes, isLoading: false });
    if (resumes.length > 0 && !get().currentResume) set({ currentResume: resumes[0] });
  },

  updateBasics: async (newData) => {
    const { currentResume } = get();
    if (!currentResume) return;
    const updated = { ...currentResume, basics: { ...currentResume.basics, ...newData }, updatedAt: new Date() };
    await get().saveCurrent(updated);
  },

  updateExperience: async (index, data) => {
    const { currentResume } = get();
    if (!currentResume) return;
    const exp = [...currentResume.experience];
    exp[index] = { ...exp[index], ...data };
    await get().saveCurrent({ ...currentResume, experience: exp, updatedAt: new Date() });
  },

  addExperience: async () => {
    const { currentResume } = get();
    if (!currentResume) return;
    const exp = [...currentResume.experience, { company: "Nueva Empresa", position: "Cargo", period: "2024 - Actualidad", description: "" }];
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
        set({ currentResume: result.data });
      }
    } catch (e) { console.error("Error saving:", e); }
  }
}));