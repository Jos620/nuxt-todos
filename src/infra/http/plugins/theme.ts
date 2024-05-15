import { THEME_KEY, themeSchema } from '~/ui/lib/theme';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    const themeCookie = getCookie(event, THEME_KEY);
    const parsedThemeCookie = themeSchema.safeParse(themeCookie);

    if (parsedThemeCookie.success) {
      html.htmlAttrs.push(`class="${parsedThemeCookie.data}"`);
    }
  });
});
