import { useState, useEffect } from "react";

function useInView(element: any, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setIsIntersecting(entries[0].isIntersecting);
    }, options);

    if (element.current) {
      observer.observe(element.current);
    }

    return () => {
      if (element.current) {
        observer.unobserve(element.current);
      }
    };
  }, [element, options]);

  return isIntersecting;
}

export default useInView;
