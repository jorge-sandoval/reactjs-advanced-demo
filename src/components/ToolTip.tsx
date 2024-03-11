import { ReactNode, RefObject, useLayoutEffect, useState } from 'react';

export default function Tooltip({
  isOpen,
  setIsOpen,
  triggerRef,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement>;
  children: ReactNode;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const { left, bottom } = triggerRef.current.getBoundingClientRect();
      setPosition({ x: left, y: bottom });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, triggerRef]);

  useLayoutEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, triggerRef, setIsOpen]);

  useLayoutEffect(() => {
    function handleResize() {
      if (isOpen && triggerRef.current) {
        const { left, bottom } = triggerRef.current.getBoundingClientRect();
        setPosition({ x: left, y: bottom });
      }
    }

    if (isOpen) {
      window.addEventListener('resize', handleResize);
    } else {
      window.removeEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, triggerRef]);

  return (
    <>
      {isOpen && (
        <div
          className="position-absolute z-10"
          style={{
            top: position.y + 10,
            left: position.x + (triggerRef.current?.offsetWidth || 0) / 2,
            transform: 'translateX(-50%)',
          }}
        >
          <div className=" bg-dark  text-white position-relative p-2 rounded ">
            <div
              className="position-absolute bg-dark"
              style={{
                width: '10px',
                height: '10px',
                top: '-5px',
                left: 'calc(50% - 5px)',
                transform: 'rotate(45deg)',
              }}
            />
            {children}
          </div>
        </div>
      )}
    </>
  );
}
