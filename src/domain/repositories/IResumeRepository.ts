import { ResumeProps } from "@/domain/schemas/resume.schema";

export interface IResumeRepository {
  save(resume: ResumeProps): Promise<void>;
  getById(id: string): Promise<ResumeProps | null>;
  getAll(): Promise<ResumeProps[]>;
  delete(id: string): Promise<void>;
}