export type SubService = {
  slug: string;
  title: string;
  description: string;
  image: string;
  details?: string;
  features?: string[];
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
      "Our premium wood polishing services restore the depth, shine, and natural beauty of your wooden surfaces, leaving them looking refreshed and revitalized. We use high-quality eco-friendly products and technical application methods to enhance protection and glow.",
    image: "/images/wood-polishing.png",
    subServices: [
      {
        slug: "melamine-polish-services",
        title: "Melamine Polish Services",
        description: "Produces a smooth, hard surface with a satin to gloss sheen, providing excellent resistance to water and everyday stains.",
        image: "/images/melamine-polishing.png",
        features: [
          "Wardrobes & Closets",
          "Kitchen Cabinets",
          "TV Console Units",
          "Study Tables & Desks"
        ],
        details: "Melamine polish is one of the most popular and versatile finishes for indoor furniture and cabinetry. It produces a smooth, hard surface with a satin to gloss sheen, offering excellent resistance to water and staining, and a clean, contemporary appearance that complements both modern and traditional interiors.\n\nOur melamine polish service covers the complete process — stripping the old finish if needed, sanding, applying melamine-based primer, color-matching coats, and a final protective topcoat. The result is a surface that looks factory-fresh and resists everyday wear and tear perfectly."
      },
      {
        slug: "duco-paint-services",
        title: "Duco Paint Services",
        description: "Derived from premium nitrocellulose lacquer, Duco paint delivers a flawless, ultra-smooth, hard opaque finish synonymous with luxury.",
        image: "/images/duco-paint.png",
        features: [
          "Luxury Modular Furniture",
          "Modern Kitchen Shutters",
          "Main Entrance Doors",
          "Architectural Accents"
        ],
        details: "Duco paint — derived from high-grade nitrocellulose lacquer — delivers a hard, high-gloss, opaque finish that is synonymous with luxury furniture and premium interiors. The Duco process involves multiple coats of lacquer, each carefully water-sanded between applications, resulting in a flawlessly smooth and deeply glossy surface.\n\nDuco paint is available in virtually any RAL or custom shade, making it ideal for clients who want a specific, solid color to complement their interior design. Its superior hardness makes it one of the most durable protective finishes available for wooden panels and cabinetry."
      },
      {
        slug: "pu-paint-services",
        title: "PU Paint Services",
        description: "Two-component polyurethane coating offering exceptional hardness, chemical resistance, UV stability, and non-yellowing colors.",
        image: "/images/pu-paint.png",
        features: [
          "Modular Kitchen Fronts",
          "Bathroom Vanities",
          "Office Work Desks",
          "High-Exposure Areas"
        ],
        details: "Polyurethane (PU) paint is a two-component coating that offers outstanding hardness, chemical resistance, and UV stability. Unlike traditional lacquers, PU paint maintains its color stability and gloss level over time without yellowing — making it the preferred choice for surfaces exposed to sunlight, moisture, or frequent handling.\n\nPU paint is available in high-gloss, semi-gloss, satin, and ultra-matte finishes, and can be tinted to match any architectural color scheme. It is particularly popular for premium kitchen cabinetry, bathroom vanities, and executive office furniture where durability and hygiene are paramount."
      },
      {
        slug: "pu-polish-services",
        title: "PU Polish Services",
        description: "Transparent premium polyurethane coating designed to accentuate and shield the natural grain, wood tone, and organic character.",
        image: "/images/pu-polishing.png",
        features: [
          "Solid Wood Furniture",
          "Teak Wood Surfaces",
          "Statement Entrance Doors",
          "Wooden Ceiling Panels"
        ],
        details: "While PU paint offers a rich opaque finish, PU polish is transparent — designed to enhance and protect the natural grain and color of the wood rather than cover it. PU polish creates a thick, glass-like film over the wood surface, providing exceptional protection against scratches, moisture, and chemical exposure while allowing the organic beauty of the underlying timber to show through.\n\nIt is available in high-gloss, semi-gloss, and matte variants, and can be tinted with premium wood stains to adjust, rich-tone, or antique-finish the natural color of the timber before polishing."
      },
      {
        slug: "polyster-polish-services",
        title: "Polyester Polish Services",
        description: "The ultimate diamond-hard, high-build self-leveling coating that delivers a glass-like piano finish with deep reflective clarity.",
        image: "/images/polyester-polishing.png",
        features: [
          "Luxury Boardroom Tables",
          "Piano-Finish Dining Tables",
          "Premium Accent Furniture",
          "Reflective Focus Panels"
        ],
        details: "Polyester polish (commonly known as lamination polish) is the most durable and high-performance finish in our portfolio. It creates an exceptionally hard, thick, and scratch-resistant surface that rivals the depth and clarity of glass. Polyester finishes are self-leveling and create an almost perfectly flat surface — the absolute choice for high-end piano-finish furniture, executive office desks, and luxury interior elements.\n\nThe polyester polishing process is technically demanding and requires specialist equipment, temperature control, and immense expertise. Our team has the specialized spray booth tools and master craftsmanship necessary to deliver a flawless, mirror-like polyester finish that remains stunning for decades."
      },
      {
        slug: "other-premium-polish-services",
        title: "Other Premium & Polish Services",
        description: "Specialty artisanal coatings including natural beeswax, Danish oil, classic French shellac, and textured chalk paint.",
        image: "/images/other-premium-polishing.png",
        features: [
          "Antique Furniture Restoration",
          "Heritage & Vintage Properties",
          "Bespoke Wooden Sculptures",
          "French Lacquer / Shellac"
        ],
        details: "Beyond our high-tech modern synthetic coatings, Wood Glazer also offers a range of traditional, artisanal polishing services including raw natural beeswax, hand-rubbed Danish oils, classic shellac French polish, and customized chalk paints. These are ideal for antique furniture restoration, heritage bungalows, and bespoke design projects where a standard modern finish may not match the historical character.\n\nOur specialists assess the timber species, condition, and design goals before custom-formulating a treatment that preserves character while adding gentle protection."
      },
      {
        slug: "Wood-Polish",
        title: "Standard Wood Polish",
        description: "Classic, spirit-based traditional polish that restores the organic warmth and deep grain of timber without high-build synthetic layers.",
        image: "/images/wood-polishing.png",
        features: [
          "Classic Wooden Doors",
          "Traditional Dining Tables",
          "Heirloom Wood Keepsakes",
          "Natural Warm Timber Finish"
        ],
        details: "For clients seeking a classic, warm, and natural-looking finish, our traditional wood polish service delivers a timeless result. Using high-quality spirit-based and oil-based polishes, we restore the natural warmth and depth of timber without the heavy, high-build plastic characteristics of modern polyurethane. This approach is gentle on the wood and produces an elegant satin finish that feels comfortable and natural to the touch."
      }
    ]
  },
  {
    slug: "carpentry-services",
    title: "Carpentry Services",
    description:
      "Our carpentry division provides professional-grade custom joinery, architectural framing, interior partitioning, and prompt repairs. We combine wood engineering with artistic design to build sturdy, beautiful installations.",
    image: "/images/carpentry.png",
    subServices: [
      {
        slug: "general-carpentry-work",
        title: "General Carpentry Work",
        description: "Reliable, high-quality general repairs, hardware upgrades, shelf additions, and structural wooden maintenance.",
        image: "/images/general-carpentry.png",
        features: [
          "Door & Window Adjustments",
          "Hardware & Hinge Upgrades",
          "Custom Shelving Units",
          "Fitted Storage Assemblies"
        ],
        details: "Our general carpentry service covers a broad range of woodworking tasks — from minor repairs and hardware adjustments to custom-built shelving and structural wooden maintenance. Whether you need a squeaky door hinge fixed, slide-out pantry racks fitted, or a custom bookshelf built from scratch, our team has the tools and expertise to execute it quickly and cleanly.\n\nThis service is perfect for both homeowners and businesses who value prompt, professional-grade woodworking support for day-to-day needs and custom interior modifications."
      },
      {
        slug: "residential-carpentry-work",
        title: "Residential Carpentry Work",
        description: "Bespoke residential joinery including premium closets, custom wardrobes, modular kitchens, bed frames, and study areas.",
        image: "/images/residential-carpentry.png",
        features: [
          "Bespoke Master Wardrobes",
          "Modular Kitchen Cabinetry",
          "Designer Bed Frames",
          "TV Console & Study Desks"
        ],
        details: "Your home's woodwork defines both its luxury quotient and its daily functional ease. Our residential carpentry service covers the full spectrum of high-end home woodworking — from walk-in closets and bespoke sliding wardrobes to modular kitchen cabinets, heavy solid-wood bed frames, custom study corners, floating TV units, and internal flush doors.\n\nEvery home project is planned with precision alongside the client or interior architect, ensuring that materials, dimensions, and hardware align perfectly with your space. We operate with strict clean-site protocols, respecting your home throughout the build process."
      },
      {
        slug: "office-carpentry-work",
        title: "Office Carpentry Work",
        description: "Tailormade ergonomic office workstations, conference tables, file storage units, and wooden partition cabin joinery.",
        image: "/images/office-carpentry.png",
        features: [
          "Ergonomic Workstations",
          "Executive Cabin Desks",
          "Reception Counters",
          "Wooden Cabin Partitions"
        ],
        details: "An inspiring corporate workspace commands focus, reflects professional brand identity, and enhances daily productivity. Our office carpentry division is equipped to manufacture and assemble high-quality workstations, executive double-pedestal desks, secure file storage systems, boardroom conference tables, wooden partition frames, and striking custom reception backdrops.\n\nWe understand that business timelines are critical. We coordinate with site engineers and architects to manufacture major units off-site if needed, completing final assemblies quickly and cleanly on-site with minimal operations disruption."
      },
      {
        slug: "resturent-carpentry-work",
        title: "Restaurant Carpentry Work",
        description: "Robust, stylish hospitality joinery covering comfortable booth seating, wait stations, decorative beams, and main host desks.",
        image: "/images/restaurant-carpentry.png",
        features: [
          "Bespoke Banquette Seating",
          "Beverage Service Stations",
          "Host Desks & Reception",
          "Decorative Wooden Ceiling"
        ],
        details: "In the hospitality industry, ambience and sturdiness are key. Our restaurant carpentry team crafts high-character dining environments, constructing comfortable deep-cushioned booth seating, custom waiter service stations, brand entrance host desks, overhead rustic wooden beams, and heavy-use wooden railings.\n\nWe design with high-density, commercial-grade materials that withstand high turnover, constant cleaning, and heavy public use, ensuring your restaurant retains its premium look year after year."
      },
      {
        slug: "bars-cafe-carpentry-work",
        title: "Bars & Cafes Carpentry Work",
        description: "Distinctive cafe countertops, communal tables, back-bar display structures, and custom menu panel boards.",
        image: "/images/bars-cafe-carpentry.png",
        features: [
          "Custom Bar Countertops",
          "Back-Bar Display Shelves",
          "Communal Wooden Tables",
          "Acoustic Wood Paneling"
        ],
        details: "From cozy artisanal espresso cafes to high-volume luxury cocktail lounges, the woodwork establishes the brand character. Our specialized cafe carpentry service manufactures custom wooden bar countertops, back-bar glass-and-wood shelving, solid communal tables, menu backdrops, and acoustic timber slats.\n\nWe select hardwoods and apply high-durability food-safe finishes that repel hot coffee spills, alcohol stains, and daily wear, creating a comfortable and lasting social environment."
      },
      {
        slug: "shop-showroom-interior-carpentry",
        title: "Shop & Showroom Interior Carpentry",
        description: "Bespoke retail fixtures, floating displays, checkout tables, product shelves, and functional changing room compartments.",
        image: "/images/shop-showroom-interior-carpentry.png",
        features: [
          "Bespoke Retail Display Shelves",
          "Gondola Display Units",
          "Premium Checkout Counters",
          "Changing Room Partitioning"
        ],
        details: "Retail showroom interiors require a balance of brand impact, clear product display, and durable layouts. Our retail carpentry service builds floating glass display shelves, heavy-duty center display tables, branded checkout counters, changing room modules, and shoe wall displays.\n\nWe ensure all display units are perfectly level, can support significant product weight, and feature wire-management routing for integrated LED lighting strips to highlight your merchandise premiumly."
      },
      {
        slug: "othercommercial-carpentry-work",
        title: "Other Commercial Carpentry Work",
        description: "Specialized carpentry solutions for boutique hotels, medical clinics, schools, beauty salons, and banking outlets.",
        image: "/images/othercommercial-carpentry.png",
        features: [
          "Hotel Lobby Woodworks",
          "Dental & Clinic Cabinets",
          "Salon Mirror Frames & Desks",
          "School Library Shelving"
        ],
        details: "Wood Glazer's carpentry team has the experience to execute specialized layouts for various commercial sectors. We build lobby wall panels and luggage racks for boutique hotels, hygienic seamless storage cabinets for dental and medical clinics, display shelving for institutional libraries, mirror panels and workstations for beauty salons, and customer-service desks for banks.\n\nWe adapt our material selection (such as fire-retardant or moisture-resistant boards) to match the strict safety and hygiene requirements of your specific commercial industry."
      },
      {
        slug: "exterior-carpentry-work",
        title: "Exterior Carpentry Work",
        description: "Weatherproof exterior woodwork including luxury garden pergolas, gazebo frames, structural decking, and gates.",
        image: "/images/exterior-carpentry.png",
        features: [
          "Premium Garden Pergolas",
          "Structural Wooden Decking",
          "Balcony Cladding & Screens",
          "Heavy Timber Gates & Fences"
        ],
        details: "Outdoor wooden installations require highly resilient materials and technical construction to survive extreme sun, monsoon rains, and temperature swings. Our exterior carpentry division builds luxury garden pergolas, poolside wooden decking, balcony privacy louvers, garden gates, and facade cladding panels.\n\nWe work exclusively with high-durability timber species (like seasoned teak or treated pine) and utilize stainless steel structural connectors and weather-rated exterior finishes to guarantee decades of structural strength and visual beauty."
      }
    ]
  },
  {
    slug: "wallpaper-and-interior-panels",
    title: "Wallpaper & Interior Panels",
    description: "Upgrade your plain walls with our premium designer wallpaper and architectural 3D wall panels. From deep-toned charcoal to elegant fluted elements, we craft eye-catching focal walls for modern interiors.",
    image: "/images/wallpaper/wallpaper-main.png",
    subServices: [
      {
        slug: "charcoal-panels",
        title: "Charcoal Panels",
        description: "Deep, moody charcoal and slate-toned designer panels that create sophisticated contrast and rich visual drama.",
        image: "/images/wallpaper/charcoal-panels.png",
        features: [
          "Moody Charcoal Textures",
          "Deep Slate-Toned Finishes",
          "Anti-Fingerprint Layers",
          "High-Contrast Accent Walls"
        ],
        details: "Deep, dark, and moody wall finishes — charcoal, graphite, and deep slate tones — have emerged as a defining luxury trend. Our charcoal designer panel collection adds a rich layer of drama and high-contrast sophistication to executive offices, living room TV backdrops, and bedroom headboard walls.\n\nWe supply and install premium imported charcoal-composite panels with anti-scratch and anti-fingerprint surface layers, ensuring the moody matte appearance remains pristine with simple dust-wipes."
      },
      {
        slug: "pvc-panels",
        title: "PVC Panels",
        description: "Durable, moisture-proof, and low-maintenance PVC panels available in elegant marble, concrete, and wood-grain patterns.",
        image: "/images/wallpaper/pvc-panels.png",
        features: [
          "100% Waterproof Structure",
          "Hygienic & Moisture-Resistant",
          "Quick Interlocking Assembly",
          "Marble & Wood Grain Textures"
        ],
        details: "Plain paint often fails in moist, humid, or high-friction areas. Our premium PVC wall panels offer a 100% waterproof, termite-proof, and highly hygienic solution for kitchen backsplashes, bathroom accent walls, and basement rooms. Designed with interlocking groove joints, they are installed quickly and cover underlying wall dampness perfectly.\n\nAvailable in incredibly realistic high-gloss marble textures, textured concrete finishes, and warm wood-grain lookups, PVC panels deliver premium visuals with low maintenance requirements."
      },
      {
        slug: "fluted-panels",
        title: "Fluted Panels",
        description: "Elegant vertical-ribbed fluted paneling that creates shadows, architectural depth, and premium textures on feature walls.",
        image: "/images/wallpaper/fluted-panels.png",
        features: [
          "Vertical Ribbed Design",
          "Veneer, MDF & WPC Options",
          "Sleek Concealed Joinery",
          "Textured Shadow Play"
        ],
        details: "Fluted panels are a favorite design choice for contemporary architects and decorators. The vertical ribbed profiles create beautiful shadow plays, giving flat walls a tactile, architectural structure. We offer complete supply and installation of fluted paneling in living areas, hotel lobbies, master beds, and corporate boardrooms.\n\nChoose from warm natural wood veneer finishes, ready-to-paint premium MDF panels, or pre-finished WPC flutes. Our seamless joint-locking ensures a continuous fluted pattern across any wall width."
      },
      {
        slug: "wpc-panels",
        title: "WPC Panels",
        description: "Wood Plastic Composite wall cladding that combines the organic aesthetic of natural timber with composite durability.",
        image: "/images/wallpaper/wpc-panels.png",
        features: [
          "Heavy Weathering Durability",
          "Termite & Pest Resistant",
          "Zero Rot or Splintering",
          "Eco-Friendly Recycled Blend"
        ],
        details: "Wood Plastic Composite (WPC) wall panels combine natural wood fibers with high-durability polymers to deliver the warm organic look of timber with none of its structural weaknesses. Ideal for semi-outdoor balconies, terrace feature walls, and high-impact lobby entrances, WPC panels are impervious to moisture, termites, and cracking.\n\nThey do not require regular painting or polishing, making them a cost-effective, eco-friendly, and highly durable wall cladding option for both residential and commercial projects."
      },
      {
        slug: "cnc-engraved-panels",
        title: "CNC Engraved Panels",
        description: "Precision CNC-routed 3D relief wood and MDF panels. Adds intricate geometric patterns and artistic custom designs.",
        image: "/images/wallpaper/cnc-panels.png",
        features: [
          "3D Dimensional Reliefs",
          "Precision CNC Routing",
          "Bespoke Geometric Patterns",
          "Integrated Behind-LED Slots"
        ],
        details: "For spaces that demand high-impact custom design, our CNC engraved and textured wall panel service provides bespoke solutions. Using state-of-the-art computer-controlled routers, we carve intricate 3D geometric reliefs, waves, mandalas, and custom corporate branding directly into high-density MDF or solid wood panels.\n\nThese panels are sanded and finished in premium Duco paint, metallic lacquers, or natural stains to match your design perfectly. We also integrate concealed slot channels for behind-panel LED backlighting to illuminate the carved patterns."
      }
    ]
  }
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
