export function isFocusingInput() {
  if (document.activeElement?.hasAttribute('contenteditable')) {
    return true;
  }

  return ['input', 'textarea', 'select'].includes(
    document.activeElement?.tagName.toLowerCase() || '',
  );
}
