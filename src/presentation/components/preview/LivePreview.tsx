import { ResumeProps } from "@/domain/schemas/resume.schema";
import { SanitizerService } from "@/infrastructure/security/SanitizerService";

interface LivePreviewProps {
  resume: ResumeProps;
}

export const LivePreview = ({ resume }: LivePreviewProps) => {
  return (
    <div
      id="resume-preview"
      className="bg-white w-[210mm] min-h-[297mm] shadow-xl p-16 font-serif text-black mx-auto"
    >
      <div className="border-b-2 border-gray-900 pb-6 mb-8">
        <h1 className="text-5xl font-black uppercase tracking-tight mb-2">
          {resume.basics.name}
        </h1>
        <div className="flex justify-between items-end">
          <p className="text-xl text-blue-600 font-bold uppercase tracking-wider">
            {resume.basics.label}
          </p>
          <div className="text-right text-sm text-gray-600 space-y-1">
            <p>{resume.basics.email}</p>
            <p>{resume.basics.phone}</p>
          </div>
        </div>
      </div>

      {resume.basics.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed text-justify">
            {resume.basics.summary}
          </p>
        </div>
      )}

      {resume.experience.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest border-b border-gray-300 mb-4 text-gray-500">
            Experiencia Profesional
          </h3>
          <div className="space-y-6">
            {resume.experience.map((exp, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-lg text-gray-900">
                    {exp.company}
                  </h4>
                  <span className="text-xs font-mono text-gray-500">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  {exp.position}
                </p>
                <p className="text-sm text-gray-600 leading-snug">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.customHtml && (
        <div className="mt-8 pt-8 border-t border-dashed border-gray-300">
          <div
            className="prose max-w-none prose-sm"
            dangerouslySetInnerHTML={{
              __html: SanitizerService.clean(resume.customHtml),
            }}
          />
        </div>
      )}
    </div>
  );
};
