import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ---------------------------------------------------------------------------
   CONTENT ENGINE
   Add a new article/case-study/resource = drop a Markdown file in the right
   folder. Schemas below give you typed front-matter + build-time validation.
   --------------------------------------------------------------------------- */

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      category: z.enum(['Tutorial', 'Deep Dive', 'Guide', 'Notes', 'Opinion']).default('Deep Dive'),
      readingTime: z.string().optional(),
      cover: image().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: () =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      role: z.string(),
      timeline: z.string().optional(),
      stack: z.array(z.string()).default([]),
      domains: z.array(z.string()).default([]),
      // Headline business/engineering outcomes shown as stat tiles.
      impact: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      links: z
        .object({
          repo: z.string().url().optional(),
          live: z.string().url().optional(),
          writeup: z.string().url().optional(),
        })
        .default({}),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      order: z.number().default(99),
    }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/resources' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.enum([
        'Kubernetes', 'Cloud', 'DevOps', 'AI Infrastructure', 'MLOps',
        'Automation', 'Career', 'Certification',
      ]),
      type: z.enum(['Roadmap', 'Cheatsheet', 'Guide', 'Template', 'Tool', 'Download', 'Link']),
      url: z.string().optional(),       // external link or downloadable asset path
      level: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Intermediate'),
      date: z.coerce.date(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, projects, resources };
