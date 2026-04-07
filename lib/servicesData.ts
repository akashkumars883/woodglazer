export type SubService = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export type ServiceCategory = {
  slug: string;
  title: string;
  description: string;
  image: string;
  subServices: SubService[];
};

export const servicesData: ServiceCategory[] = [
  {
    slug: "wood-polishing-services",
    title: "Wood Polishing Services",
    description:
      "Our wood polishing services will restore the natural beauty of your wooden surfaces, leaving them looking refreshed and revitalized. We use high-quality polishing products and techniques to enhance the shine and protect the wood from future damage.",
    image: "/images/wood-polishing.png",

    subServices: [
      {
        slug: "melamine-polish-services",
        title: "Melamine Polish Services",
        description:
          "Our melamine polish services will restore the luster to your melamine surfaces, making them look like new. We use specialized products and techniques to ensure a smooth and glossy finish.",
        image: "/images/melamine-polishing.png",
      },
      {
        slug: "duco-paint-services",
        title: "Duco Paint Services",
        description:
          "Our duco paint services will give your wooden surfaces a durable and attractive finish. We use high-quality paints and techniques to ensure a smooth and long-lasting result.",
        image: "/images/duco-paint.png",
      },
      {
        slug: "pu-paint-services",
        title: "PU Paint Services",
        description:
          "Our pu paint services will give your wooden surfaces a durable and attractive finish. We use high-quality paints and techniques to ensure a smooth and long-lasting result.",
        image: "/images/pu-paint.png",
      },
      {
        slug: "pu-polish-services",
        title: "PU Polish Services",
        description:
          "Our pu polish services will restore the luster to your pu surfaces, making them look like new. We use specialized products and techniques to ensure a smooth and glossy finish.",
        image: "/images/pu-polishing.png",
      },
      {
        slug: "polyster-polish-services",
        title: "Polyester Polish Services",
        description:
          "Our polyester polish services will restore the luster to your polyester surfaces, making them look like new. We use specialized products and techniques to ensure a smooth and glossy finish.",
        image: "/images/polyester-polishing.png",
      },
      {
        slug: "other-premium-polish-services",
        title: "Other Premium & Polish Services",
        description:
          "We offer a range of premium polishing services for various materials, ensuring a flawless finish every time.",
        image: "/images/other-premium-polishing.png",
      },
      {
        slug: "Wood-Polish",
        title: "Wood Polish",
        description:
          "Our wood polish services will restore the luster to your wooden surfaces, making them look like new. We use specialized products and techniques to ensure a smooth and glossy finish.",
        image: "/images/wood-polishing.png",
      },
    ],
  },


  // carpentry services
  {
    slug: "carpentry-services",
    title: "Carpentry Services",
    description:
      "Our carpentry services include custom woodworking, repairs, and installations. We use high-quality materials and craftsmanship to create beautiful and functional wooden pieces for your home or business.",
    image: "/images/carpentry.png",

    subServices: [
      {
        slug: "general-carpentry-work",
        title: "General Carpentry Work",
        description:
          "Our general carpentry services include a wide range of woodworking tasks, from simple repairs to complex custom builds. We use high-quality materials and craftsmanship to create beautiful and functional wooden pieces for your home or business.",
        image: "/images/general-carpentry.png",
      },
      {
        slug: "residential-carpentry-work",
        title: "Residential Carpentry Work",
        description:
          "Our residential carpentry services include a wide range of woodworking tasks for your home. We use high-quality materials and craftsmanship to create beautiful and functional wooden pieces for your living space.",
        image: "/images/residential-carpentry.png",
      },
      {
        slug: "office-carpentry-work",
        title: "Office Carpentry Work",
        description:
          "Our office carpentry services include a wide range of woodworking tasks for your workspace. We use high-quality materials and craftsmanship to create beautiful and functional wooden pieces for your office environment.",
        image: "/images/office-carpentry.png",
      },
      {
        slug: "resturent-carpentry-work",
        title: "Restaurant Carpentry Work",
        description:
          "Our restaurant carpentry services include a wide range of woodworking tasks for your dining space. We use high-quality materials and craftsmanship to create beautiful and functional wooden pieces for your restaurant environment.",
        image: "/images/restaurant-carpentry.png",
      },
      {
        slug: "bars-cafe-carpentry-work",
        title: "Bars & Cafes Carpentry Work",
        description:
          "Our bars and cafes carpentry services include a wide range of woodworking tasks for your hospitality space. We use high-quality materials and craftsmanship to create beautiful and functional wooden pieces for your bar or cafe environment.",
        image: "/images/bars-cafe-carpentry.png",
      },
      {
        slug: "shop-showroom-interior-carpentry",
        title: "Shop & Showroom Interior Carpentry",
        description:
          "Our shop and showroom interior carpentry services include a wide range of woodworking tasks for your commercial space. We use high-quality materials and craftsmanship to create beautiful and functional wooden pieces for your retail or display environment.",
        image: "/images/shop-showroom-interior-carpentry.png",
      },
      {
        slug: "othercommercial-carpentry-work",
        title: "Other Commercial Carpentry Work",
        description:
          "Our other commercial carpentry services include a wide range of woodworking tasks for your business. We use high-quality materials and craftsmanship to create beautiful and functional wooden pieces for your commercial environment.",
        image: "/images/othercommercial-carpentry.png",
      },
      {
        slug: "exterior-carpentry-work",
        title: "Exterior Carpentry Work",
        description:
          "Our exterior carpentry services include a wide range of woodworking tasks for your outdoor spaces. We use high-quality materials and craftsmanship to create beautiful and functional wooden pieces for your home's exterior.",
        image: "/images/exterior-carpentry.png",
      },
    ],
  },
];

export function getServiceCategory(slug: string) {
  return servicesData.find((service) => service.slug === slug);
}

export function getNestedService(parentSlug: string, serviceSlug: string) {
  const parent = getServiceCategory(parentSlug);

  if (!parent) {
    return null;
  }

  const service = parent.subServices.find(
    (subService) => subService.slug === serviceSlug,
  );

  if (!service) {
    return null;
  }

  return { parent, service };
}
