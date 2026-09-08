import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Globe, ChevronDown, Mail } from "lucide-react";
import fastigoLogo from "@/assets/fastigo-logo.webp";
import NavItem from "./navbar/NavItem";
import MegaMenu from "./navbar/MegaMenu";
import ProductsMegaMenu from "./navbar/ProductsMegaMenu";
import MobileMenu from "./navbar/MobileMenu";

const mainNavItems = [
  { name: "What we do", hasDropdown: true },
  { name: "Products", path: "/products", hasDropdown: true },
  { name: "Who we are", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Investors", path: "/leadership" },
  
];

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const closeMegaMenu = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || activeDropdown !== null || isMobileMenuOpen
          ? "bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 shadow-[0_4px_24px_rgba(0,112,173,0.08)]"
          : "bg-white/85 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-[68px] sm:h-[76px] items-center justify-between">
          {/* Original Fastigo Logo */}
          <Link
            to="/"
            onClick={() => {
              setIsMobileMenuOpen(false);
              closeMegaMenu();
            }}
            className="flex items-center gap-2 shrink-0 group"
            aria-label="Fastigo Home"
          >
            <img
              src={fastigoLogo}
              alt="Fastigo Technology"
              className="h-10 sm:h-14 w-auto object-contain transition-all duration-300 origin-left"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto mr-28 rounded-full border border-slate-200/70 bg-white/70 px-5 py-2 backdrop-blur-md shadow-sm">
            {mainNavItems.map((item) => (
              <NavItem
                key={item.name}
                name={item.name}
                path={item.path}
                hasDropdown={item.hasDropdown}
                className="text-[15px] font-medium tracking-normal"
                isActive={activeDropdown === item.name}
                onMouseEnter={
                  item.hasDropdown ? () => setActiveDropdown(item.name) : undefined
                }
                onClick={item.hasDropdown ? undefined : closeMegaMenu}
              />
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="mailto:Info@fastigo.co"
              className="text-[#0B192C] hover:text-[#0070AD] transition-colors p-1 inline-flex"
            >
              <Mail className="h-[22px] w-[22px] stroke-[1.5]" />
            </a>

            <div className="flex items-center gap-1 cursor-pointer text-[#0B192C] hover:text-[#0070AD] transition-colors border border-slate-200/80 rounded-full px-3 py-1.5 bg-white/80 backdrop-blur-md shadow-sm">
              <span className="text-[13px] font-body font-medium">EN</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </div>

            {/* Contact */}
            <Link
              to="/contact"
              className="bg-[#0070AD] text-white px-5 py-2 rounded-full text-[14px] font-body font-semibold hover:bg-[#005a8c] hover:shadow-[0_8px_20px_rgba(0,112,173,0.3)] transition-all ml-1"
            >
              Contact
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2.5 rounded-xl text-slate-700 hover:text-[#0070AD] hover:bg-slate-100/80 active:scale-95 transition-all"
            onClick={() => {
              setIsMobileMenuOpen((prev) => !prev);
              setActiveDropdown(null);
            }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-[#0070AD] transition-transform duration-200" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-background overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4">
              <input
                type="text"
                placeholder="Search Fastigo..."
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-lg outline-none font-body"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mega Menus */}
      <AnimatePresence>
        {activeDropdown === 'What we do' && <MegaMenu onClose={closeMegaMenu} />}
        {activeDropdown === 'Products' && <ProductsMegaMenu onClose={closeMegaMenu} />}
      </AnimatePresence>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
