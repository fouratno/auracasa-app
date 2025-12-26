import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/sanity.queries";
import { getImageUrl } from "@/lib/sanity.client";

// Enable ISR
export const revalidate = 60;

export default async function Portfolio() {
  // Fetch all projects from Sanity
  const projects = await getAllProjects();

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-semibold mb-3">Portfolio</h1>
        <p className="text-lg text-text-muted dark:text-text-dark-muted max-w-3xl">
          Conceptual interiors exploring the space between imagination and reality.
          Each project is a study in how future living could feel—AI-generated visions
          guided by human sensibility.
        </p>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-text-muted dark:text-text-dark-muted">
        Showing {projects.length} {projects.length === 1 ? 'project' : 'projects'}
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const categoryLabel = project.category === 'ai-generated' ? 'AI' : 
                                 project.category === 'hybrid' ? 'Hybrid' : 'Real';
            const styleLabel = project.style?.[0] || 'Design';
            const tag = `${categoryLabel} • ${styleLabel}`;
            const imageUrl = project.heroImage ? getImageUrl(project.heroImage, 800, 600) : '/hero-1.jpg';
            const description = project.description?.[0]?.children?.[0]?.text || '';
            
            return (
              <div
                key={project._id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard
                  slug={project.slug.current}
                  title={project.title}
                  tag={tag}
                  image={imageUrl}
                  description={description}
                  viewCount={Math.floor(Math.random() * 5000) + 1000}
                  hasShoppableItems={project.affiliateProducts && project.affiliateProducts.length > 0}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <svg
            className="w-16 h-16 mx-auto text-text-muted dark:text-text-dark-muted mb-4"
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
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-text-muted dark:text-text-dark-muted mb-6">
            Projects will appear here once they are published in Sanity CMS
          </p>
        </div>
      )}
    </div>
  );
}
