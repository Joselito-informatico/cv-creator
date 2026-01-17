import DOMPurify from "dompurify";

export class SanitizerService {
  // En 2026, la sanitización debe ser agresiva
  static clean(html: string): string {
    if (typeof window === "undefined") return html; // SSR safety
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['h1', 'h2', 'h3', 'p', 'br', 'ul', 'li', 'b', 'i', 'em', 'strong', 'div', 'span'],
      ALLOWED_ATTR: ['class', 'id', 'style']
    });
  }
}