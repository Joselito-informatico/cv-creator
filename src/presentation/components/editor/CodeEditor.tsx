"use client";
import Editor from '@monaco-editor/react';
import { useResumeStore } from '@/presentation/store/useResumeStore';
import { resumeSchema } from '@/domain/schemas/resume.schema';

export const CodeEditor = () => {
  const { currentResume, saveCurrent } = useResumeStore();

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;
    try {
      const parsed = JSON.parse(value);
      const result = resumeSchema.safeParse(parsed);
      if (result.success) {
        saveCurrent(parsed);
      }
    } catch (e) {
        // Ignoramos errores de sintaxis mientras se escribe
    }
  };

  return (
    <div className="h-full border-l border-gray-800">
      <Editor
        height="100%"
        defaultLanguage="json"
        theme="vs-dark"
        value={JSON.stringify(currentResume, null, 2)}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          formatOnPaste: true,
          padding: { top: 20 }
        }}
      />
    </div>
  );
};