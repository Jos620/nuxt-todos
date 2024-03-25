import type { Directive } from 'vue';

import { DOM } from '../lib/dom';

export const vResizeTextarea: Directive<HTMLTextAreaElement> = {
  mounted(el) {
    el.addEventListener('input', () => DOM.autoResizeTextarea(el));
  },
};
