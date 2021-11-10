import { RefObject, useEffect } from 'react';

const useOutSideClick = <T extends HTMLElement>(
  ref: RefObject<T>,
  eventHandler: () => void,
): void => {
  useEffect(() => {
    const outClickListener = (event: MouseEvent) => {
      const el = ref?.current;

      if (!el || el.contains(event.target as Node)) return;
      eventHandler();
    };

    document.addEventListener('mousedown', outClickListener);
    return () => {
      document.removeEventListener('mousedown', outClickListener);
    };
  }, [ref, eventHandler]);
};

export default useOutSideClick;
