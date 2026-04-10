import { useEffect, useState } from "react";

function useCapsLock() {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.getModifierState("CapsLock")) {
        setIsCapsLockOn(true);
      } else {
        setIsCapsLockOn(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return { isCapsLockOn };
}

export default useCapsLock;
