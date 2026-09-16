import { motion } from "framer-motion";

const partners = [
  { name: "AWS", url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Databricks", url: "https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png" },
  { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "NVIDIA", url: "https://upload.wikimedia.org/wikipedia/commons/a/a4/NVIDIA_logo.svg" },
  { name: "OpenAI", url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
  { name: "Oracle", url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "Salesforce", url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
  { name: "ServiceNow", isText: true, text: "servicenow", className: "text-xl font-bold tracking-tight lowercase text-[#293E40]" },
  { name: "Snowflake", url: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Snowflake_Logo.svg" },
  { name: "Teradata", isText: true, text: "teradata.", className: "text-xl font-bold tracking-tight lowercase text-[#F15A29]" },
];

const PartnerLogos = () => (
  <div className="flex shrink-0 items-center gap-6 pr-6 md:gap-8 md:pr-8">
    {partners.map((partner, idx) => (
      <div
        key={`${partner.name}-${idx}`}
        className="flex h-16 min-w-[140px] max-w-[180px] shrink-0 items-center justify-center px-6 py-3 rounded-2xl bg-white border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,112,173,0.1)] hover:border-[#0070AD]/30 transition-all duration-300"
      >
        {partner.isText ? (
          <span className={partner.className}>{partner.text}</span>
        ) : (
          <img
            src={partner.url}
            alt={partner.name}
            className={`max-h-8 w-auto max-w-[120px] object-contain ${partner.className || ""}`}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              const span = document.createElement("span");
              span.className = `text-lg font-bold tracking-tight text-slate-800 ${partner.className || ""}`;
              span.innerText = partner.name;
              (e.target as HTMLImageElement).parentElement?.appendChild(span);
            }}
          />
        )}
      </div>
    ))}
  </div>
);

const PartnersSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-20 border-t border-b border-slate-200/80">
      {/* Subtle ambient light glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-[#0070AD]/5 via-sky-100/30 to-blue-50/40 blur-[100px] rounded-full" />
      </div>
      
      {/* Container carefully aligned to match InsightsSection */}
      <div className="container mx-auto px-4 max-w-[1240px] relative z-10">
        <h2 className="text-2xl md:text-4xl font-display font-bold text-[#0E0A42] mb-12 text-center tracking-tight">
          Partners in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070AD] via-[#00A3E0] to-[#0070AD]">Change</span>
        </h2>

        <div className="relative -mx-4 overflow-hidden px-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          >
            <PartnerLogos />
            <PartnerLogos />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
