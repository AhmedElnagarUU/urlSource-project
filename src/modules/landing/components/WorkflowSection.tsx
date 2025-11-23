"use client";

const workflowSteps = [
  {
    number: 1,
    title: "Requirement Gathering",
    items: [
      "Collect project requirements from stakeholders",
      "Document functional and non-functional requirements",
    ],
    deliverable: "Requirement List / Specification Document",
  },
  {
    number: 2,
    title: "Planning & Architecture",
    items: [
      "Define main entities, models, or database tables",
      "Suggest clear global-friendly names",
      "Decide on overall system architecture",
    ],
    deliverable: "Architecture Plan",
  },
  {
    number: 3,
    title: "Database Design & Relationships",
    items: [
      "Map entity relationships (1:1, 1:n, n:n)",
      "Design tables, foreign keys, indexes, and constraints",
    ],
    deliverable: "Entity-Relationship Diagram (ERD)",
  },
  {
    number: 4,
    title: "Module Design & Planning",
    items: [
      "Break the system into modules",
      "Define responsibilities and dependencies of each module",
    ],
    deliverable: "Module Diagram / Architecture Plan",
  },
  {
    number: 5,
    title: "Use Case & System Flow",
    items: [
      "Define user stories or use cases",
      "Map how users interact with the system step by step",
    ],
    deliverable: "Flowchart / Sequence Diagram",
  },
  {
    number: 6,
    title: "Development & Implementation",
    items: [
      "Implement backend, APIs, frontend, and integrations",
      "Follow clean architecture and separation of concerns",
    ],
    deliverable: "Working Application",
  },
  {
    number: 7,
    title: "Testing & Quality Assurance",
    items: [
      "Perform unit testing, integration testing, and end-to-end testing",
      "Document expected outcomes and track bugs",
    ],
    deliverable: "Test Reports & Bug Fixes",
  },
  {
    number: 8,
    title: "Deployment & Maintenance",
    items: [
      "Deploy the system to production or staging servers",
      "Setup monitoring, CI/CD pipelines, and regular updates",
    ],
    deliverable: "Live Application",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="py-20 bg-gray-50 dark:bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Project Workflow
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A systematic approach to building robust and scalable applications
          </p>
        </div>
        <div className="space-y-6">
          {workflowSteps.map((step) => (
            <div
              key={step.number}
              className="p-8 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-[#334155] shadow-sm"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#E50914] dark:bg-[#14b8a6] text-white rounded-lg flex items-center justify-center font-bold text-xl">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <ul className="space-y-2 mb-4">
                    {step.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-[#E50914] dark:text-[#14b8a6] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-[#0f172a] rounded-lg border border-gray-200 dark:border-[#334155]">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      📄 Deliverable: {step.deliverable}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

