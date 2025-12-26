"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  slug: string;
  title: string;
  tag: string;
  image: string;
  description?: string;
  viewCount?: number;
  hasShoppableItems?: boolean;
  className?: string;
}

export default function ProjectCard({
  slug,
  title,
  tag,
  image,
  description,
  viewCount = 0,
  hasShoppableItems = false,
  className = "",
}: ProjectCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <Link
      href={`/project/${slug}`}
      className={`card card-interactive group overflow-hidden ${className}`}
    >
      {/* Image Container with Overlay */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-surface-dark-sunken">
        {/* Skeleton Loader */}
        {!isImageLoaded && (
          <div className="absolute inset-0 skeleton animate-pulse" />
        )}

        {/* Project Image */}
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-all duration-700 ${
            isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } group-hover:scale-110`}
          onLoad={() => setIsImageLoaded(true)}
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Right Actions */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          {/* Category Badge */}
          <div className="badge badge-primary backdrop-blur-sm">
            {tag.split(" • ")[0]}
          </div>

          {/* Save to Wishlist Button */}
          <button
            onClick={handleSaveToggle}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isSaved
                ? "bg-blush-400 text-white scale-110"
                : "bg-white/90 dark:bg-surface-dark/90 text-neutral-700 dark:text-text-dark hover:scale-110"
            }`}
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              className="w-5 h-5"
              fill={isSaved ? "currentColor" : "none"}
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
          </button>
        </div>

        {/* Bottom Overlay Info (Visible on Hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between gap-3">
            {/* View Count */}
            {viewCount > 0 && (
              <div className="flex items-center gap-1 text-white text-sm backdrop-blur-sm bg-black/30 px-3 py-1 rounded-full">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span>{viewCount.toLocaleString()}</span>
              </div>
            )}

            {/* Shop This Look Button */}
            {hasShoppableItems && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // TODO: Open shop modal
                }}
                className="btn btn-sm bg-white text-neutral-900 hover:bg-neutral-100 shadow-medium"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Shop This Look
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Tag */}
        <div className="text-sm text-text-muted dark:text-text-dark-muted mb-2">
          {tag}
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-accent-500 transition-colors">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-text-muted dark:text-text-dark-muted line-clamp-2 mb-4">
            {description}
          </p>
        )}

        {/* View Project Link */}
        <div className="flex items-center gap-2 text-accent-500 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          View project
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
        </div>
      </div>
    </Link>
  );
}
