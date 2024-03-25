import { DOM } from '../lib/dom';

export function useKeyboardShortcuts() {
  const router = useRouter();

  onKeyStroke('/', (e) => {
    if (DOM.isFocusingInput()) {
      return;
    }

    e.preventDefault();
    router.push('/todo/create');
  });
}
