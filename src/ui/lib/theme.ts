import { z } from 'zod';

const possibleThemes = ['light', 'dark'] as const;
export const themeSchema = z.enum(possibleThemes);

export type Theme = (typeof possibleThemes)[number];

export const THEME_KEY = 'nuxt-theme';
