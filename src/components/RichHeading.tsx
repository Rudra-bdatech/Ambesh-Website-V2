import React from "react";

interface RichHeadingProps {
  text?: string;
  className?: string;
  defaultContent?: React.ReactNode;
  defaultGradient?: string;
}

// Known highlight patterns for automatic beauty retention when plain text is provided
const AUTO_FORMAT_PATTERNS = [
  {
    plain: "I Help Founders Scale Their Service Business Without Depending on Them.",
    formatted: "I Help Founders Scale Their [Service Business] *Without Depending on Them.*",
  },
  {
    plain: "Running a business shouldn't feel like putting out fires every day.",
    formatted: "Running a business\nshouldn't feel like\n*putting out fires\nevery day.*",
  },
  {
    plain: "Better businesses aren't built by adding more tools.",
    formatted: "Better businesses aren't built by *adding more tools.*",
  },
  {
    plain: "I Build. I Advise. I Train.",
    formatted: "I Build. I Advise. *I Train.*",
  },
  {
    plain: "Results that speak for themselves.",
    formatted: "Results that speak *for themselves.*",
  },
  {
    plain: "I do not only advise. I build.",
    formatted: "I do not only advise.\n*I build.*",
  },
  {
    plain: "Work across companies, teams and institutions.",
    formatted: "Work across companies, *teams and institutions.*",
  },
  {
    plain: "Meet Ambesh.",
    formatted: "Meet *Ambesh.*",
  },
  {
    plain: "Accelerate with AI.",
    formatted: "Accelerate *with AI.*",
  },
  {
    plain: "Ready to Build a Business That Runs Better?",
    formatted: "Ready to Build a Business *That Runs Better?*",
  },
  {
    plain: "I help founders turn business chaos into systems.",
    formatted: "I help founders turn business chaos *into systems.*",
  },
  {
    plain: "From small town to building across three continents.",
    formatted: "From small town to building across *three continents.*",
  },
  {
    plain: "Ideas that guide my work.",
    formatted: "Ideas that guide\n*my work.*",
  },
  {
    plain: "What Ambesh is hired for.",
    formatted: "What Ambesh is *hired for.*",
  },
  {
    plain: "Four beliefs that shape every engagement.",
    formatted: "Four beliefs that shape *every engagement.*",
  },
  {
    plain: "Entrepreneur. Builder. Teacher.",
    formatted: "Entrepreneur. Builder. *Teacher.*",
  },
  {
    plain: "From small town to training teams across three continents.",
    formatted: "From small town to training teams across *three continents.*",
  },
  {
    plain: "One company. One school. Three products.",
    formatted: "One company. One school. *Three products.*",
  },
  {
    plain: "About working together.",
    formatted: "About working *together.*",
  },
  {
    plain: "Small details that shape how Ambesh works.",
    formatted: "Small details that shape *how Ambesh works.*",
  },
  {
    plain: "If any of this resonates, let us have a conversation.",
    formatted: "If any of this resonates, *let us have a conversation.*",
  },
  {
    plain: "Build the operating system your business needs to scale without you.",
    formatted: "Build the operating system your business needs to *scale without you.*",
  },
  {
    plain: "Three layers. One Operating System.",
    formatted: "Three layers. *One Operating System.*",
  },
  {
    plain: "Built for founder-led businesses.",
    formatted: "Built for founder-led *businesses.*",
  },
  {
    plain: "How an OS engagement actually runs.",
    formatted: "How an OS engagement *actually runs.*",
  },
  {
    plain: "Before you ask.",
    formatted: "Before you *ask.*",
  },
  {
    plain: "The strongest engagements begin with an honest audit, not a proposal.",
    formatted: "The strongest engagements begin with an honest audit, *not a proposal.*",
  },
  {
    plain: "Let's build the system your business needs.",
    formatted: "Let's build the system *your business needs.*",
  },
  {
    plain: "Let's diagnose your business.",
    formatted: "Let's diagnose *your business.*",
  },
  {
    plain: "Pitch a conversation for the podcast.",
    formatted: "Pitch a conversation *for the podcast.*",
  },
  {
    plain: "Quick answers.",
    formatted: "Quick *answers.*",
  },
  {
    plain: "Corporate AI training that turns confusion into daily use.",
    formatted: "Corporate AI training that turns *confusion into daily use.*",
  },
  {
    plain: "Three training formats. One practical method.",
    formatted: "Three training formats. *One practical method.*",
  },
  {
    plain: "Recognisable rooms. Real teams.",
    formatted: "Recognisable rooms. *Real teams.*",
  },
  {
    plain: "Your team should leave with things they can use.",
    formatted: "Your team should leave with *things they can use.*",
  },
  {
    plain: "The feedback teams share, session after session.",
    formatted: "The feedback teams share, *session after session.*",
  },
  {
    plain: "11 industries. One playbook.",
    formatted: "11 industries. *One playbook.*",
  },
  {
    plain: "Bring practical AI training to your team.",
    formatted: "Bring practical AI training *to your team.*",
  },
  {
    plain: "Inspire with Ambesh.",
    formatted: "Inspire with *Ambesh.*",
  },
  {
    plain: "A few worth starting with.",
    formatted: "A few worth *starting with.*",
  },
  {
    plain: "The territory.",
    formatted: "The *territory.*",
  },
  {
    plain: "Ambesh Tiwari.",
    formatted: "Ambesh *Tiwari.*",
  },
  {
    plain: "New conversations. In your inbox.",
    formatted: "New conversations. *In your inbox.*",
  },
  {
    plain: "Got a story worth sharing?",
    formatted: "Got a story *worth sharing?*",
  },
  {
    plain: "Accelerate With AI.",
    formatted: "Accelerate *With AI.*",
  },
  {
    plain: "Written for people who do real work.",
    formatted: "Written for people who *do real work.*",
  },
  {
    plain: "10 things this book will teach you.",
    formatted: "10 things this book will *teach you.*",
  },
  {
    plain: "The people who read it first.",
    formatted: "The people who *read it first.*",
  },
  {
    plain: "Get Chapter 1 on us.",
    formatted: "Get *Chapter 1* on us.",
  },
  {
    plain: "Systems, scaling, and practical AI leverage.",
    formatted: "Systems, scaling, and *practical AI leverage.*",
  },
  {
    plain: "Get systems advice directly in your inbox.",
    formatted: "Get systems advice directly in your *inbox.*",
  },
];

export function RichHeading({ text, className, defaultContent }: RichHeadingProps) {
  if (!text && defaultContent) {
    return <>{defaultContent}</>;
  }
  if (!text) return null;

  let processedText = text;

  // If text does not contain any explicit markup (* or [), check if it matches any known pattern
  if (!processedText.includes("*") && !processedText.includes("[")) {
    const matched = AUTO_FORMAT_PATTERNS.find(
      (p) => p.plain.toLowerCase().replace(/\s+/g, " ").trim() === processedText.toLowerCase().replace(/\s+/g, " ").trim()
    );
    if (matched) {
      processedText = matched.formatted;
    }
  }

  const parts: React.ReactNode[] = [];
  // Regex supporting multiline text inside [ ... ] or * ... * and standalone newlines
  const regex = /\[([\s\S]*?)\]|\*([\s\S]*?)\*|\n/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(processedText)) !== null) {
    if (match.index > lastIndex) {
      parts.push(processedText.slice(lastIndex, match.index));
    }

    if (match[0] === "\n") {
      parts.push(<br key={`br-${key++}`} />);
    } else if (match[1] !== undefined) {
      // Underlined serif accent (with multiline support)
      const lines = match[1].split("\n");
      parts.push(
        <span key={`u-${key++}`} className="relative inline-block">
          <span className="font-serif italic font-medium text-ink dark:text-white">
            {lines.map((line, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </span>
          <span
            className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full"
            style={{ background: "var(--accent)" }}
          />
        </span>
      );
    } else if (match[2] !== undefined) {
      // Gradient italic serif brand (with multiline support)
      const lines = match[2].split("\n");
      parts.push(
        <span key={`g-${key++}`} className="font-serif italic font-medium text-gradient-brand pr-0.5">
          {lines.map((line, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </span>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < processedText.length) {
    parts.push(processedText.slice(lastIndex));
  }

  if (className) {
    return <span className={className}>{parts}</span>;
  }

  return <>{parts}</>;
}
