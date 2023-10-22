

import { ref, watch } from 'vue';

export const useCopyText = () => {
  const copyTextState = ref<boolean|null>(null);
  const resetCopyTextState = ref<number|null>(null);

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
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

  watch(
    copyTextState,
    (newSate) => {
      if(newSate === null) return;
      if(resetCopyTextState.value) clearTimeout(resetCopyTextState.value);
      
      resetCopyTextState.value = setTimeout(
        () => copyTextState.value = null,
        3000
      )
  })

  return { 
    copyTextState,
    copyTextToClipboard 
  };
}