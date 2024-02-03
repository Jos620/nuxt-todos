import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { presetAnimations } from 'unocss-preset-animations';
import { presetShadcn } from 'unocss-preset-shadcn';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      autoInstall: true,
    }),
    presetAnimations(),
    presetShadcn(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    center: 'flex items-center justify-center',
    col: 'flex flex-col',

    // Typography
    'text-lead': 'text-xl text-muted-foreground',
    'text-large': 'text-lg font-semibold',
    'text-small': 'text-sm font-medium leading-none',
    'text-muted': 'text-sm text-muted-foreground',
  },
});
