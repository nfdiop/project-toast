import React from "react";

export function useEscape(onEscape) {
  React.useEffect(() => {
    function handleKeydown(event) {
      if (event.code === "Escape") {
        onEscape();
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener(handleKeydown);
    };
  }, [onEscape]);
}
