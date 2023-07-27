import { useEffect } from 'react';

export default function usePopupClose(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    const handleOverlay = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target instanceof HTMLElement &&
        target.classList.contains('popup_visible')
      ) {
        onClose();
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOverlay);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOverlay);
    };
  }, [isOpen, onClose]);
}
