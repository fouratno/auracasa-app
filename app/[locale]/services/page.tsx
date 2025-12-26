export default function Services() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-semibold">What We Create</h1>
      
      <p className="mt-4 max-w-2xl text-neutral-700">
        Auracasa collaborates with brands, studios, and visionaries to create conceptual interior worlds. 
        We don't build physical spaces—we build visual narratives and emotional atmospheres.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 max-w-4xl">
        <div className="card p-6">
          <h2 className="text-xl font-medium">Visual Storytelling</h2>
          <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
            AI-generated interior concepts that explore future living. Each project includes curated 
            visuals, atmospheric narratives, and editorial context. Perfect for brands seeking to 
            communicate vision rather than product.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-medium">Brand World-Building</h2>
          <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
            Complete conceptual environments for brands entering the interior or lifestyle space. 
            We develop color systems, material palettes, and visual languages that feel both futuristic 
            and emotionally grounded.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-medium">Editorial Content</h2>
          <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
            Long-form articles, case studies, and design essays for publications and platforms. 
            We translate complex design concepts into accessible, inspiring narratives that resonate 
            with design-conscious audiences.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-medium">Curation & Inspiration</h2>
          <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
            Carefully selected product recommendations and material explorations. Through affiliate 
            partnerships, we connect conceptual visions with tangible objects that embody our 
            aesthetic philosophy.
          </p>
        </div>
      </div>

      <div className="mt-12 max-w-2xl">
        <h3 className="text-lg font-medium">Interested in collaborating?</h3>
        <p className="mt-2 text-neutral-700">
          We work with brands, design studios, and editorial platforms that value conceptual thinking 
          and atmospheric storytelling. Reach out through our{" "}
          <a href="/contact" className="underline">contact form</a> to discuss possibilities.
        </p>
      </div>
    </div>
  );
}
