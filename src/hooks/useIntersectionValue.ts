import { useCallback, useEffect, useState } from "react";

const useIntersectionValue = () => {
  const [node, setNode] = useState<Element | null>(null);
  const [intersecting, setIntersecting] = useState<boolean>(false);

  const observe = useCallback((node: Element) => {
    setNode(node);
    if (node === null) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIntersecting(true);
        observer.unobserve(node);
      }
    });
    observer.observe(node);
  }, [])

  useEffect(() => {
    setIntersecting(false);
  }, [node]);

  return { observe, intersecting };
};

export default useIntersectionValue;