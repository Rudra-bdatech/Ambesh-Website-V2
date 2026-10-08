import { createFileRoute } from "@tanstack/react-router";
import { BusinessOSPage, faqs } from "@/components/BusinessOSPage";
import { getPageContent } from "@/lib/supabase";
import { buildMeta, jsonLd, breadcrumbSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/work")({
  loader: async () => {
    return await getPageContent("services");
  },
  head: () => {
    const m = buildMeta({
      path: "/work",
      title: "Work | Practical AI Adoption & Workflow Strategy | Ambesh",
      description:
        "Build an AI-powered Operating System for your founder-led business. Systems across sales, delivery, operations and hiring, with practical AI leverage.",
      keywords:
        "Business Operating System, founder-led business systems, AI-powered business systems India, business systemisation, business scaling advisor",
    });
    return {
      ...m,
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "AI-powered Business Operating System",
          provider: { "@type": "Person", name: "Ambesh Tiwari" },
          areaServed: ["India", "United Arab Emirates", "Africa"],
          url: `${SITE_URL}/work`,
          description:
            "Business Operating System build for founder-led companies. Systems, workflows and AI leverage installed inside the team.",
        }),
        jsonLd(faqSchema(faqs)),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
        ),
      ],
    };
  },
  component: WorkRouteComponent,
});

function WorkRouteComponent() {
  const loaderData = Route.useLoaderData();
  return <BusinessOSPage loaderData={loaderData} />;
}