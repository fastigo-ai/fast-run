import { motion } from "framer-motion";


const partners = [
  { name: "AWS", url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", className: "bg-white rounded px-3 py-2" },
  { name: "Databricks", url: "https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png", className: "text-[#FF3621]" },
  { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "NVIDIA", url: "https://upload.wikimedia.org/wikipedia/commons/a/a4/NVIDIA_logo.svg" },
  { name: "OpenAI", url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
  { name: "Oracle", url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "Salesforce", url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
  { name: "ServiceNow", isText: true, text: "servicenow", className: "text-2xl font-bold tracking-tight lowercase text-[#81B5A1]" },
  { name: "Snowflake", url: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Snowflake_Logo.svg" },
  { name: "Teradata", isText: true, text: "teradata.", className: "text-2xl font-bold tracking-tight lowercase text-[#F15A29]" },
];

const PartnerLogos = () => (
  <div className="flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20">
    {partners.map((partner) => (
      <div
        key={partner.name}
        className="flex h-14 min-w-[120px] shrink-0 items-center justify-center opacity-90 transition-opacity duration-300 hover:opacity-100"
      >
        {partner.isText ? (
          <span className={partner.className}>{partner.text}</span>
        ) : (
          <img
            src={partner.url}
            alt={partner.name}
            className={`max-h-9 w-auto max-w-[150px] object-contain ${partner.className || ""}`}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              const span = document.createElement("span");
              span.className = `text-2xl font-bold tracking-tighter ${partner.className || "text-white"}`;
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
    <section className="relative w-full overflow-hidden bg-[#0B192C] pb-16 pt-8 md:pb-20 md:pt-12">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Container carefully aligned to match InsightsSection */}
      <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
        <h2 className="text-2xl md:text-4xl font-display font-medium text-white mb-12 text-center">
          Partners in change
        </h2>

        <div className="relative -mx-4 overflow-hidden px-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 50, ease: "linear", repeat: Infinity }}
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
