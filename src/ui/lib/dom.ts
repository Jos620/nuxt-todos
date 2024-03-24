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
}
