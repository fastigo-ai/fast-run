import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

// Nav items including submenu and the new "Investors" link
const navItems = [
  {
    name: 'What we do',
    submenu: [
      { name: 'Industries', path: '/industries' },
      { name: 'Services', path: '/services' },
      { name: 'Research & Innovation', path: '/research' },
      { name: 'Alliances', path: '/alliances' },
    ],
  },
  { name: 'Who we are', path: '/about' },
  // { name: 'Insights', path: '/blog' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Blog', path: '/blog' },
  { name: 'Investors', path: '/leadership' }, // New item
  { name: 'Contact Us', path: '/contact' },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-background border-t border-border"
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() =>
                          setExpandedItem(expandedItem === item.name ? null : item.name)
                        }
                        className="flex items-center justify-between w-full py-3 px-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        aria-expanded={expandedItem === item.name}
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            expandedItem === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedItem === item.name && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pl-4 space-y-1 overflow-hidden"
                          >
                            {item.submenu.map((sub) => (
                              <li key={sub.name}>
                                <Link
                                  to={sub.path}
                                  onClick={onClose}
                                  className="block py-2 px-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.path!}
                      onClick={onClose}
                      className="block py-3 px-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
