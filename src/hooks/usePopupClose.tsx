import { useEffect } from "react";

export default function usePopupClose(isOpen:boolean, onClose:any) {
  useEffect(() => {
    if (!isOpen) return;

    const handleOverlay = (event:any) => {
      if (event.target.classList.contains("popup_visible")) {
        onClose();
      }
    };
    const handleEscape = (event:any) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isOpen, onClose]);
}