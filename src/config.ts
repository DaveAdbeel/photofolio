// ────────────────────────────────────────────────────────────────────────────
//  Site configuration — edit these values to make the template your own.
//  Almost everything visitor-facing (titles, the brand, SEO, JSON-LD, llms.txt)
//  is derived from this file, so start here.
// ────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export const site = {
  name: 'David Astudillo',
  // Optional second-script name (e.g. a Chinese 中文名) shown under the brand and
  // in a couple of prose pages. Leave it '' to hide it everywhere. See the README
  // for how to self-host a font subset so it renders identically on every device.
  nameZh: '',
  title: 'David Astudillo',
  description:
    'Un portafolio fotográfico minimalista — galerías digitales y analógicas.',
};

// Left-hand navigation. "Digital" is the home page and shows by default.
export const nav: NavItem[] = [
  { label: 'Mi galeria', href: '/' },
  { label: 'Acerca de mi', href: '/about' },
  { label: 'Contacto', href: '/contact' },
  { label: 'Licencia', href: '/license' },
];

// Social and contact links. Set the WhatsApp URL to your number in international
// format, without the leading + sign.
export const social = {
  instagram: 'https://www.instagram.com/daichho',
  linkedin: 'https://www.linkedin.com/in/david-astudillo-599ba9220/',
  github: 'https://github.com/daveadbeel',
  whatsapp: 'https://wa.me/REEMPLAZA_CON_TU_NUMERO',
};
