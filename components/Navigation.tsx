"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import WishlistBadge from './WishlistBadge';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps) {
  const locale = useLocale();
  const t = useTranslations('navigation');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const portfolioProjects = [
    {
      slug: "sunset-loft",
      title: "Sunset Loft",
      tag: "AI • Warm Futurism",
      image: "/hero-1.jpg",
    },
    {
      slug: "desert-atelier",
      title: "Desert Atelier",
      tag: "Hybrid • Material Study",
      image: "/hero-2.jpg",
    },
    {
      slug: "concrete-poem",
      title: "Concrete Poem",
      tag: "Real • Minimal Brut",
      image: "/hero-3.jpg",
    },
  ];

  return (
    <>
      {/* Desktop & Tablet Navigation */}
      <header
        className={`sticky top-0 z-sticky transition-all duration-300 ${
          isScrolled
            ? "glass-strong border-b border-white/20 dark:border-white/10 shadow-medium"
            : "bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-neutral-200 dark:border-border-dark"
        } ${className}`}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="text-xl font-serif font-semibold tracking-tight transition-colors hover:text-accent-500 focus-visible"
          >
            Auracasa
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {/* Portfolio with Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsPortfolioOpen(true)}
              onMouseLeave={() => setIsPortfolioOpen(false)}
            >
              <button
                className="flex items-center gap-1 transition-colors hover:text-accent-500 focus-visible py-2"
                aria-expanded={isPortfolioOpen}
                aria-haspopup="true"
              >
                {t('portfolio')}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isPortfolioOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Mega Menu Dropdown */}
              {isPortfolioOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] animate-fade-in-down">
                  <div className="glass-strong rounded-2xl shadow-strong p-6 border border-white/20 dark:border-white/10">
                    <div className="grid grid-cols-3 gap-4">
                      {portfolioProjects.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/${locale}/project/${project.slug}`}
                          className="group"
                        >
                          <div className="card overflow-hidden">
                            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-surface-dark-sunken">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                            <div className="p-3">
                              <div className="text-xs text-text-muted dark:text-text-dark-muted mb-1">
                                {project.tag}
                              </div>
                              <div className="text-sm font-medium group-hover:text-accent-500 transition-colors">
                                {project.title}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-border-dark">
                      <Link
                        href={`/${locale}/portfolio`}
                        className="flex items-center justify-center gap-2 text-accent-500 hover:gap-3 transition-all font-medium text-sm"
                      >
                        {t('portfolio')}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href={`/${locale}/journal`}
              className="transition-colors hover:text-accent-500 focus-visible"
            >
              {t('journal')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="transition-colors hover:text-accent-500 focus-visible"
            >
              {t('about')}
            </Link>
            <Link
              href={`/${locale}/services`}
              className="transition-colors hover:text-accent-500 focus-visible"
            >
              {t('services')}
            </Link>

            {/* Action Icons */}
            <div className="flex items-center gap-3 ml-2 pl-3 border-l border-neutral-200 dark:border-border-dark">
              {/* Language Switcher */}
              <LanguageSwitcher />
              {/* Search Icon */}
              <button
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-surface-dark-elevated transition-colors focus-visible"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Wishlist Badge */}
              <WishlistBadge locale={locale} />

              {/* User Account Icon */}
              <button
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-surface-dark-elevated transition-colors focus-visible"
                aria-label="Account"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            </div>

            {/* CTA Button */}
            <Link href={`/${locale}/contact`} className="btn btn-primary btn-sm ml-2">
              {t('contact')}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-surface-dark-elevated transition-colors focus-visible"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal-backdrop md:hidden animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-surface-dark z-modal md:hidden animate-slide-in-right shadow-strong">
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-border-dark">
                <span className="text-xl font-serif font-semibold">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-surface-dark-elevated transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Drawer Content */}
              <nav className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Main Links */}
                  <div className="space-y-4">
                    <Link
                      href={`/${locale}/portfolio`}
                      className="block text-lg font-medium hover:text-accent-500 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('portfolio')}
                    </Link>
                    <Link
                      href={`/${locale}/journal`}
                      className="block text-lg font-medium hover:text-accent-500 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('journal')}
                    </Link>
                    <Link
                      href={`/${locale}/about`}
                      className="block text-lg font-medium hover:text-accent-500 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('about')}
                    </Link>
                    <Link
                      href={`/${locale}/services`}
                      className="block text-lg font-medium hover:text-accent-500 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('services')}
                    </Link>
                  </div>

                  {/* Divider */}
                  <div className="divider" />

                  {/* Featured Projects */}
                  <div>
                    <h3 className="text-sm font-semibold text-text-muted dark:text-text-dark-muted mb-3">
                      Featured Projects
                    </h3>
                    <div className="space-y-3">
                      {portfolioProjects.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/${locale}/project/${project.slug}`}
                          className="flex items-center gap-3 group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium group-hover:text-accent-500 transition-colors truncate">
                              {project.title}
                            </div>
                            <div className="text-xs text-text-muted dark:text-text-dark-muted">
                              {project.tag}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="divider" />

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full btn btn-outline justify-start">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      Search
                    </button>
                    <button className="w-full btn btn-outline justify-start">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Wishlist
                      <span className="ml-auto badge badge-primary">3</span>
                    </button>
                    <button className="w-full btn btn-outline justify-start">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Account
                    </button>
                  </div>
                </div>
              </nav>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-neutral-200 dark:border-border-dark">
                <Link
                  href={`/${locale}/contact`}
                  className="btn btn-primary w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('contact')}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
