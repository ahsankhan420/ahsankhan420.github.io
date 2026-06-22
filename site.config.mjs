// ============================================================================
//  SINGLE SOURCE OF TRUTH for site-wide configuration.
//  Imported by astro.config.mjs (build) and src/consts.ts (runtime/components).
//
//  >>> TO GO LIVE ON A CUSTOM DOMAIN <<<
//  1. Set USE_CUSTOM_DOMAIN = true and set CUSTOM_DOMAIN below.
//  2. Create a file `public/CNAME` containing just your domain (e.g. ahsankhan.dev).
//  3. Add the GitHub Pages DNS records at your registrar (see README "Custom domain").
//  Until then the site builds & deploys to the github.io URL with zero changes.
// ============================================================================

const USE_CUSTOM_DOMAIN = false;
const CUSTOM_DOMAIN = 'https://ahsankhan.dev'; // change to your real domain when ready
const GITHUB_PAGES_URL = 'https://ahsankhan420.github.io';

export const SITE = {
  url: USE_CUSTOM_DOMAIN ? CUSTOM_DOMAIN : GITHUB_PAGES_URL,
  // base path: '' for a user/org root site (username.github.io) or custom domain.
  base: '/',

  name: 'Ehsan Ullah',
  altName: 'Ahsan Khan',
  initials: 'EU',
  brand: { primary: 'EHSAN', accent: '.CLOUD' },

  role: 'Cloud, DevOps & AI Engineer',
  roles: [
    'App Developer',
    'Website Developer',
    'DevOps Engineer',
    'Cloud Engineer',
    'Kubernetes Engineer / Kubestronaut',
    'AI Infrastructure Engineer',
    'Agentic AI Engineer',
    'MLOps Engineer',
  ],

  tagline: 'Apps, websites, agentic AI & cloud platforms — engineered end to end.',
  description:
    'Ehsan Ullah (Ahsan Khan) is a Kubestronaut and Cloud, DevOps & AI Engineer — building apps, websites, agentic AI workflows, and self-healing cloud platforms. Available worldwide for freelance, full-time remote, or project-based work.',

  email: 'ahsanullahkhan881@gmail.com',
  phone: '+92 313 8094121',
  location: 'Remote · Pakistan / Global',

  socials: {
    github: 'https://github.com/ahsankhan420',
    linkedin: 'https://www.linkedin.com/in/ehsan-khan-devops',
    twitter: 'https://x.com/AhsanKh42364760',
  },
  githubUser: 'ahsankhan420',
  twitterHandle: '@AhsanKh42364760',

  cv: '/cv/EhsanUllah_CV.pdf',
  ogImage: '/EhsanUllah-opt.webp',
  profileImage: '/EhsanUllah-opt.webp',
  photo: { webp: '/EhsanUllah-opt.webp', fallback: '/EhsanUllah-opt.jpg', alt: 'Portrait of Ehsan Ullah (Ahsan Khan), Cloud & Platform Engineer' },

  // Credly verification links (public badges) pulled from the CV.
  credly: {
    cks: 'https://www.credly.com/badges/3d6dbfa6-ed25-456e-bb6d-13208eef5387/public_url',
    cka: 'https://www.credly.com/badges/28742ca9-67d6-40f8-82c0-7a012ef807cc/public_url',
    ckad: 'https://www.credly.com/badges/42d4ecf4-4e0c-4cfe-bb31-d3d0df5cdc82/public_url',
    kcna: 'https://www.credly.com/badges/3e36a5b6-1a34-4389-99d3-4285fa1b3afa/public_url',
    kcsa: 'https://www.credly.com/badges/2081d46c-4387-482e-895c-861d388e5569/public_url',
    kubestronaut: 'https://www.credly.com/badges/8158d736-615c-4339-b9a5-27cd1170097d/public_url',
  },
  // Official Credly badge artwork (transparent PNG hexagons) — embedded directly.
  credlyImg: {
    cks: 'https://images.credly.com/images/9945dfcb-1cca-4529-85e6-db1be3782210/kubernetes-security-specialist-logo2.png',
    cka: 'https://images.credly.com/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png',
    ckad: 'https://images.credly.com/images/cc8adc83-1dc6-4d57-8e20-22171247e052/blob',
    kcna: 'https://images.credly.com/images/f28f1d88-428a-47f6-95b5-7da1dd6c1000/KCNA_badge.png',
    kcsa: 'https://images.credly.com/images/67dd8a95-8876-4051-9cb9-3d97c204f85a/image.png',
    kubestronaut: 'https://images.credly.com/images/cd6c6449-6814-4613-a2d3-13cf4ac5be4f/image.png',
  },
};
