import { SITE as RAW } from '../site.config.mjs';

export const SITE = RAW;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/blog' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_GROUPS = [
  {
    title: 'Platform',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Case Studies', href: '/projects' },
      { label: 'Technical Writing', href: '/blog' },
      { label: 'Resource Library', href: '/resources' },
      { label: 'Uses / Toolkit', href: '/uses' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'GitHub', href: SITE.socials.github, external: true },
      { label: 'LinkedIn', href: SITE.socials.linkedin, external: true },
      { label: 'X / Twitter', href: SITE.socials.twitter, external: true },
      { label: 'Email', href: `mailto:${SITE.email}` },
      { label: 'RSS Feed', href: '/rss.xml' },
    ],
  },
];

// JSON-LD Person schema, reused site-wide.
export const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  alternateName: SITE.altName,
  url: SITE.url,
  image: `${SITE.url}${SITE.profileImage}`,
  jobTitle: SITE.role,
  email: `mailto:${SITE.email}`,
  description: SITE.description,
  knowsAbout: [
    'App Development', 'Web Development', 'Agentic AI', 'AI Infrastructure',
    'Kubernetes', 'DevOps', 'Cloud Engineering', 'MLOps', 'Terraform', 'CI/CD',
    'GitOps', 'AWS', 'Azure', 'Platform Engineering', 'Observability',
    'Infrastructure as Code', 'Cloud Security',
  ],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'CNCF Kubestronaut' },
    { '@type': 'EducationalOccupationalCredential', name: 'Certified Kubernetes Security Specialist (CKS)' },
    { '@type': 'EducationalOccupationalCredential', name: 'Certified Kubernetes Administrator (CKA)' },
    { '@type': 'EducationalOccupationalCredential', name: 'Certified Kubernetes Application Developer (CKAD)' },
    { '@type': 'EducationalOccupationalCredential', name: 'Kubernetes and Cloud Native Associate (KCNA)' },
    { '@type': 'EducationalOccupationalCredential', name: 'Kubernetes and Cloud Native Security Associate (KCSA)' },
  ],
  sameAs: [SITE.socials.github, SITE.socials.linkedin, SITE.socials.twitter],
};
