import { Category, Product } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'tables',
    name: 'Tables',
    iconName: 'Table',
    image: '/images/categories/grace sports table.png',
    description: 'ITTF standard competition, academy & club foldable tables'
  },
  {
    id: 'balls',
    name: 'Balls',
    iconName: 'CircleDot',
    image: '/images/categories/grace balls.png',
    description: '144-pack seamless ABS competition Gold, Unique & Practice balls'
  },
  {
    id: 'sportswear',
    name: 'SportsWear',
    iconName: 'Shirt',
    image: '/images/categories/grace sportwear.png',
    description: 'Custom sublimated lightweight dry-fit jerseys for academies & clubs'
  },
  {
    id: 'arena',
    name: 'Arena',
    iconName: 'Shield',
    image: '/images/categories/grace arena.jpg',
    description: 'Surround barriers, referee podiums & court equipment'
  },
  {
    id: 'flooring',
    name: 'Flooring',
    iconName: 'Layers',
    image: '/images/categories/grace flooring.jpeg',
    description: 'Shock-absorbing anti-skid embossed PVC sports academy matting'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    iconName: 'Wrench',
    image: '/images/categories/grace assessories.png',
    description: 'Ball pickers, returnboards, catcher nets, stands & heavy covers'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'gs-sonic-pro',
    name: 'GS SONIC PRO MODEL',
    category: 'tables',
    price: 65000,
    originalPrice: 72000,
    rating: 5.0,
    reviewsCount: 38,
    inStock: true,
    featured: true,
    badge: 'CHAMPIONSHIP SERIES',
    isPopular: true,
    image: '/images/products/table-sonic-pro.jpg',
    galleryImages: [
      '/images/products/table-sonic-pro.jpg',
      '/images/products/table-sonic-x.jpg'
    ],
    shortDescription: 'Championship-grade 25mm black top with heavy-duty frame and high-load lockable wheels.',
    description: 'The GS Sonic Pro Model is the crowning jewel of Grace Sports table engineering. Built with a 25mm ultra-dense black glare-free top surface engineered for uniform true-bounce across all court angles. Designed for national tournaments, state leagues, and high-performance academies.',
    specifications: [
      { label: 'Top Thickness', value: '25 mm Premium Anti-Glare Black Top' },
      { label: 'Frame Size', value: '25 × 50 mm Heavy Duty Steel' },
      { label: 'Assembly Size', value: '50 × 50 mm High Gauge Tube' },
      { label: 'Wheel Size', value: '100 mm Multi-Directional Lockable Wheels' },
      { label: 'Net System', value: 'Comes with High Precision TT Net & Post Clamp' },
      { label: 'Finish', value: 'Scratch-Proof Industrial Matte Powder Coating' },
      { label: 'Foldability', value: 'Dual-Wing Independent Folding with Solo Playback Mode' }
    ],
    dimensions: '274 cm × 152.5 cm × 76 cm',
    weight: '128 kg'
  },
  {
    id: 'gs-sonic-x',
    name: 'GS SONIC X MODEL',
    category: 'tables',
    price: 60000,
    originalPrice: 66000,
    rating: 4.9,
    reviewsCount: 26,
    inStock: true,
    featured: true,
    badge: 'PRO SERIES',
    image: '/images/products/table-sonic-x.jpg',
    shortDescription: 'Tournament 25mm top engineered for precision club play and fast top-spin rallies.',
    description: 'Built for intense training academies that demand professional tournament specs without compromise. Features heavy chassis engineering with quick-lock latch safety and smooth glide transport.',
    specifications: [
      { label: 'Top Thickness', value: '25 mm High-Density Matte Black Top' },
      { label: 'Frame Size', value: '25 × 50 mm Reinforced Under-frame' },
      { label: 'Assembly Size', value: '50 × 50 mm Tubular Steel' },
      { label: 'Wheel Size', value: '75 mm Industrial Bearings' },
      { label: 'Included Net', value: 'Tournament Grade TT Net' },
      { label: 'Safety', value: 'Integrated Dual Gravity Lock & Latch' }
    ],
    dimensions: '274 cm × 152.5 cm × 76 cm',
    weight: '122 kg'
  },
  {
    id: 'gs-professional',
    name: 'GS PROFESSIONAL MODEL',
    category: 'tables',
    price: 55000,
    originalPrice: 62000,
    rating: 5.0,
    reviewsCount: 42,
    inStock: true,
    featured: true,
    badge: 'BEST SELLER',
    isPopular: true,
    image: '/images/products/table-professional.jpg',
    shortDescription: 'Iconic Olympic Blue 25mm top with commercial-grade powder-coated chassis.',
    description: 'The national standard across prestigious sports academies in India. The GS Professional Model is acclaimed by coaches for longevity, resilient edge banding, and true consistent bounce under continuous multi-hour drills.',
    specifications: [
      { label: 'Top Thickness', value: '25 mm Olympic Blue Glare-Resistant Top' },
      { label: 'Frame Size', value: '25 × 50 mm High Strength Steel' },
      { label: 'Assembly Size', value: '50 × 50 mm Heavy Stance' },
      { label: 'Wheel Size', value: '100 mm Rubber Castor Wheels' },
      { label: 'Accessories', value: 'Supplied with TT Net & Clamps' },
      { label: 'Coating', value: 'Anti-Rust Electrostatic Powder Coating' }
    ],
    dimensions: '274 cm × 152.5 cm × 76 cm',
    weight: '125 kg'
  },
  {
    id: 'gs-tournament',
    name: 'GS TOURNAMENT MODEL',
    category: 'tables',
    price: 50000,
    originalPrice: 56000,
    rating: 4.8,
    reviewsCount: 19,
    inStock: true,
    badge: 'TOURNAMENT',
    image: '/images/products/table-tournament.jpg',
    shortDescription: '22-25mm competition top with stable stance and quick setup mechanism.',
    description: 'Built for district and inter-school championships. Quick assembly, smooth foldaway profile, and reliable playing characteristics.',
    specifications: [
      { label: 'Top Thickness', value: '22-25 mm Premium Composite Board' },
      { label: 'Frame Size', value: '20 × 40 mm Steel' },
      { label: 'Wheel Size', value: '75 mm With Brakes' },
      { label: 'Playback Mode', value: 'Supported' }
    ],
    dimensions: '274 cm × 152.5 cm × 76 cm',
    weight: '110 kg'
  },
  {
    id: 'gs-club-model',
    name: 'GS CLUB MODEL',
    category: 'tables',
    price: 43000,
    originalPrice: 48000,
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
    badge: 'ACADEMY FAVORITE',
    image: '/images/products/table-club-model.jpg',
    shortDescription: '18mm high density top with 25x50mm frame, ideal for clubs and institutions.',
    description: 'Perfect balance of performance and budget for table tennis clubs, universities, and training centres. Equipped with durable 50mm wheels, TT Net, and powder-coated textured frame.',
    specifications: [
      { label: 'Top Thickness', value: '18 mm Solid HDF Playing Surface' },
      { label: 'Frame Size', value: '25 × 50 mm High Strength' },
      { label: 'Assembly Size', value: '50 × 50 mm Heavy Stance' },
      { label: 'Wheel Size', value: '50 mm Smooth Rollers' },
      { label: 'Net', value: 'Comes with TT Net included' },
      { label: 'Finish', value: 'Powder Coating Texture' }
    ],
    dimensions: '274 cm × 152.5 cm × 76 cm',
    weight: '98 kg'
  },
  {
    id: 'gs-fun-table',
    name: 'GS FUN TABLE',
    category: 'tables',
    price: 15000,
    originalPrice: 18000,
    rating: 4.7,
    reviewsCount: 15,
    inStock: true,
    badge: 'RECREATION',
    image: '/images/products/table-fun.jpg',
    shortDescription: 'Compact recreational foldable table for home, office breakrooms & kids.',
    description: 'Quick fold, portable, space-saving design that lets you enjoy ping pong anywhere without needing dedicated tournament hall space.',
    specifications: [
      { label: 'Type', value: 'Compact Space-Saver' },
      { label: 'Portability', value: 'Foldable Legs with Handle' },
      { label: 'Includes', value: 'Compact Net & Post Set' }
    ],
    weight: '35 kg'
  },
  {
    id: 'three-star-gold',
    name: 'THREE STAR GOLD 40+',
    category: 'balls',
    price: 9600,
    originalPrice: 11000,
    rating: 5.0,
    reviewsCount: 54,
    inStock: true,
    featured: true,
    badge: 'TOURNAMENT MATCH',
    isPopular: true,
    image: '/images/products/balls-3star-gold.jpg',
    shortDescription: 'Pack of 144 competition match balls, seamless ABS plastic with flawless roundness.',
    description: 'Tournament-grade match balls manufactured to the strictest international competition tolerances. Each ball undergoes precision spherical testing, uniform wall-thickness inspection, and weight calibration for zero-wobble flights.',
    specifications: [
      { label: 'Quantity', value: 'Box of 144 Balls' },
      { label: 'Diameter', value: '40+ mm' },
      { label: 'Material', value: 'Non-Celluloid Seamless ABS' },
      { label: 'Standard', value: 'ITTF Standards Compliant' },
      { label: 'Color', value: 'Competition White' }
    ]
  },
  {
    id: 'two-star-unique',
    name: 'TWO STAR UNIQUE 40+',
    category: 'balls',
    price: 6000,
    originalPrice: 7000,
    rating: 4.8,
    reviewsCount: 29,
    inStock: true,
    badge: 'CLUB LEVEL',
    image: '/images/products/balls-2star-unique.jpg',
    shortDescription: 'Pack of 144 high-durability training balls for multi-ball drills and clubs.',
    description: 'Engineered for high-frequency feeder drills, robot practice, and club sessions. Unrivaled crack resistance and prolonged bounce consistency.',
    specifications: [
      { label: 'Quantity', value: 'Pack of 144 Balls' },
      { label: 'Diameter', value: '40+ mm' },
      { label: 'Grade', value: '2-Star Semi-Match / Academy' }
    ]
  },
  {
    id: 'one-star-practice',
    name: 'ONE STAR PRACTICE 40+',
    category: 'balls',
    price: 3600,
    originalPrice: 4200,
    rating: 4.8,
    reviewsCount: 47,
    inStock: true,
    badge: 'BEST VALUE',
    image: '/images/products/balls-1star-practice.jpg',
    shortDescription: 'Pack of 144 premium training balls for multi-ball feeder drills and schools.',
    description: 'The most cost-effective bulk ball solution for coaches running intensive daily multi-ball training drills.',
    specifications: [
      { label: 'Quantity', value: 'Pack of 144' },
      { label: 'Diameter', value: '40+ mm' },
      { label: 'Quality', value: 'Premium Academy Practice' }
    ]
  },
  {
    id: 'portable-ball-catcher-net',
    name: 'GS PORTABLE BALL CATCHER NET',
    category: 'accessories',
    price: 20000,
    originalPrice: 24000,
    rating: 4.9,
    reviewsCount: 16,
    inStock: true,
    featured: true,
    badge: 'COACH ESSENTIAL',
    image: '/images/products/accessory-catcher-net.jpg',
    shortDescription: 'Large catch net for multi-ball drills with bottom funnel opening into collection basket.',
    description: 'Attaches securely to the back of any standard TT table or stands independently on lockable castors. Captures 98% of drill balls and routes them directly into a waiting ball caddy.',
    specifications: [
      { label: 'Structure', value: 'Heavy Duty Powder Coated Tubular Frame' },
      { label: 'Mesh', value: 'High Density Tear-Proof Mesh' },
      { label: 'Funnel', value: 'Bottom Velcro Drain for Quick Collection' },
      { label: 'Mobility', value: '4 Swivel Caster Wheels' }
    ]
  },
  {
    id: 'gs-returnboard',
    name: 'GS RETURNBOARD',
    category: 'accessories',
    price: 18000,
    originalPrice: 21000,
    rating: 4.9,
    reviewsCount: 22,
    inStock: true,
    badge: 'SOLO DRILL',
    image: '/images/products/accessory-returnboard.jpg',
    shortDescription: 'Multi-rubber angle-adjustable solo returnboard on mobile rolling stand.',
    description: 'Allows players to practice relentless top-spin loop drives, forehand counters, and blocking rallies solo without needing a training partner.',
    specifications: [
      { label: 'Surface', value: 'Multi-Rubber Table Tennis Block Panel' },
      { label: 'Adjustment', value: 'Micro-Angle Tilt Clamps' },
      { label: 'Stand', value: 'Height Adjustable Steel Trolley' }
    ]
  },
  {
    id: 'gs-steel-balls-holder',
    name: 'GS STEEL BALLS HOLDER',
    category: 'accessories',
    price: 6000,
    originalPrice: 7500,
    rating: 4.9,
    reviewsCount: 34,
    inStock: true,
    badge: 'HEAVY DUTY',
    image: '/images/products/accessory-steel-holder.jpg',
    shortDescription: 'Stainless steel multi-ball stand on caster wheels, holds 250+ balls comfortably.',
    description: 'Ergonomically positioned at optimal table height for coach multi-ball feeding drills. Stainless steel construction with padded bottom.',
    specifications: [
      { label: 'Material', value: 'Reinforced Stainless Steel' },
      { label: 'Capacity', value: '250 to 300 Balls' },
      { label: 'Wheels', value: 'Lockable Caster Wheels' }
    ]
  },
  {
    id: 'gs-balls-holder',
    name: 'GS BALLS HOLDER (BASKET)',
    category: 'accessories',
    price: 5000,
    originalPrice: 6200,
    rating: 4.8,
    reviewsCount: 18,
    inStock: true,
    image: '/images/products/accessory-balls-holder.jpg',
    shortDescription: 'Academy multi-ball caddy with durable fabric catch basket on tripod trolley.',
    description: 'Lightweight, easily transportable multi-ball basket designed for coaches moving between multiple tables during training camps.',
    specifications: [
      { label: 'Capacity', value: '200+ Balls' },
      { label: 'Frame', value: 'Foldable Tripod Steel Base' }
    ]
  },
  {
    id: 'gs-ball-picker',
    name: 'GS BALL PICKER (ROLLER)',
    category: 'accessories',
    price: 5000,
    originalPrice: 6000,
    rating: 5.0,
    reviewsCount: 41,
    inStock: true,
    badge: 'BACK SAVER',
    isPopular: true,
    image: '/images/products/accessory-ball-picker.jpg',
    shortDescription: 'Telescopic handle roller basket for picking up hundreds of balls effortlessly in seconds.',
    description: 'Essential for every table tennis academy. Simply roll over balls to collect up to 120 balls without ever bending your back.',
    specifications: [
      { label: 'Handle', value: 'Adjustable Telescopic Aluminum Shaft' },
      { label: 'Drum', value: 'High Elasticity Wire Roller' },
      { label: 'Capacity', value: '100-120 Balls Per Fill' }
    ]
  },
  {
    id: 'gs-table-net-clamp',
    name: 'GS TOURNAMENT TABLE NET CLAMP',
    category: 'accessories',
    price: 2800,
    originalPrice: 3500,
    rating: 4.9,
    reviewsCount: 23,
    inStock: true,
    image: '/images/products/accessory-net-clamp.jpg',
    shortDescription: 'Heavy-duty spring clamp tournament net post set with height & tension adjusters.',
    description: 'Rubber-padded clamps prevent table surface scratching. Precision gauge chain and string tensioner ensure ITTF standard 15.25cm height.',
    specifications: [
      { label: 'Clamp Type', value: 'Heavy Spring Grip Post with Rubber Padding' },
      { label: 'Standard', value: 'Championship Net Gauge Compliant' }
    ]
  },
  {
    id: 'iron-rackets-1kg',
    name: 'IRON RACKETS 1 KG (TRAINING)',
    category: 'accessories',
    price: 2800,
    originalPrice: 3400,
    rating: 4.9,
    reviewsCount: 19,
    inStock: true,
    badge: 'SPECIAL DRILL',
    image: '/images/products/accessory-iron-rackets.jpg',
    shortDescription: 'Cast iron weighted training racket (1 KG) for explosive forearm & wrist stroke development.',
    description: 'Developed by professional strength and conditioning coaches. Shadow stroke practice with this 1kg solid bat builds blazing bat speed and stroke muscle memory.',
    specifications: [
      { label: 'Weight', value: '1.0 KG Solid Weighted Core' },
      { label: 'Grip', value: 'Flared Ergonomic Handle' },
      { label: 'Use', value: 'Shadow Swings, Forearm & Wrist Conditioning' }
    ]
  },
  {
    id: 'gs-table-cover',
    name: 'GS HEAVY DUTY TABLE COVER',
    category: 'accessories',
    price: 1800,
    originalPrice: 2400,
    rating: 4.8,
    reviewsCount: 35,
    inStock: true,
    image: '/images/products/accessory-table-cover.jpg',
    shortDescription: 'Waterproof, dustproof, tear-resistant vinyl cover with corner tie downs.',
    description: 'Custom tailored for 9x5 ft tables in both flat playing configuration and folded storage mode. Shields the table top from moisture and scratches.',
    specifications: [
      { label: 'Fabric', value: 'UV Treated Heavy Waterproof Vinyl' },
      { label: 'Fit', value: 'Universal 9ft × 5ft Competition Tables' }
    ]
  },
  {
    id: 'gs-arena-barrier',
    name: 'GS ARENA SURROUND BARRIER',
    category: 'arena',
    price: 2800,
    originalPrice: 3400,
    rating: 4.9,
    reviewsCount: 27,
    inStock: true,
    featured: true,
    badge: 'ALL IN ONE SPORTS',
    image: '/images/products/arena-barrier.jpg',
    shortDescription: 'Grace Sports royal purple/blue surround barrier for court separation & ball retention.',
    description: 'Signature Grace Sports arena surround barriers. Used across state tournaments to isolate court boxes and maintain ball containment.',
    specifications: [
      { label: 'Dimensions', value: '2.0m or 2.33m length × 70cm height' },
      { label: 'Frame', value: 'Lightweight Steel Tube Interlock' },
      { label: 'Fabric', value: 'High Tension Printed Fabric Cover' }
    ]
  },
  {
    id: 'gs-tt-flooring',
    name: 'GS TOURNAMENT TT FLOORING',
    category: 'flooring',
    price: 120,
    originalPrice: 150,
    rating: 5.0,
    reviewsCount: 14,
    inStock: true,
    badge: 'PER SQ FT',
    image: '/images/products/arena-flooring.jpg',
    shortDescription: 'Shock-absorbing anti-skid embossed PVC court matting for academies & stadiums.',
    description: 'Engineered specifically for table tennis footwork. Provides perfect friction coefficient to prevent slips while offering multi-layer cushion to protect players knees and joints.',
    specifications: [
      { label: 'Thickness', value: '4.5 mm to 6.0 mm Multi-Layer' },
      { label: 'Surface', value: 'Embossed Snakeskin / Cloth Grain Anti-Skid' },
      { label: 'Pricing', value: '₹120 / sq. ft (Custom Roll Sizing Available)' }
    ]
  },
  {
    id: 'gs-custom-sportswear',
    name: 'GRACE SPORTS CUSTOM APPAREL',
    category: 'sportswear',
    price: 850,
    originalPrice: 1200,
    rating: 5.0,
    reviewsCount: 52,
    inStock: true,
    featured: true,
    badge: 'CUSTOM PRINT',
    image: '/images/products/sportswear-custom.jpg',
    shortDescription: 'Custom sublimated dry-fit jerseys tailored for academies, coaches, and state teams.',
    description: 'High-breathability moisture-wicking athletic jerseys. Full custom design integration with your academy logo, player names, and team color schemes.',
    specifications: [
      { label: 'Fabric', value: '160-180 GSM Micro-Poly QuickDry' },
      { label: 'Printing', value: 'Full Sublimation High-Vibrancy Inks' },
      { label: 'Customization', value: 'Free Academy Logo & Player Name inclusion on bulk orders' }
    ]
  },
  {
    id: 'gs-apparel-catalogue',
    name: 'GRACE SPORTS APPARELS CATALOGUE (2024-25)',
    category: 'accessories',
    price: 0,
    originalPrice: 99,
    rating: 5.0,
    reviewsCount: 110,
    inStock: true,
    badge: 'FREE CATALOGUE',
    image: '/images/products/sportswear-catalogue.jpg',
    shortDescription: 'Complete 2024-2025 Grace Sports design lookbook & bulk pricing directory.',
    description: 'Download the comprehensive PDF catalogue showing full tournament specs, table dimensions, color options, and bulk academy price discounts.',
    specifications: [
      { label: 'Format', value: 'Digital PDF + Instant WhatsApp Dispatch' },
      { label: 'Price', value: 'Free for Academies & Coaches' }
    ]
  }
];
