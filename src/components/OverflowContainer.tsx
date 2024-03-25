import { Key, ReactNode, useLayoutEffect, useRef, useState } from 'react';

export default function OverflowContainer<T>({
  items,
  getKey,
  renderItem,
  renderOverflow,
  className,
}: {
  items: T[];
  getKey: (item: T) => Key;
  renderItem: (item: T) => ReactNode;
  renderOverflow: (amount: number) => ReactNode;
  className: string;
}) {
  const [overflowAmount, setOverflowAmount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (!container) return;

      const children = container.querySelectorAll<HTMLElement>('[data-item]');
      const overflow =
        container.parentElement?.querySelector<HTMLElement>('[data-overflow]');

      overflow?.style.setProperty('display', 'none');
      children.forEach((child) => child.style.removeProperty('display'));

      let overflowAmount = 0;
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        if (container.scrollHeight <= container.clientHeight) {
          break;
        }
        overflowAmount = children.length - i;
        child.style.display = 'none';
        overflow?.style.removeProperty('display');
      }

      setOverflowAmount(overflowAmount);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      <div className={className} ref={containerRef}>
        {items.map((item) => (
          <div data-item key={getKey(item)}>
            {renderItem(item)}
          </div>
        ))}
      </div>
      <div data-overflow>{renderOverflow(overflowAmount)}</div>
    </>
  );
}
