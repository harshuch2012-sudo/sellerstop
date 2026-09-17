import { Product, CategoryInfo } from '../types';

// Original Authentic Studio Photography
import dubaiKunafaImg from '../assets/images/dubai_kunafa_choc_1789658771229.jpg';
import belivitaOudRoyalImg from '../assets/images/belivita_oud_royal_1789658788765.jpg';
import primeHydrationImg from '../assets/images/prime_hydration_ice_1789658805977.jpg';
import takisFuegoImg from '../assets/images/takis_fuego_snack_1789658821534.jpg';
import feastablesImg from '../assets/images/feastables_bar_1789658841938.jpg';
import dairyMilkSilkImg from '../assets/images/dairy_milk_silk_bar_1789659780641.jpg';
import cosrxSnailImg from '../assets/images/cosrx_snail_essence_1789658882350.jpg';
import belivitaVelvetAmberImg from '../assets/images/belivita_velvet_amb_1789658900530.jpg';
import calypsoLemonadeImg from '../assets/images/calypso_ocean_blue_1789658916001.jpg';
import kitkatClassicImg from '../assets/images/kitkat_classic_fingers_1789659796732.jpg';
import beautyJoseonSunImg from '../assets/images/beauty_joseon_sun_1789658982461.jpg';
import belivitaAquaRomaImg from '../assets/images/belivita_aqua_roma_1789659001766.jpg';
import redBullSummerImg from '../assets/images/red_bull_summer_1789659035911.jpg';
import belivitaNoirSantalImg from '../assets/images/belivita_noir_san_1789659053317.jpg';
// Diverse Monster Energy Flavors & Thailand Red Bull
import monsterMangoLocoImg from '../assets/images/monster_mango_loco_1789664808199.jpg';
import monsterPipelinePunchImg from '../assets/images/monster_pipeline_punch_1789664822562.jpg';
import thailandRedBullImg from '../assets/images/thailand_red_bull_1789664835582.jpg';
import monsterUltraWhiteImg from '../assets/images/monster_ultra_white_1789664848745.jpg';

export const BUSINESS_INFO = {
  name: 'SELLERSTOP',
  tagline: 'Imported. Popular. Premium.',
  heroHeading: "DISCOVER WHAT'S TRENDING",
  heroDescription: 'Explore products people are talking about and order directly through SELLERSTOP.',
  owner: 'Ishan Aggarwal',
  location: 'India (Pan-India Express Dispatch)',
  phone: '+91 9953549760',
  phoneRaw: '919953549760',
  instagramHandle: '@sellerstop_',
  instagramUrl: 'https://instagram.com/sellerstop_',
  orderingNotice: 'Order on Call & WhatsApp • Instant Personal Assistance',
  catalogNotice: '100% Curated Viral Beverages, Imported Chocolates & Luxury Perfumes',
};

// Inspiring Curator Thoughts & Quotes from Ishan Aggarwal
export const CURATOR_THOUGHTS = [
  {
    id: 1,
    quote: "Why wait months for international travel when the world's most talked-about sensations can land in your hands within 48 hours?",
    author: "Ishan Aggarwal",
    role: "Founder & Master Curator, SELLERSTOP",
    tag: "The Curation Mindset"
  },
  {
    id: 2,
    quote: "A true viral product isn't a gimmick—it's a cultural artifact. From the audible snap of warm Dubai knafeh chocolate to the 14-hour sillage of Belivita agarwood.",
    author: "Ishan Aggarwal",
    role: "Curator's Manifesto",
    tag: "Authentic Quality"
  },
  {
    id: 3,
    quote: "Fragrance isn't just an accessory; it is an invisible signature. Belivita was formulated for those who leave an indelible presence without uttering a word.",
    author: "Belivita Perfumery Atelier",
    role: "Artisanal Philosophy",
    tag: "Quiet Luxury"
  },
  {
    id: 4,
    quote: "We don't do mass retail shelves. We hand-inspect batch serials, seal fragile items in temperature-regulated wrap, and talk to every buyer personally.",
    author: "SELLERSTOP Concierge",
    role: "Direct Founder Commitment",
    tag: "White Glove Service"
  }
];

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'energy-beverages',
    name: 'Energy & Beverages',
    tagline: 'Imported energy cans, hydration drinks & rare sodas',
    iconName: 'Zap',
    image: primeHydrationImg,
    count: 4,
  },
  {
    id: 'belivita',
    name: 'Belivita Perfumes',
    tagline: 'Artisanal luxury fragrances with magnetic sillage',
    iconName: 'Sparkles',
    image: belivitaOudRoyalImg,
    count: 4,
  },
  {
    id: 'perfumes',
    name: 'Luxury Perfumes',
    tagline: 'Designer decants, Eau de Parfums & Middle-Eastern ouds',
    iconName: 'Flame',
    image: belivitaVelvetAmberImg,
    count: 4,
  },
  {
    id: 'chocolates-snacks',
    name: 'Chocolates & Snacks',
    tagline: 'Viral Dubai kunafa bars, imported chips & treats',
    iconName: 'Cookie',
    image: dubaiKunafaImg,
    count: 4,
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    tagline: 'Korean skincare cult favorites & high-end grooming',
    iconName: 'Heart',
    image: cosrxSnailImg,
    count: 3,
  },
  {
    id: 'imported',
    name: 'Imported Exclusives',
    tagline: 'Directly sourced hard-to-find global drops',
    iconName: 'Globe',
    image: dairyMilkSilkImg,
    count: 6,
  },
  {
    id: 'trending',
    name: 'Trending Products',
    tagline: 'Viral social media sensations and community favorites',
    iconName: 'TrendingUp',
    image: monsterMangoLocoImg,
    count: 8,
  },
];

export const PRODUCTS_DATA: Product[] = [
  // 1. PRIME HYDRATION DRINK
  {
    id: 'prime-hydration-drink',
    name: 'Prime Hydration Drink',
    brand: 'Prime by Logan Paul & KSI',
    category: 'energy-beverages',
    categoryLabel: 'Energy & Beverages',
    shortDescription: '10% Coconut water electrolyte beverage with zero added sugar and intense tropical punch.',
    description: 'Imported directly for high-energy hydration. Infused with BCAAs, antioxidants, and essential electrolytes. One of the most sought-after drinks worldwide.',
    image: primeHydrationImg,
    images: [
      primeHydrationImg,
      calypsoLemonadeImg
    ],
    badges: ['Imported', 'Trending', 'Zero Sugar'],
    isBestSeller: true,
    isTrending: true,
    variants: {
      name: 'Flavors',
      options: ['Ice Pop', 'Meta Moon', 'Blue Raspberry', 'Tropical Punch', 'Strawberry Watermelon'],
    },
    details: {
      origin: 'USA / UK Import',
      size: '500ml Bottle',
      flavorNotes: 'Refreshing fruit blend, electrolyte blast',
      highlights: ['10% Coconut Water', '250mg BCAAs', 'B-Vitamins & Antioxidants'],
    },
  },

  // 2. MONSTER ULTRA WHITE ZERO
  {
    id: 'monster-ultra-white',
    name: 'Monster Energy Ultra White Zero Sugar',
    brand: 'Monster Energy Ultra',
    category: 'energy-beverages',
    categoryLabel: 'Energy & Beverages',
    shortDescription: 'Crisp, refreshing light citrus flavor with zero sugar, zero calories, and tactile frosted textured can.',
    description: 'The global benchmark for zero-calorie sustained energy. Features the legendary Monster energy blend with a lighter, smoother citrus profile in a tactile frosted textured silver can.',
    image: monsterUltraWhiteImg,
    images: [
      monsterUltraWhiteImg,
      monsterPipelinePunchImg,
      monsterMangoLocoImg
    ],
    badges: ['Zero Sugar', 'Original Import', 'Zero Calorie'],
    isBestSeller: true,
    variants: {
      name: 'Edition',
      options: ['Ultra White (Citrus Zero)', 'Mango Loco Juice', 'Pipeline Punch Tropical'],
    },
    details: {
      origin: 'Authentic Overseas Import',
      size: '500ml Can',
      flavorNotes: 'Sparkling sweet-tart crisp citrus with zero sugar',
      highlights: ['160mg Caffeine', 'Taurine, Ginseng & L-Carnitine', 'Zero Sugar & Zero Calories'],
    },
  },

  // 3. RED BULL SUMMER EDITION
  {
    id: 'red-bull-summer-edition',
    name: 'Red Bull Special Summer Edition',
    brand: 'Red Bull',
    category: 'energy-beverages',
    categoryLabel: 'Energy & Beverages',
    shortDescription: 'Rare exotic seasonal release featuring Curuba & Elderflower with alpine taurine.',
    description: 'Imported European batch seasonal Red Bull. Crisp floral sweetness combined with exotic sour curuba fruit to vitalize body and mind.',
    image: redBullSummerImg,
    images: [
      redBullSummerImg,
      monsterUltraWhiteImg
    ],
    badges: ['Limited Edition', 'Imported'],
    isNewArrival: true,
    variants: {
      name: 'Flavor',
      options: ['Curuba Elderflower (Summer)', 'Juneberry (Sea Blue)', 'Apricot Strawberry'],
    },
    details: {
      origin: 'Austria / Europe Import',
      size: '250ml Slim Can',
      flavorNotes: 'Exotic curuba and blooming elderflower notes',
      highlights: ['Alpine Spring Water', 'High quality B-group vitamins', 'Natural sugars'],
    },
  },

  // 4. CALYPSO OCEAN BLUE LEMONADE
  {
    id: 'calypso-ocean-blue-lemonade',
    name: 'Calypso Ocean Blue Lemonade',
    brand: 'Calypso USA',
    category: 'energy-beverages',
    categoryLabel: 'Energy & Beverages',
    shortDescription: 'Real lemon bits with triple-berry flavor in an iconic heavy glass bottle.',
    description: 'The original lemonade maker from Milwaukee, USA. Crafted with authentic fruit bits and natural sugar cane in heavy embossed glass.',
    image: calypsoLemonadeImg,
    images: [
      calypsoLemonadeImg,
      primeHydrationImg
    ],
    badges: ['USA Import', 'Trending'],
    isTrending: true,
    variants: {
      name: 'Style',
      options: ['Ocean Blue (Blueberry/Blackberry)', 'Southern Peach', 'Island Wave', 'Strawberry'],
    },
    details: {
      origin: 'USA',
      size: '473ml Glass Bottle',
      flavorNotes: 'Tangy lemon meets blue raspberry & blackberry',
      highlights: ['Real Lemon Fruit Slices', 'Custom embossed glass', 'Gluten-Free'],
    },
  },

  // 5. BELIVITA OUD ROYAL
  {
    id: 'belivita-oud-royal',
    name: 'Belivita Oud Royal — Extrait de Parfum',
    brand: 'Belivita',
    category: 'belivita',
    categoryLabel: 'Belivita Perfumes',
    shortDescription: 'Saffron-kissed Cambodian agarwood draped in dark leather and smoked Madagascar amber.',
    description: 'The pinnacle of the Belivita collection. Extracted at 35% perfume oil concentration for unmatched all-day longevity and an intoxicating royal trail.',
    image: belivitaOudRoyalImg,
    images: [
      belivitaOudRoyalImg,
      belivitaVelvetAmberImg,
      belivitaNoirSantalImg
    ],
    badges: ['Belivita Signature', 'Best Seller', 'Extrait 35%'],
    isBestSeller: true,
    isBelivita: true,
    variants: {
      name: 'Bottle Size',
      options: ['50ml Luxury Flacon', '100ml Collector Decanter', '10ml Travel Atomizer'],
    },
    details: {
      origin: 'Artisanal Perfumery',
      size: '50ml / 100ml',
      flavorNotes: 'Top: Saffron, Bergamot | Heart: Taif Rose, Smoky Leather | Base: Royal Agarwood, Ambergris',
      highlights: ['14+ Hours Projection', 'Hand-Numbered Batch', 'Heavy Crystal Glass Cap'],
    },
  },

  // 6. BELIVITA VELVET AMBER
  {
    id: 'belivita-velvet-amber',
    name: 'Belivita Velvet Amber',
    brand: 'Belivita',
    category: 'belivita',
    categoryLabel: 'Belivita Perfumes',
    shortDescription: 'Rich bourbon vanilla infused with warm amber resins, roasted tonka bean, and spicy cardamom.',
    description: 'An intimate, cozy, yet unmistakably seductive evening fragrance. Drapes over the skin like velvet with gentle spicy gourmand accents.',
    image: belivitaVelvetAmberImg,
    images: [
      belivitaVelvetAmberImg,
      belivitaOudRoyalImg
    ],
    badges: ['Belivita Luxury', 'Evening Scent'],
    isBelivita: true,
    isTrending: true,
    variants: {
      name: 'Size',
      options: ['50ml Spray', '100ml Spray'],
    },
    details: {
      origin: 'Artisanal Perfumery',
      size: '50ml / 100ml',
      flavorNotes: 'Top: Cardamom, Nutmeg | Heart: Amber Resin, Tonka | Base: Bourbon Vanilla, Benzoin',
      highlights: ['Magnetic Compliment Getter', 'Non-greasy pure oil blend', 'Luxury velvet pouch included'],
    },
  },

  // 7. BELIVITA AQUA DI ROMA
  {
    id: 'belivita-aqua-di-roma',
    name: 'Belivita Aqua Di Roma',
    brand: 'Belivita',
    category: 'belivita',
    categoryLabel: 'Belivita Perfumes',
    shortDescription: 'Crisp Mediterranean citrus, sea salt mineral breeze, and sun-drenched Italian neroli.',
    description: 'Freshness redefined. Captures the invigorating coast of Positano with crystalline aquatic accords and clean woody dry-down for hot Indian summers.',
    image: belivitaAquaRomaImg,
    images: [
      belivitaAquaRomaImg,
      belivitaOudRoyalImg
    ],
    badges: ['Belivita Fresh', 'Summer Essential'],
    isBelivita: true,
    isNewArrival: true,
    variants: {
      name: 'Size',
      options: ['50ml Bottle', '100ml Bottle'],
    },
    details: {
      origin: 'Artisanal Perfumery',
      size: '50ml / 100ml',
      flavorNotes: 'Top: Calabrian Bergamot, Sea Salt | Heart: Neroli, Rosemary | Base: White Musk, Cedarwood',
      highlights: ['High-heat resistant projection', 'Daytime & Office Signature', 'Zero harsh chemical opening'],
    },
  },

  // 8. BELIVITA NOIR SANTAL
  {
    id: 'belivita-noir-santal',
    name: 'Belivita Noir Santal',
    brand: 'Belivita',
    category: 'belivita',
    categoryLabel: 'Belivita Perfumes',
    shortDescription: 'Creamy Australian sandalwood blended with powdery Tuscan iris and crushed peppercorns.',
    description: 'Subtle elegance meets modern luxury. A sophisticated signature fragrance that lingers effortlessly in memory.',
    image: belivitaNoirSantalImg,
    images: [
      belivitaNoirSantalImg,
      belivitaOudRoyalImg
    ],
    badges: ['Belivita Elite', 'New'],
    isBelivita: true,
    variants: {
      name: 'Size',
      options: ['50ml Bottle', '100ml Bottle'],
    },
    details: {
      origin: 'Artisanal Perfumery',
      size: '50ml / 100ml',
      flavorNotes: 'Top: Pink Pepper, Violet Leaf | Heart: Tuscan Iris | Base: Australian Sandalwood, Cashmere Wood',
      highlights: ['Understated Quiet Luxury', 'Unisex Formulation', 'French Mist Atomizer'],
    },
  },

  // 9. VIRAL DUBAI KUNAFA PISTACHIO CHOCOLATE
  {
    id: 'dubai-kunafa-chocolate',
    name: 'Viral Dubai Kunafa Pistachio Chocolate Bar',
    brand: 'Fix Dessert Chocolatier Style',
    category: 'chocolates-snacks',
    categoryLabel: 'Chocolates & Snacks',
    shortDescription: 'Thick Belgian milk chocolate stuffed with crunchy roasted kataifi pastry and creamy green pistachio tahini.',
    description: 'The worldwide internet phenomenon in its freshest batch. Every bite explodes with audible crunch and smooth, nutty pistachio cream.',
    image: dubaiKunafaImg,
    images: [
      dubaiKunafaImg,
      feastablesImg
    ],
    badges: ['Viral Sensation', 'Top Trending', 'Handcrafted'],
    isBestSeller: true,
    isTrending: true,
    variants: {
      name: 'Flavors',
      options: ['Original Pistachio Kunafa', 'Lotus Biscoff Kunafa', 'Dark Chocolate Pistachio'],
    },
    details: {
      origin: 'UAE / Dubai Style',
      size: '200g Giant Bar',
      flavorNotes: 'Crunchy golden butter kataifi pastry, pure roasted pistachios',
      highlights: ['Shipped in Insulated Cold Wrap', 'Viral TikTok sensation', 'Extra Thick Chocolate Shell'],
    },
  },

  // 10. TAKIS FUEGO TORTILLA CHIPS
  {
    id: 'takis-fuego-tortilla-chips',
    name: 'Takis Fuego Hot Chili Pepper & Lime',
    brand: 'Barcel Mexico',
    category: 'chocolates-snacks',
    categoryLabel: 'Chocolates & Snacks',
    shortDescription: 'Rolled corn tortilla chips covered in mouth-watering fiery habanero and zesty tangy lime dust.',
    description: 'The ultimate spicy snack with an unmatched cult following. Rolled tight for maximum crunch and intense coating.',
    image: takisFuegoImg,
    images: [
      takisFuegoImg
    ],
    badges: ['Imported USA', 'Spicy Favorite'],
    isBestSeller: true,
    isTrending: true,
    variants: {
      name: 'Pack Size',
      options: ['280g Mega Bag', '92g Grab Bag'],
    },
    details: {
      origin: 'USA / Mexico Import',
      size: '280g / 9.9oz',
      flavorNotes: 'Extreme chili pepper heat with zesty lime finish',
      highlights: ['Authentic Barcel Import', 'Rolled Crunchy Texture', 'Signature Purple Bag'],
    },
  },

  // 11. FEASTABLES MRBEAST BAR
  {
    id: 'feastables-mrbeast-bar',
    name: 'Feastables MrBeast Milk Chocolate',
    brand: 'Feastables by MrBeast',
    category: 'chocolates-snacks',
    categoryLabel: 'Chocolates & Snacks',
    shortDescription: 'Only 5 simple plant-based ingredients crafted into velvety grass-fed milk chocolate.',
    description: 'Directly sourced American batch Feastables. Created by MrBeast to redefine chocolate with clean, ridiculously delicious cocoa.',
    image: feastablesImg,
    images: [
      feastablesImg,
      dubaiKunafaImg
    ],
    badges: ['Trending', 'Simple Ingredients'],
    isTrending: true,
    variants: {
      name: 'Flavor',
      options: ['Milk Chocolate', 'Deez Nutz (Peanut Butter)', 'Crunch (Puffed Rice)', 'Dark Chocolate Sea Salt'],
    },
    details: {
      origin: 'USA Import',
      size: '60g Bar',
      flavorNotes: 'Rich cocoa butter and creamy milk balance',
      highlights: ['Grass-fed Milk', 'Non-GMO', 'No Artificial Flavors'],
    },
  },

  // 12. KITKAT CLASSIC ORIGINAL
  {
    id: 'kitkat-classic-original',
    name: 'Nestle KitKat Classic 4-Finger Milk Chocolate',
    brand: 'Nestle Original',
    category: 'chocolates-snacks',
    categoryLabel: 'Chocolates & Snacks',
    shortDescription: 'Classic 4-finger crispy baked wafers enveloped in smooth, rich milk chocolate.',
    description: 'The iconic international favorite. Crisp, light wafer fingers covered in creamy milk chocolate that snaps with clean satisfaction. Have a break, have a KitKat!',
    image: kitkatClassicImg,
    images: [
      kitkatClassicImg,
      dairyMilkSilkImg
    ],
    badges: ['Classic Original', 'Top Pick', 'Pure Milk Chocolate'],
    isBestSeller: true,
    variants: {
      name: 'Pack Options',
      options: ['Classic 4-Finger (Pack of 3)', 'Family Share Pack (8 Bars)', 'King Size 4-Finger'],
    },
    details: {
      origin: 'Original Nestle Batch',
      size: '4-Finger Bar / 45g each',
      flavorNotes: 'Crisp light wafer layered with creamy milk chocolate coating',
      highlights: ['Iconic Snap & Crisp Texture', '100% Certified Sustainable Cocoa', 'Fresh Batch Guarantee'],
    },
  },

  // 13. COSRX SNAIL MUCIN ESSENCE
  {
    id: 'cosrx-snail-mucin-essence',
    name: 'COSRX Advanced Snail 96 Mucin Power Essence',
    brand: 'COSRX Korea',
    category: 'personal-care',
    categoryLabel: 'Personal Care',
    shortDescription: '96.3% Snail secretion filtrate for deep cellular hydration, soothing redness, and glass-skin glow.',
    description: 'The world’s most celebrated Korean skincare product. Lightweight fast-absorbing essence that repairs the skin barrier without stickiness.',
    image: cosrxSnailImg,
    images: [
      cosrxSnailImg,
      beautyJoseonSunImg
    ],
    badges: ['K-Beauty Cult', 'Best Seller'],
    isBestSeller: true,
    variants: {
      name: 'Size',
      options: ['100ml Standard', 'Dual Essence 80ml'],
    },
    details: {
      origin: 'South Korea Import',
      size: '100ml Pump Bottle',
      flavorNotes: 'Fragrance-free, hypoallergenic clear gel essence',
      highlights: ['96.3% Snail Secretion Filtrate', 'Dermatologist Tested', 'Glass Skin Glow'],
    },
  },

  // 14. BEAUTY OF JOSEON SUNSCREEN
  {
    id: 'beauty-of-joseon-sunscreen',
    name: 'Beauty of Joseon Relief Sun: Rice + Probiotics SPF50+',
    brand: 'Beauty of Joseon',
    category: 'personal-care',
    categoryLabel: 'Personal Care',
    shortDescription: '30% Rice extract organic sunscreen with zero white cast and skin-nourishing fermented grains.',
    description: 'Viral Korean sunscreen loved for feeling like a gentle daily moisturizer. Dewy, non-greasy, and broad-spectrum chemical SPF50+ PA++++ protection.',
    image: beautyJoseonSunImg,
    images: [
      beautyJoseonSunImg,
      cosrxSnailImg
    ],
    badges: ['Trending', 'Korean Import'],
    isTrending: true,
    variants: {
      name: 'Pack',
      options: ['Single 50ml Tube', 'Twin Pack (2 x 50ml)'],
    },
    details: {
      origin: 'South Korea Import',
      size: '50ml Tube',
      flavorNotes: 'Weightless lotion texture with zero white cast',
      highlights: ['SPF 50+ PA++++ Certified', 'Rice Germ Extracts & Probiotics', 'Reef Safe Formula'],
    },
  },

  // 15. MONSTER PIPELINE PUNCH TROPICAL
  {
    id: 'monster-pipeline-punch',
    name: 'Monster Energy Pipeline Punch Tropical',
    brand: 'Monster Energy Juice',
    category: 'energy-beverages',
    categoryLabel: 'Energy & Beverages',
    shortDescription: 'The perfect tropical blend of passion fruit, orange, and guava with the iconic Monster energy punch in a hot pink can.',
    description: 'Named after the legendary Banzai Pipeline surf reef in Oahu, Hawaii. Crafted with 16% real fruit juices (passionfruit, orange, guava, apple, and pineapple) blended with full Monster energy for an explosive tropical wave.',
    image: monsterPipelinePunchImg,
    images: [
      monsterPipelinePunchImg,
      monsterMangoLocoImg,
      monsterUltraWhiteImg
    ],
    badges: ['Top Flavored', 'Hawaiian Juiced', 'Imported Can'],
    isTrending: true,
    isBestSeller: true,
    variants: {
      name: 'Size / Edition',
      options: ['500ml Import Can', 'Pack of 2', 'Pack of 4 Collector Box'],
    },
    details: {
      origin: 'European / Overseas Import',
      size: '500ml Can',
      flavorNotes: 'Exotic Hawaiian passionfruit, juicy orange, and sweet tropical guava',
      highlights: ['16% Real Fruit Juice Blend', '160mg Taurine & Caffeine Kick', 'Collectible Hot Pink Can'],
    },
  },

  // 16. CADBURY DAIRY MILK SILK CHOCOLATE
  {
    id: 'cadbury-dairy-milk-silk',
    name: 'Cadbury Dairy Milk Silk Chocolate Bar',
    brand: 'Cadbury Original',
    category: 'chocolates-snacks',
    categoryLabel: 'Chocolates & Snacks',
    shortDescription: 'Unspeakably smooth and creamy milk chocolate with the signature melt-in-mouth Silk swirl.',
    description: 'The gold standard of indulgent chocolate in India. Crafted with glass-and-a-half rich cream milk and velvety cocoa butter, giving you that iconic softer, smoother, silkier chocolate delight.',
    image: dairyMilkSilkImg,
    images: [
      dairyMilkSilkImg,
      kitkatClassicImg
    ],
    badges: ['Silky Smooth', 'All-Time Favorite', 'Original Recipe'],
    isTrending: true,
    isBestSeller: true,
    variants: {
      name: 'Silk Varieties',
      options: ['Silk Classic (150g)', 'Silk Roast Almond (143g)', 'Silk Fruit & Nut (137g)', 'Silk Oreo (130g)', 'Silk Bubbly (120g)'],
    },
    details: {
      origin: 'Cadbury Authentic Master Batch',
      size: '150g Giant Bar',
      flavorNotes: 'Rich cream milk chocolate with buttery melt-in-mouth Silk swirl',
      highlights: ['100% Pure Cocoa Butter & Cream Milk', 'Insulated Cool-Pack Dispatch', 'Signature Silk Velvet Texture'],
    },
  },

  // 17. THAILAND RED BULL KRATING DAENG GOLD
  {
    id: 'thailand-red-bull-krating-daeng',
    name: 'Thailand Red Bull Krating Daeng Gold',
    brand: 'Red Bull Thailand (TC Pharma)',
    category: 'energy-beverages',
    categoryLabel: 'Energy & Beverages',
    shortDescription: 'Original authentic non-carbonated Thai Red Bull in the iconic gold can with twin clashing bulls.',
    description: 'The original formula created by Chaleo Yoovidhya in Thailand that started the global energy drink revolution. Non-carbonated, sweet, rich in Taurine, Inositol, and essential B-vitamins for prolonged focus without bloating.',
    image: thailandRedBullImg,
    images: [
      thailandRedBullImg,
      monsterMangoLocoImg,
      monsterPipelinePunchImg
    ],
    badges: ['Authentic Thai', 'Rare Import', 'Original Formula'],
    isNewArrival: true,
    isTrending: true,
    variants: {
      name: 'Pack Options',
      options: ['250ml Gold Can', 'Pack of 3 Thai Cans', 'Case of 6 Collector Pack'],
    },
    details: {
      origin: 'Bangkok, Thailand (Direct Import)',
      size: '250ml Gold Tin Can',
      flavorNotes: 'Smooth un-carbonated sweet berry-citrus with intense energy vitality',
      highlights: ['Original 1976 Krating Daeng Recipe', 'High Taurine & Inositol Ratio', 'Iconic Twin Clashing Bulls Graphic'],
    },
  },

  // 18. MONSTER ENERGY MANGO LOCO
  {
    id: 'monster-energy-mango-loco',
    name: 'Monster Energy Mango Loco Juicy Energy',
    brand: 'Monster Energy Juice',
    category: 'energy-beverages',
    categoryLabel: 'Energy & Beverages',
    shortDescription: 'Heavenly blend of exotic tropical mango juices in an iconic Mexican Dia de los Muertos blue can.',
    description: 'A heavenly blend of exotic mango, guava, and passion fruit juices crazy enough to attract the attention of the night. Wrapped in artwork inspired by the Mexican Day of the Dead skeleton culture.',
    image: monsterMangoLocoImg,
    images: [
      monsterMangoLocoImg,
      monsterPipelinePunchImg,
      thailandRedBullImg
    ],
    badges: ['Fan Favorite', 'Real Fruit Juice', 'Original Art Can'],
    isTrending: true,
    isBestSeller: true,
    variants: {
      name: 'Size',
      options: ['500ml Single Can', 'Pack of 2', 'Collector 4-Pack'],
    },
    details: {
      origin: 'Overseas Import Batch',
      size: '500ml Can',
      flavorNotes: 'Ripe luscious mango puree with tropical passionfruit kick',
      highlights: ['Intricate Calavera Art Can', 'Packed with Real Tropical Juices', 'Full Monster Energy Blend'],
    },
  },
];
