import React, { useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import AkhilProfile from "@/components/AkhilProfile";

const AkhilProfilePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Akhil Singh | Founder & CEO of Fastigo AI"
        description="Akhil Singh is the Founder & CEO of Fastigo AI and Founder of Door2fy, building AI-powered business automation and technology platforms."
        keywords={[
          "Akhil Singh",
          "Akhil Singh Fastigo",
          "Akhil Singh Door2fy",
          "Founder Fastigo AI",
          "AI Workers",
          "Fastigo Leadership",
        ]}
        ogTitle="Akhil Singh | Founder & CEO of Fastigo AI"
        ogDescription="Entrepreneur building AI Workers and technology platforms for modern businesses."
      />
      <AkhilProfile isModal={false} />
    </>
  );
};

export default AkhilProfilePage;
