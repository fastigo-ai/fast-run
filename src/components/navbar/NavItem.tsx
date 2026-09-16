import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface NavItemProps {
  name: string;
  path?: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  className?: string;
  target?: string;
  rel?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const NavItem = ({
  name,
  path,
  hasDropdown,
  isActive,
  className,
  target,
  rel,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: NavItemProps) => {
  const baseClass = `relative flex items-center gap-1.5 py-2 text-[15px] font-body font-medium transition-colors duration-250 ${
    isActive ? 'text-[#0070AD] font-semibold' : 'text-[#0070ad] hover:text-[#0070AD]'
  } ${className || ''}`;

  const content = (
    <>
      {name}
      {hasDropdown && (
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-250 ${isActive ? 'rotate-180 text-[#0070AD]' : 'text-[#0070ad]'}`}
        />
      )}
    </>
  );

  if (path && !hasDropdown) {
    const isExternalOrAdmin = target === '_blank' || path === '/admin' || path.startsWith('/admin');
    const effectiveTarget = target || (isExternalOrAdmin ? '_blank' : undefined);
    const effectiveRel = rel || (effectiveTarget === '_blank' ? 'noopener noreferrer' : undefined);

    return (
      <Link
        to={path}
        target={effectiveTarget}
        rel={effectiveRel}
        className={baseClass}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={baseClass}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      aria-haspopup={hasDropdown}
      aria-expanded={isActive}
    >
      {content}
    </button>
  );
};

export default NavItem;
