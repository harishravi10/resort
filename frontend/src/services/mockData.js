// ====================================================================
// AURELIA RESORT & NATURE RETREAT — HIGH-FIDELITY DATASET
// ====================================================================

export const INITIAL_ROOMS = [
  {
    id: "b0000000-0000-0000-0000-000000000001",
    name: "Ocean Villa",
    subtitle: "Cantilevered over the Azure Barrier Reef",
    description: "Perched gracefully above the azure shoreline, the Ocean Villa offers seamless indoor-outdoor living with a private infinity plunge pool, expansive teak sundeck, and floor-to-ceiling glass gazing into the turquoise sea. Enjoy direct staircase descent into tranquil lagoon waters.",
    roomType: "Villa",
    pricePerNight: 35000,
    capacity: 2,
    sizeSqft: 1450,
    viewType: "Direct Ocean View",
    imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85"
    ],
    amenities: [
      "Private Plunge Pool",
      "King Canopy Bed",
      "Marble Rain Shower",
      "Bose Surround System",
      "24/7 Dedicated Butler",
      "Curated Wine Cellar",
      "Direct Reef Ladder",
      "Dyson Supersonic Care"
    ],
    available: true,
    rating: 4.98,
    reviewsCount: 42,
    hotspots: [
      { id: "pool", label: "Private Infinity Pool", desc: "10-meter temperature-controlled saltwater plunge overlooking the open horizon." },
      { id: "bed", label: "Master King Suite", desc: "Handcrafted teak frame draped in organic 1000-thread Egyptian cotton." },
      { id: "balcony", label: "Lagoon Sundeck", desc: "Overwater hammock nets with unobstructed 180° sunset vistas." },
      { id: "bath", label: "Volcanic Stone Bath", desc: "Free-standing granite soaking tub with organic artisanal bath salts." }
    ]
  },
  {
    id: "b0000000-0000-0000-0000-000000000002",
    name: "Forest Sanctuary Villa",
    subtitle: "Enveloped in Ancient Rainforest Canopy",
    description: "Nestled deep within our ancient tropical rainforest canopy. Savor secluded tranquility with birdsong, private heated volcanic rock pool, outdoor rainforest shower, handcrafted teak interiors, and serene mist rolling off emerald peaks.",
    roomType: "Villa",
    pricePerNight: 28000,
    capacity: 2,
    sizeSqft: 1300,
    viewType: "Rainforest Canopy",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1600&q=85"
    ],
    amenities: [
      "Heated Volcanic Pool",
      "Outdoor Granite Tub",
      "Rainforest Balcony",
      "Botanical Aromatherapy",
      "Stargazing Telescope",
      "Illy Espresso Bar"
    ],
    available: true,
    rating: 4.95,
    reviewsCount: 38,
    hotspots: [
      { id: "balcony", label: "Canopy Deck", desc: "Elevated timber deck level with tropical bird perches and mist." },
      { id: "bath", label: "Rainforest Shower", desc: "Outdoor twin rainfall shower framed by living orchids and ferns." }
    ]
  },
  {
    id: "b0000000-0000-0000-0000-000000000003",
    name: "Presidential Ocean Pavilion",
    subtitle: "The Ultimate Architectural Masterpiece",
    description: "The pinnacle of Aurelia architecture. Spanning two private levels with 270-degree panorama of the cliffs and sea, 25-meter private infinity pool, dedicated 24-hour private chef & butler, helipad access, and private yacht jetty.",
    roomType: "Presidential",
    pricePerNight: 75000,
    capacity: 6,
    sizeSqft: 3800,
    viewType: "Panoramic Ocean & Cliff",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85"
    ],
    amenities: [
      "25m Private Infinity Pool",
      "24/7 Dedicated Butler",
      "Private Master Chef",
      "Private Seaplane / Helipad Transfer",
      "Steinway & Sons Grand Piano",
      "Private In-Villa Spa Suite"
    ],
    available: true,
    rating: 5.00,
    reviewsCount: 29,
    hotspots: [
      { id: "pool", label: "Olympic-Length Infinity Pool", desc: "Cantilevered 25m saltwater pool hovering above private cove." },
      { id: "dining", label: "Private Dining Terrace", desc: "Custom marble dining table seating 10 with dedicated chef grill." },
      { id: "bed", label: "Presidential Master Suite", desc: "Panoramic ocean bedroom with walk-in dressing room and sauna." }
    ]
  },
  {
    id: "b0000000-0000-0000-0000-000000000004",
    name: "Sunset Water Pavilion",
    subtitle: "Overwater Seclusion with Private Glass Portals",
    description: "Suspended over crystal-clear coral shallows with private glass floor viewing panels, direct ocean swimming ladder, overwater hammock nets, and unobstructed sunset vistas every evening.",
    roomType: "Villa",
    pricePerNight: 42000,
    capacity: 2,
    sizeSqft: 1600,
    viewType: "Sunset Lagoon View",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85"
    ],
    amenities: [
      "Overwater Net Hammock",
      "Glass Floor Lagoon Portal",
      "Private Sunset Sundeck",
      "Vintage Champagne Bar",
      "Complimentary Snorkeling Equipment"
    ],
    available: true,
    rating: 4.96,
    reviewsCount: 31
  },
  {
    id: "b0000000-0000-0000-0000-000000000005",
    name: "Cliffside Panoramic Suite",
    subtitle: "Carved into Volcanic Granite Heights",
    description: "Carved into the volcanic granite cliffs rising 80 meters above the roaring surf. Features an open-air stone terrace, private heated jacuzzi, and uninterrupted horizons where ocean meets the sky.",
    roomType: "Suite",
    pricePerNight: 38000,
    capacity: 2,
    sizeSqft: 1500,
    viewType: "High Cliff & Ocean",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85"
    ],
    amenities: [
      "Cliffside Heated Jacuzzi",
      "Fire Pit Lounge",
      "Bespoke Mixology Station",
      "Astronomical Telescope",
      "Custom Daybeds"
    ],
    available: true,
    rating: 4.94,
    reviewsCount: 25
  },
  {
    id: "b0000000-0000-0000-0000-000000000006",
    name: "Canopy Treehouse Haven",
    subtitle: "Elevated Living in the Wild Ironwoods",
    description: "Elevated high among wild ironwood branches. Sustainable luxury architecture blending raw organic timbers with opulent Belgian linens, copper soaking tub, and aerial walkway connecting to a private meditation deck.",
    roomType: "Suite",
    pricePerNight: 31000,
    capacity: 2,
    sizeSqft: 1150,
    viewType: "High Forest Canopy",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85"
    ],
    amenities: [
      "Hand-beaten Copper Tub",
      "Aerial Meditation Walkway",
      "Suspended Stargazing Net",
      "Artisanal Herbal Apothecary",
      "Personal Wildlife Guide"
    ],
    available: true,
    rating: 4.92,
    reviewsCount: 19
  },
  {
    id: "b0000000-0000-0000-0000-000000000007",
    name: "Royal Coral Residence",
    subtitle: "A Private Shoreline Sanctuary for Families",
    description: "An expansive 3-bedroom compound with private white sand beachfront, dual master suites, private lagoon access, enclosed tropical botanical courtyard, and personal electric golf buggy.",
    roomType: "Pavilion",
    pricePerNight: 62000,
    capacity: 6,
    sizeSqft: 2900,
    viewType: "Direct Beachfront",
    imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=85"
    ],
    amenities: [
      "Direct Private Beach Access",
      "Dual Plunge Pools",
      "Private Electric Buggy",
      "Family Screening Salon",
      "Dedicated Butler Service"
    ],
    available: true,
    rating: 4.99,
    reviewsCount: 27
  },
  {
    id: "b0000000-0000-0000-0000-000000000008",
    name: "Emerald Ridge Penthouse",
    subtitle: "Commanding Highest Elevation of Aurelia",
    description: "Commanding the highest elevation of Aurelia Ridge. 360-degree views encompassing mist-draped volcanic peaks and the boundless Indian Ocean. Features cantilevered glass infinity pool and private sauna.",
    roomType: "Presidential",
    pricePerNight: 68000,
    capacity: 4,
    sizeSqft: 3200,
    viewType: "Mountain & Sea 360°",
    imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=85"
    ],
    amenities: [
      "Cantilevered Glass Pool",
      "Panoramic Cedar Sauna",
      "Private Sommelier Cellar",
      "Executive Observation Desk",
      "VIP Seaplane Landing"
    ],
    available: true,
    rating: 4.97,
    reviewsCount: 22
  }
];

export const INITIAL_RESTAURANTS = [
  {
    id: "c0000000-0000-0000-0000-000000000001",
    name: "Azure",
    tagline: "Fine Dining Over Phosphorescent Waters",
    description: "Overlooking the phosphorescent waves, Azure presents Michelin-starred modern coastal gastronomy with wild-caught seafood, hand-harvested ocean succulents, and vintage champagne pairings.",
    cuisine: "Modern Coastal & Fine Dining",
    timings: "18:30 – 23:00",
    dressCode: "Resort Elegant / Semi-Formal",
    featuredDish: "Glacier 51 Toothfish with Saffron Consommé & Sea Succulents",
    chef: "Executive Chef Jean-Luc Laurent (3 Michelin Stars)",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85",
    menuHighlights: [
      { name: "Wild Turbot Crudo", desc: "Finger lime, kelp oil, sea fennel crystals", price: "₹3,200" },
      { name: "Smoked Oscietra Caviar", desc: "Brioche mousseline, crème fraîche, chive pollen", price: "₹7,800" },
      { name: "A5 Kagoshima Wagyu", desc: "Black truffle glaze, charred allium puree", price: "₹8,500" },
      { name: "Madagascan Vanilla Cloud", desc: "Gold leaf, passion fruit sorbet, tonka bean", price: "₹2,100" }
    ]
  },
  {
    id: "c0000000-0000-0000-0000-000000000002",
    name: "Terra",
    tagline: "Organic Farm-to-Table in the Permaculture Grove",
    description: "Set inside our lush 4-acre organic permaculture orchard. Dishes crafted entirely with estate-harvested heirloom produce, wild mountain truffles, and cold-pressed single estate olive oils.",
    cuisine: "Organic Farm-to-Table & Botanical",
    timings: "12:00 – 16:00 | 19:00 – 22:30",
    dressCode: "Smart Casual",
    featuredDish: "Wood-Fired Morel Risotto with Fermented Wild Berry Reduction",
    chef: "Chef Ananya Sen (Pioneer of Biodynamic Gastronomy)",
    imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=85",
    menuHighlights: [
      { name: "Heirloom Tomato Carpaccio", desc: "Cultured almond ricotta, green coriander nectar", price: "₹2,400" },
      { name: "Earthy Morel Risotto", desc: "Estate parmigiano broth, pine nut emulsion", price: "₹3,600" },
      { name: "Charred Romanesco Steak", desc: "Smoked macadamia puree, wild herb chimichurri", price: "₹2,800" },
      { name: "Aurelia Honey Parfait", desc: "Raw honeycomb, lavender gel, crisp bee pollen", price: "₹1,800" }
    ]
  },
  {
    id: "c0000000-0000-0000-0000-000000000003",
    name: "Luna",
    tagline: "Barefoot Beachside Grill & Raw Bar",
    description: "Intimate barefoot beachside dining where torchlight flickers along golden sands. Signature ceviches, fresh island oysters, and botanical mixology curated under starry skies.",
    cuisine: "Beachside Grill & Raw Bar",
    timings: "11:00 – 00:00",
    dressCode: "Island Chic / Barefoot",
    featuredDish: "Cured Yellowfin Tartare with Calamansi Pearls & Coconut Smoke",
    chef: "Chef Mateo Cruz",
    imageUrl: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1600&q=85",
    menuHighlights: [
      { name: "Pacific Oyster Flight", desc: "Green tabasco granita, ponzu pearls", price: "₹4,200" },
      { name: "Truffled Lobster Roll", desc: "Warm milk brioche, tarragon butter", price: "₹4,800" },
      { name: "Wood-Grilled King Prawns", desc: "Chimichurri blanco, charred lime", price: "₹3,900" },
      { name: "Coconut Charcoal Gelato", desc: "Smoked sea salt, gold flake wafer", price: "₹1,600" }
    ]
  },
  {
    id: "c0000000-0000-0000-0000-000000000004",
    name: "Ember",
    tagline: "Artisanal Charcoal & Robata Firecraft",
    description: "Ancient open-flame cooking elevated to high art. Prime Wagyu beef, smoked rock lobster, and robata skewers grilled over aromatic rambutan charcoal logs.",
    cuisine: "Artisanal Barbecue & Robata",
    timings: "17:30 – 23:30",
    dressCode: "Resort Casual",
    featuredDish: "A5 Olive Wagyu with Smoked Sea Salt & Black Garlic Glaze",
    chef: "Master Grillier Kenji Takahashi",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85",
    menuHighlights: [
      { name: "Yakitori Duck Breast", desc: "Binchotan charred, pickled plum reduction", price: "₹2,800" },
      { name: "Smoked Rock Lobster", desc: "Miso garlic butter, charred scallions", price: "₹6,500" },
      { name: "45-Day Dry Aged Ribeye", desc: "Bone marrow glaze, smoked sea salt", price: "₹7,200" },
      { name: "Charred Pineapple Soufflé", desc: "Dark rum flambé, coconut cream", price: "₹1,900" }
    ]
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: "d0000000-0000-0000-0000-000000000001",
    name: "PADI Coral Sanctuary Scuba",
    description: "Descend into untouched marine biodiversity with our certified dive masters to explore vibrant coral pinnacles, manta ray stations, and sea turtle lagoons.",
    price: 8500,
    duration: "3.5 Hours",
    category: "Marine Adventure",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "d0000000-0000-0000-0000-000000000002",
    name: "Glass-Bottom Kayak Discovery",
    description: "Glide across crystal-clear lagoon lagoons in transparent illuminated kayaks, observing vibrant coral gardens and stingrays beneath your feet.",
    price: 4500,
    duration: "2 Hours",
    category: "Water Sports",
    imageUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cf961?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "d0000000-0000-0000-0000-000000000003",
    name: "Sunset Catamaran Yacht Cruise",
    description: "Charter our 52-foot luxury catamaran for golden hour sailing with Krug vintage champagne, canapés, and playful dolphin pods along the barrier reef.",
    price: 18000,
    duration: "3 Hours",
    category: "Luxury Sailing",
    imageUrl: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "d0000000-0000-0000-0000-000000000004",
    name: "Volcanic Peak Sunrise Trek",
    description: "An unforgettable guided trek up the resort ridge to greet the dawn above the cloud blanket, followed by a gourmet alpine breakfast hamper.",
    price: 6000,
    duration: "4 Hours",
    category: "Mountain Trek",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "d0000000-0000-0000-0000-000000000005",
    name: "Cliffside Sound Bath & Yoga",
    description: "Harmonize mind and spirit on our teak cliff pavilion overlooking roaring ocean swells, with Tibetan singing bowls and restorative Hatha guidance.",
    price: 3500,
    duration: "90 Mins",
    category: "Wellness",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "d0000000-0000-0000-0000-000000000006",
    name: "Private Sandbank Candlelit Dinner",
    description: "A private white-sand islet reserved entirely for two. 5-course bespoke menu prepared by private chef, surrounded by 100 gentle candle lanterns.",
    price: 25000,
    duration: "4 Hours",
    category: "Romantic Experience",
    imageUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85"
  }
];

export const INITIAL_SPA_TREATMENTS = [
  {
    id: "spa-1",
    name: "Ayurvedic Herbal Poultice Abhyanga",
    description: "Warm herbal compresses infused with wild camphor, ginger, and sesame oils to release deep muscular tension and awaken cellular vitality.",
    duration: "90 Mins",
    price: 8500,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "spa-2",
    name: "Thalassotherapy Marine Mineral Soak",
    description: "Immersion in heated nutrient-rich seawater drawn from the deep trench, rich in magnesium, followed by micronized algae cocoon wrap.",
    duration: "75 Mins",
    price: 7200,
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "spa-3",
    name: "Volcanic Hot Stone Therapy",
    description: "Smooth basalt stones heated in aromatic oils placed along meridian pathways for intense somatic release and emotional equilibrium.",
    duration: "105 Mins",
    price: 9800,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "spa-4",
    name: "Himalayan Cedar & Eucalyptus Sauna",
    description: "Private Nordic infrared cedar suite with cascading thermal showers and crushed eucalyptus crystal steam infusions.",
    duration: "60 Mins",
    price: 4500,
    image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1200&q=85"
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "f0000000-0000-0000-0000-000000000001",
    userName: "Harish Kumar",
    userLocation: "Bengaluru, India",
    rating: 5,
    comment: "Aurelia is truly beyond description. The Ocean Villa plunges right into the marine sanctuary. Waking up to dolphins swimming past your balcony is a transformative experience.",
    date: "2 days ago"
  },
  {
    id: "f0000000-0000-0000-0000-000000000002",
    userName: "Elena Rostova",
    userLocation: "Zurich, Switzerland",
    rating: 5,
    comment: "World-class hospitality. Azure restaurant serves the finest seafood I have tasted anywhere in the world. The architecture feels like an organic extension of nature.",
    date: "5 days ago"
  },
  {
    id: "f0000000-0000-0000-0000-000000000003",
    userName: "Lord Sebastian Sterling",
    userLocation: "London, UK",
    rating: 5,
    comment: "The Presidential Pavilion provides unmatched seclusion and discretion. From the helicopter greeting to private sunset cruises, Aurelia sets the benchmark for ultra-luxury.",
    date: "10 days ago"
  },
  {
    id: "f0000000-0000-0000-0000-000000000004",
    userName: "Dr. Marcus Vance",
    userLocation: "San Francisco, USA",
    rating: 5,
    comment: "The sound bath yoga on the granite cliffs and the Ayurvedic thalassotherapy erased months of fatigue. We booked our return stay before even checking out.",
    date: "2 weeks ago"
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: "AUR-892147",
    userId: "a0000000-0000-0000-0000-000000000002",
    userName: "Harish Kumar",
    userEmail: "harish@example.com",
    roomId: "b0000000-0000-0000-0000-000000000001",
    roomName: "Ocean Villa",
    roomType: "Villa",
    roomImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85",
    checkIn: "2026-11-10",
    checkOut: "2026-11-14",
    guests: 2,
    totalPrice: 140000,
    status: "CONFIRMED",
    specialRequests: "Airport seaplane transfer requested, chilled Krug champagne upon arrival",
    createdAt: "2026-10-06T10:30:00Z"
  },
  {
    id: "AUR-784112",
    userId: "a0000000-0000-0000-0000-000000000002",
    userName: "Harish Kumar",
    userEmail: "harish@example.com",
    roomId: "b0000000-0000-0000-0000-000000000002",
    roomName: "Forest Sanctuary Villa",
    roomType: "Villa",
    roomImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85",
    checkIn: "2026-09-12",
    checkOut: "2026-09-15",
    guests: 2,
    totalPrice: 84000,
    status: "COMPLETED",
    specialRequests: "Anniversary celebration setup with candlelit floral pathway",
    createdAt: "2026-08-20T14:15:00Z"
  }
];

export const INITIAL_USERS = [
  {
    id: "a0000000-0000-0000-0000-000000000001",
    name: "Admin Concierge",
    email: "admin@aureliaresort.com",
    phone: "+91 98765 43210",
    role: "ADMIN",
    tier: "Imperial Admin",
    createdAt: "2026-01-01T00:00:00Z",
    totalBookings: 0
  },
  {
    id: "a0000000-0000-0000-0000-000000000002",
    name: "Harish Kumar",
    email: "harish@example.com",
    phone: "+91 99887 76655",
    role: "USER",
    tier: "Sovereign Resident",
    createdAt: "2026-08-15T09:30:00Z",
    totalBookings: 2
  },
  {
    id: "a0000000-0000-0000-0000-000000000003",
    name: "Elena Rostova",
    email: "elena.rostova@example.com",
    phone: "+41 79 123 4567",
    role: "USER",
    tier: "Emerald Tier",
    createdAt: "2026-09-02T14:20:00Z",
    totalBookings: 1
  },
  {
    id: "a0000000-0000-0000-0000-000000000004",
    name: "Lord Sebastian Sterling",
    email: "sebastian@sterling.co.uk",
    phone: "+44 20 7946 0912",
    role: "USER",
    tier: "Sovereign Resident",
    createdAt: "2026-09-18T11:45:00Z",
    totalBookings: 1
  },
  {
    id: "a0000000-0000-0000-0000-000000000005",
    name: "Dr. Marcus Vance",
    email: "marcus.vance@stanford.edu",
    phone: "+1 415 555 0198",
    role: "USER",
    tier: "Platinum Tier",
    createdAt: "2026-09-25T16:10:00Z",
    totalBookings: 1
  }
];
