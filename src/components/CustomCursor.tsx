import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], .interactive');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousemove', handleElementHover);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full bg-primary transition-all duration-200 ease-out ${
            isHovering ? 'h-4 w-4 opacity-100' : 'h-2 w-2 opacity-80'
          }`}
        />
      </div>

      {/* Trailing glow ring */}
      <div
        className="pointer-events-none fixed z-[9998]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.15s ease-out',
        }}
      >
        <div
          className={`rounded-full border border-primary/50 transition-all duration-300 ease-out ${
            isHovering
              ? 'h-12 w-12 border-primary opacity-100'
              : 'h-8 w-8 opacity-60'
          }`}
          style={{
            boxShadow: isHovering
              ? '0 0 20px rgba(0, 82, 255, 0.4)'
              : '0 0 10px rgba(0, 82, 255, 0.2)',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
