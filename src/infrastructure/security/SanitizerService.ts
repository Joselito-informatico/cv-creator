import DOMPurify from "dompurify";

export class SanitizerService {
  static clean(html: string): string {
    if (typeof window === "undefined") return html;
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['h1', 'h2', 'h3', 'p', 'br', 'ul', 'li', 'b', 'i', 'em', 'strong', 'div', 'span', 'hr'],
      ALLOWED_ATTR: ['class', 'id', 'style']
    });
  }
}