const SITE_URL = "https://www.bio-peptides.com";
const SITE_NAME = "BioPeptide";
const LOGO_URL = `${SITE_URL}/Biologofull.png`;

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: LOGO_URL,
  description:
    "BioPeptide supplies high-purity research peptides and laboratory-use peptide formulations.",
  email: "info@bio-peptides.com",
  sameAs: [],
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?query={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function createPageSchema({
  path,
  name,
  description,
  breadcrumbName,
  pageType = "WebPage",
}) {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/|\/$/g, "")}`;
  const url = `${SITE_URL}${normalizedPath === "/" ? "/" : normalizedPath}`;
  const breadcrumbId = `${url}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      {
        "@type": pageType,
        "@id": `${url}#webpage`,
        url,
        name,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#organization`,
        },
        description,
        breadcrumb: {
          "@id": breadcrumbId,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: breadcrumbName || name,
            item: url,
          },
        ],
      },
    ],
  };
}

export function PageJsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
