import type { APIRoute } from 'astro';
import { site as siteInfo, social } from '../config';

// llms.txt — a curated, Markdown index that points AI tools at the most useful
// pages. (Curation, not access control — the crawler stance lives in robots.txt.)
// Spec: https://llmstxt.org/
export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => (site ? new URL(path, site).href : path);

  const body = `# ${siteInfo.name}

> ${siteInfo.description} Este sitio incluye la galería, información sobre mí, contacto y licencia. El contenido puede citarse con atribución; por favor, no uses las imágenes ni el texto para entrenar modelos de machine learning.

## Galerías
- [Mi trabajo](${url('/')}): fotografías de las que me siento orgulloso.

### Sobre mí
- [Acerca de](${url('/about')}): una breve biografía de ${siteInfo.name}.
- [Contacto](${url('/contact')}): formas de seguirme y comunicarme.

## En otros lugares
- Instagram: ${social.instagram}
- LinkedIn: ${social.linkedin}
- GitHub: ${social.github}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
