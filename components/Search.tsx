"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface SearchResult {
  type: "project" | "journal" | "page";
  title: string;
  url: string;
  description?: string;
  image?: string;
  tag?: string;
}

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Search({ isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock search data (replace with actual search implementation)
  const searchData: SearchResult[] = [
    {
      type: "project",
      title: "Sunset Loft",
      url: "/project/sunset-loft",
      description: "Where warmth and technology coexist without compromise",
      image: "/hero-1.jpg",
      tag: "AI • Warm Futurism",
    },
    {
      type: "project",
      title: "Desert Atelier",
      url: "/project/desert-atelier",
      description: "Born from two worlds: AI precision and human intuition",
      image: "/hero-2.jpg",
      tag: "Hybrid • Material Study",
    },
    {
      type: "project",
      title: "Concrete Poem",
      url: "/project/concrete-poem",
      description: "Minimalism as a language of emotion",
      image: "/hero-3.jpg",
      tag: "Real • Minimal Brut",
    },
    {
      type: "journal",
      title: "Auracasa Vision: Clean Futuristic + Warm Human",
      url: "/journal/vision",
      description: "Short essay about blending futuristic lines with warm materials.",
    },
    {
      type: "journal",
      title: "Color Stories: Desert Clay & Sky Blue",
      url: "/journal/color-stories",
      description: "Palette notes and moodboard guidance.",
    },
    {
      type: "page",
      title: "About Auracasa",
      url: "/about",
      description: "We merge imaginative design with tangible craft.",
    },
    {
      type: "page",
      title: "Services",
      url: "/services",
      description: "Essentials and Premium design packages.",
    },
  ];

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Simulate search delay
    const timer = setTimeout(() => {
      const filtered = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.tag?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          // Open search (handled by parent)
        }
      }

      // Escape to close
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "project":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case "journal":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "page":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal-backdrop animate-fade-in"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed inset-x-4 top-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-modal animate-scale-in">
        <div className="card overflow-hidden shadow-strong">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-neutral-200 dark:border-border-dark">
            <svg
              className="w-5 h-5 text-text-muted dark:text-text-dark-muted flex-shrink-0"
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
            <input
              ref={inputRef}
              type="text"
              placeholder="Search projects, journal, pages..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-text-muted dark:placeholder:text-text-dark-muted"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-surface-dark-elevated transition-colors"
                aria-label="Clear search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <kbd className="hidden md:inline-block px-2 py-1 text-xs bg-neutral-100 dark:bg-surface-dark-elevated rounded border border-neutral-200 dark:border-border-dark">
              ESC
            </kbd>
          </div>

          {/* Search Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {isSearching ? (
              <div className="p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-neutral-200 dark:border-neutral-700 border-t-accent-500" />
                <p className="mt-4 text-sm text-text-muted dark:text-text-dark-muted">
                  Searching...
                </p>
              </div>
            ) : query.trim().length === 0 ? (
              <div className="p-8 text-center">
                <svg
                  className="w-12 h-12 mx-auto text-text-muted dark:text-text-dark-muted mb-4"
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
                <p className="text-sm text-text-muted dark:text-text-dark-muted">
                  Start typing to search...
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted dark:text-text-dark-muted">
                  <kbd className="px-2 py-1 bg-neutral-100 dark:bg-surface-dark-elevated rounded border border-neutral-200 dark:border-border-dark">
                    ⌘K
                  </kbd>
                  <span>to open search</span>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center">
                <svg
                  className="w-12 h-12 mx-auto text-text-muted dark:text-text-dark-muted mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-text-muted dark:text-text-dark-muted">
                  No results found for "{query}"
                </p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((result, index) => (
                  <Link
                    key={index}
                    href={result.url}
                    onClick={onClose}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-surface-dark-elevated transition-colors group"
                  >
                    {/* Image or Icon */}
                    {result.image ? (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100 dark:bg-surface-dark-sunken">
                        <Image
                          src={result.image}
                          alt={result.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-surface-dark-elevated flex items-center justify-center flex-shrink-0 text-text-muted dark:text-text-dark-muted">
                        {getTypeIcon(result.type)}
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-text-muted dark:text-text-dark-muted uppercase tracking-wide">
                          {result.type}
                        </span>
                        {result.tag && (
                          <>
                            <span className="text-text-muted dark:text-text-dark-muted">•</span>
                            <span className="text-xs text-text-muted dark:text-text-dark-muted">
                              {result.tag}
                            </span>
                          </>
                        )}
                      </div>
                      <h4 className="font-medium text-sm mb-1 group-hover:text-accent-500 transition-colors truncate">
                        {result.title}
                      </h4>
                      {result.description && (
                        <p className="text-xs text-text-muted dark:text-text-dark-muted line-clamp-2">
                          {result.description}
                        </p>
                      )}
                    </div>

                    {/* Arrow */}
                    <svg
                      className="w-5 h-5 text-text-muted dark:text-text-dark-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div className="px-4 py-3 border-t border-neutral-200 dark:border-border-dark bg-surface-elevated dark:bg-surface-dark-elevated">
              <div className="flex items-center justify-between text-xs text-text-muted dark:text-text-dark-muted">
                <span>{results.length} result{results.length !== 1 ? "s" : ""}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white dark:bg-surface-dark rounded border border-neutral-200 dark:border-border-dark">
                      ↑
                    </kbd>
                    <kbd className="px-2 py-1 bg-white dark:bg-surface-dark rounded border border-neutral-200 dark:border-border-dark">
                      ↓
                    </kbd>
                    <span>to navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white dark:bg-surface-dark rounded border border-neutral-200 dark:border-border-dark">
                      ↵
                    </kbd>
                    <span>to select</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
