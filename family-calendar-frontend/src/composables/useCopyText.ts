

import { ref } from 'vue';

export const useCopyText = () => {
  const copyTextState = ref<boolean|null>(null);

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      copyTextState.value = true;
    } catch (err) {
      copyTextState.value = false;
    }

    document.body.removeChild(textArea);
  };

  const copyTextToClipboard = (text: string) => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }

    navigator.clipboard.writeText(text).then(
      () => {
        copyTextState.value = true;
      },
      err => {
        copyTextState.value = false;
      }
    );
  };

  return { 
    copyTextState,
    copyTextToClipboard 
  };
}