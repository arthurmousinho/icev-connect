const sanitizeHtml = require('sanitize-html');
import { marked } from 'marked';

export function sanitizeMarkown(markdown: string): string {
    const html = marked.parse(markdown);

    const cleanHtml = sanitizeHtml(html, {
        allowedTags: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'br', 'ul', 'ol', 'li',
            'strong', 'em', 'code', 'pre',
            'blockquote', 'a', 'img',
        ],
        allowedAttributes: {
            a: ['href', 'name', 'target', 'rel', 'title'],
            img: ['src', 'alt', 'title'],
        },
        allowedSchemes: ['http', 'https', 'mailto'], 
    });

    return cleanHtml;
}
