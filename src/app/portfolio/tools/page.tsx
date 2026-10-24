export const dynamic = "force-dynamic";

import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { PortfolioDashboard } from "@/components/portfolio/PortfolioDashboard";
import { ProjectComparison } from "@/components/portfolio/ProjectComparison";

export const metadata = {
  title: "Portfolio Tools & Analytics",
  description: "Portfolio analytics dashboard, project comparison tool, and API documentation.",
};

export default async function PortfolioToolsPage() {
  const payload = await getPayload({ config: configPromise });

  const projects = await payload.find({
    collection: "projects",
    limit: 1000,
  });

  const allProjects = projects.docs;

  return (
    <main className="min-h-screen bg-navy px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold text-white sm:text-5xl">Portfolio Tools</h1>
          <p className="text-lg text-white/60">
            Analytics dashboard, project comparison, and API access
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-12 flex gap-2 border-b border-white/10">
          <div className="flex gap-2">
            <a
              href="#dashboard"
              className="border-b-2 border-[var(--brand-teal)] px-4 py-3 text-sm font-medium text-[var(--brand-teal)]"
            >
              Dashboard
            </a>
            <a
              href="#comparison"
              className="border-b-2 border-transparent px-4 py-3 text-sm font-medium text-white/60 hover:text-white"
            >
              Comparison
            </a>
            <a
              href="#api"
              className="border-b-2 border-transparent px-4 py-3 text-sm font-medium text-white/60 hover:text-white"
            >
              API Docs
            </a>
          </div>
        </div>

        {/* Dashboard Section */}
        <section id="dashboard" className="mb-16 scroll-mt-8">
          <h2 className="mb-8 text-2xl font-bold text-white">Portfolio Analytics</h2>
          <PortfolioDashboard projects={allProjects} />
        </section>

        {/* Comparison Section */}
        <section id="comparison" className="mb-16 scroll-mt-8">
          <h2 className="mb-8 text-2xl font-bold text-white">Project Comparison</h2>
          <ProjectComparison projects={allProjects} />
        </section>

        {/* API Documentation Section */}
        <section id="api" className="scroll-mt-8">
          <h2 className="mb-8 text-2xl font-bold text-white">API Documentation</h2>

          <div className="space-y-8">
            {/* GET /api/projects */}
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 font-mono text-lg font-semibold text-[var(--brand-teal)]">
                GET /api/projects
              </h3>
              <p className="mb-4 text-white/80">
                Retrieve projects with optional filtering, sorting, and pagination.
              </p>

              {/* Query Parameters */}
              <div className="mb-6">
                <h4 className="mb-3 font-semibold text-white">Query Parameters</h4>
                <div className="space-y-2 text-sm">
                  <div className="rounded bg-white/5 p-3">
                    <div className="font-mono text-white">
                      <span className="text-amber-400">featured</span>
                      <span className="text-white/60"> (boolean)</span>
                    </div>
                    <div className="text-xs text-white/60">Filter by featured status (true/false)</div>
                  </div>
                  <div className="rounded bg-white/5 p-3">
                    <div className="font-mono text-white">
                      <span className="text-amber-400">category</span>
                      <span className="text-white/60"> (string)</span>
                    </div>
                    <div className="text-xs text-white/60">
                      Filter by category: Web, iOS, Android, Desktop, ERP, Mobile
                    </div>
                  </div>
                  <div className="rounded bg-white/5 p-3">
                    <div className="font-mono text-white">
                      <span className="text-amber-400">sort</span>
                      <span className="text-white/60"> (string)</span>
                    </div>
                    <div className="text-xs text-white/60">
                      Sort order: featured, newest, oldest, alphabetical
                    </div>
                  </div>
                  <div className="rounded bg-white/5 p-3">
                    <div className="font-mono text-white">
                      <span className="text-amber-400">limit</span>
                      <span className="text-white/60"> (number)</span>
                    </div>
                    <div className="text-xs text-white/60">
                      Number of results (1-1000, default: 100)
                    </div>
                  </div>
                </div>
              </div>

              {/* Example Requests */}
              <div className="mb-6">
                <h4 className="mb-3 font-semibold text-white">Example Requests</h4>
                <div className="space-y-3">
                  <div className="overflow-x-auto rounded bg-navy/60 p-3">
                    <code className="font-mono text-sm text-cyan-300">
                      GET /api/projects?featured=true&limit=10
                    </code>
                    <div className="mt-1 text-xs text-white/50">Fetch top 10 featured projects</div>
                  </div>
                  <div className="overflow-x-auto rounded bg-navy/60 p-3">
                    <code className="font-mono text-sm text-cyan-300">
                      GET /api/projects?category=Web&sort=newest&limit=20
                    </code>
                    <div className="mt-1 text-xs text-white/50">Fetch 20 newest web projects</div>
                  </div>
                  <div className="overflow-x-auto rounded bg-navy/60 p-3">
                    <code className="font-mono text-sm text-cyan-300">
                      GET /api/projects?category=Mobile
                    </code>
                    <div className="mt-1 text-xs text-white/50">Fetch all mobile projects (iOS + Android)</div>
                  </div>
                </div>
              </div>

              {/* Response Format */}
              <div>
                <h4 className="mb-3 font-semibold text-white">Response Format</h4>
                <div className="overflow-x-auto rounded bg-navy/60 p-4">
                  <pre className="font-mono text-sm text-green-400">
{`{
  "success": true,
  "total": 25,
  "limit": 10,
  "returned": 10,
  "data": [
    {
      "id": "project-id",
      "title": "Project Name",
      "slug": "project-name",
      "shortDescription": "Brief description",
      "category": "Web",
      "featured": true,
      "order": 1,
      "techStack": [
        { "tech": "React" },
        { "tech": "TypeScript" }
      ],
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Usage Examples */}
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 font-semibold text-white">Usage Examples</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-mono text-sm text-[var(--brand-teal)]">JavaScript/Fetch</h4>
                  <div className="overflow-x-auto rounded bg-navy/60 p-3">
                    <pre className="font-mono text-xs text-white">
{`const response = await fetch(
  '/api/projects?category=Web&limit=10'
);
const { data, total } = await response.json();
console.log(\`Found \${total} web projects\`);`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-sm text-[var(--brand-teal)]">cURL</h4>
                  <div className="overflow-x-auto rounded bg-navy/60 p-3">
                    <pre className="font-mono text-xs text-white">
{`curl "https://ddotsmedia.com/api/projects?featured=true&limit=5" \\
  -H "Accept: application/json"`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-mono text-sm text-[var(--brand-teal)]">Python</h4>
                  <div className="overflow-x-auto rounded bg-navy/60 p-3">
                    <pre className="font-mono text-xs text-white">
{`import requests

response = requests.get(
    'https://ddotsmedia.com/api/projects',
    params={'category': 'Mobile', 'limit': 20}
)
projects = response.json()['data']`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Rate Limiting & Notes */}
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-4 font-semibold text-white">Important Notes</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex gap-3">
                  <span className="text-[var(--brand-teal)]">•</span>
                  <span>Mobile category returns both iOS and Android projects</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--brand-teal)]">•</span>
                  <span>Default limit is 100 if not specified</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--brand-teal)]">•</span>
                  <span>Results are paginated; use limit parameter for large datasets</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--brand-teal)]">•</span>
                  <span>All endpoints are public and require no authentication</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
