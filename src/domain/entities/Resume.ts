import { resumeSchema, type ResumeProps } from "../schemas/resume.schema";

export class Resume {
  private constructor(private props: ResumeProps) {}

  static create(data: any): Resume {
    // 1. Inyectamos estructura básica para objetos huérfanos o viejos
    const rawData = {
      ...data,
      id: data.id || crypto.randomUUID(),
      basics: {
        name: data.basics?.name || "Nuevo Usuario",
        email: data.basics?.email || "email@ejemplo.com",
        label: data.basics?.label || "",
        summary: data.basics?.summary || "",
      },
      experience: Array.isArray(data.experience) ? data.experience : [],
      customHtml: data.customHtml || "",
      updatedAt: data.updatedAt || new Date(),
    };

    // 2. Validamos y aplicamos defaults del schema
    const validated = resumeSchema.parse(rawData);
    return new Resume(validated);
  }

  public toPersistence(): ResumeProps {
    return JSON.parse(JSON.stringify(this.props));
  }

  get id() { return this.props.id; }
  get basics() { return this.props.basics; }
  get experience() { return this.props.experience; }
  get customHtml() { return this.props.customHtml; }
}