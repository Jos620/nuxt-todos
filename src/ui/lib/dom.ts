export class DOM {
  static isFocusingInput() {
    const { activeElement } = document;
    if (!activeElement) {
      return false;
    }

    if (activeElement.hasAttribute('contenteditable')) {
      return true;
    }

    return ['input', 'textarea', 'select'].includes(
      activeElement.tagName.toLowerCase() || '',
    );
  }

  static autoResizeTextarea(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
