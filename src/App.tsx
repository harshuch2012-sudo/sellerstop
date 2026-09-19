import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { ActiveView, Product, InquiryItem } from './types';
import { BUSINESS_INFO, CATEGORIES_DATA, PRODUCTS_DATA } from './data/products';
import { useAnimationAndMenu } from './hooks/useAnimationAndMenu';
import { VaultDoorEntrance } from './components/VaultDoorEntrance';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PlanetOrbitShowcase } from './components/PlanetOrbitShowcase';
import { LiveTickerMarquee } from './components/LiveTickerMarquee';
import { CuratorThoughts } from './components/CuratorThoughts';
import { InteractiveMatcher } from './components/InteractiveMatcher';
import { AuthenticityTimeline } from './components/AuthenticityTimeline';
import { CustomerStories } from './components/CustomerStories';
import { FAQSection } from './components/FAQSection';
import { FloatingWhatsAppWidget } from './components/FloatingWhatsAppWidget';
import { CategoryCard } from './components/CategoryCard';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderInquiryDrawer } from './components/OrderInquiryDrawer';
import { BelivitaSpotlight } from './components/BelivitaSpotlight';
import { WhySellerstop } from './components/WhySellerstop';
import { InstagramFeed } from './components/InstagramFeed';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  ShoppingBag,
  Zap,
  Globe
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([]);

  // Cinematic Vault Door Entrance State
  const [showVaultEntrance, setShowVaultEntrance] = useState<boolean>(true);
  const [isManualReplay, setIsManualReplay] = useState<boolean>(false);

  const handleVaultComplete = () => {
    setShowVaultEntrance(false);
    setIsManualReplay(false);
  };

  const handleReplayVault = () => {
    setIsManualReplay(true);
  };

  // Hook implementing the 5 specific JS animation & menu rules
  const { isMenuOpen, toggleMenu, closeMenu } = useAnimationAndMenu();

  // Load inquiry items from localStorage on mount (for persistent user list)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sellerstop_inquiry');
      if (saved) {
        setInquiryItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save inquiry items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sellerstop_inquiry', JSON.stringify(inquiryItems));
    } catch {
      // ignore
    }
  }, [inquiryItems]);

  // Add to inquiry bag
  const handleAddToInquiry = (product: Product, variant?: string, quantity: number = 1) => {
    setInquiryItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === variant
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedVariant: variant }];
    });
  };

  const handleUpdateInquiryQuantity = (productId: string, quantity: number, variant?: string) => {
    setInquiryItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedVariant === variant) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const handleRemoveInquiryItem = (productId: string, variant?: string) => {
    setInquiryItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedVariant === variant)
      )
    );
  };

  const handleClearInquiry = () => {
    setInquiryItems([]);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickViewProduct = (productId: string) => {
    const product = PRODUCTS_DATA.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  // Filtered products for Shop View
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        product.category === selectedCategory ||
        (selectedCategory === 'belivita' && product.isBelivita) ||
        (selectedCategory === 'perfumes' && (product.isBelivita || product.category === 'belivita'));

      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.badges && product.badges.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const bestSellerProducts = useMemo(
    () => PRODUCTS_DATA.filter((p) => p.isBestSeller),
    []
  );
  const newArrivalProducts = useMemo(
    () => PRODUCTS_DATA.filter((p) => p.isNewArrival),
    []
  );
  const trendingProducts = useMemo(
    () => PRODUCTS_DATA.filter((p) => p.isTrending),
    []
  );
  const luxuryPerfumeProducts = useMemo(
    () => PRODUCTS_DATA.filter((p) => p.isBelivita || p.category === 'belivita' || p.category === 'perfumes'),
    []
  );

  const inquiryItemIds = useMemo(
    () => inquiryItems.map((item) => item.product.id),
    [inquiryItems]
  );

  const totalInquiryCount = inquiryItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950 relative">
      
      {/* Starting Video Vault Door Opening Portal Entrance */}
      {(showVaultEntrance || isManualReplay) && (
        <VaultDoorEntrance
          onComplete={handleVaultComplete}
          isManualTrigger={isManualReplay}
          isOpenState={isManualReplay}
          onCloseManual={() => setIsManualReplay(false)}
        />
      )}

      {/* Responsive Navigation Header */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        inquiryCount={totalInquiryCount}
        openInquiry={() => setIsInquiryOpen(true)}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
        onReplayVault={handleReplayVault}
      />

      {/* Main Content Rendered by Active View with smooth entering zoom/fade */}
      <motion.main 
        initial={{ opacity: 0.9, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        {/* VIEW 1: HOME */}
        {activeView === 'home' && (
          <div>
            {/* 1. Hero Section */}
            <Hero
              setActiveView={setActiveView}
              openProductQuickView={handleQuickViewProduct}
              onReplayVault={handleReplayVault}
            />

            {/* Live Ticker Marquee */}
            <LiveTickerMarquee />

            {/* Planetary Orbit Showcase: Planet rotating with items orbiting SELLERSTOP */}
            <PlanetOrbitShowcase
              onViewProduct={setSelectedProduct}
              setActiveView={setActiveView}
            />

            {/* 2. Featured Categories Section */}
            <section className="py-16 md:py-20 border-b border-neutral-800/60 bg-neutral-950">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                      <Zap className="w-4 h-4" />
                      <span>Curated Catalog</span>
                    </div>
                    <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                      Featured Categories
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                      Explore Silk chocolates, chilled energy drinks &amp; colas, artisanal perfumes, and imported treats.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveView('categories');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    <span>View All Categories</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {CATEGORIES_DATA.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      onSelectCategory={handleSelectCategory}
                    />
                  ))}
                </div>

              </div>
            </section>

            {/* Interactive Vibe & Product Matcher */}
            <InteractiveMatcher
              onViewProduct={setSelectedProduct}
              onAddToInquiry={handleAddToInquiry}
            />

            {/* 3. Best Sellers Section */}
            <section className="py-16 md:py-20 border-b border-neutral-800/60 bg-neutral-900/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                      <Flame className="w-4 h-4" />
                      <span>Most Requested by Customers</span>
                    </div>
                    <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                      Best Sellers
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                      High-demand imported favorites and viral internet sensations.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveView('bestsellers');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    <span>See All Best Sellers</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestSellerProducts.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewProduct={setSelectedProduct}
                      onAddToInquiry={handleAddToInquiry}
                      isInInquiry={inquiryItemIds.includes(product.id)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Belivita Perfumes Spotlight */}
            <BelivitaSpotlight
              products={PRODUCTS_DATA}
              onViewProduct={setSelectedProduct}
              onAddToInquiry={handleAddToInquiry}
              inquiryItemIds={inquiryItemIds}
              onViewAllBelivita={() => {
                setActiveView('belivita');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Curator Thoughts & Philosophy Section */}
            <CuratorThoughts />

            {/* 5. Luxury Perfumes Section */}
            <section className="py-16 md:py-20 border-b border-neutral-800/60 bg-neutral-950">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Artisanal Extrait De Parfum</span>
                    </div>
                    <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                      Luxury Perfumes
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                      Designer decants, Eau de Parfums & Middle-Eastern ouds with magnetic 16+ hour sillage.
                    </p>
                  </div>

                  <button
                    onClick={() => handleSelectCategory('perfumes')}
                    className="text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Explore Luxury Perfumes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {luxuryPerfumeProducts.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewProduct={setSelectedProduct}
                      onAddToInquiry={handleAddToInquiry}
                      isInInquiry={inquiryItemIds.includes(product.id)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 6. Trending Products Section */}
            <section className="py-16 md:py-20 border-b border-neutral-800/60 bg-neutral-900/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                      <Flame className="w-4 h-4" />
                      <span>Social Media Sensation</span>
                    </div>
                    <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                      Trending Products
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                      Viral goods everyone is unboxing—order yours directly today.
                    </p>
                  </div>

                  <button
                    onClick={() => handleSelectCategory('trending')}
                    className="text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    <span>View Trending</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingProducts.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewProduct={setSelectedProduct}
                      onAddToInquiry={handleAddToInquiry}
                      isInInquiry={inquiryItemIds.includes(product.id)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 7. Why SELLERSTOP */}
            <WhySellerstop />

            {/* Authenticity & Pan-India Dispatch Timeline */}
            <AuthenticityTimeline />

            {/* Customer Stories & Verified Reviews */}
            <CustomerStories />

            {/* Frequently Asked Questions Accordion */}
            <FAQSection />

            {/* 9. Instagram Community */}
            <InstagramFeed />

            {/* 10. Quick About Preview */}
            <AboutSection />

            {/* 11. Contact Section */}
            <ContactSection />
          </div>
        )}

        {/* VIEW 2: SHOP (All Products, Filtering, Search) */}
        {activeView === 'shop' && (
          <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Shop Header & Controls */}
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>SELLERSTOP Catalog</span>
              </div>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Shop All Products
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                Order directly on WhatsApp with zero hidden costs. Personal assistance by Ishan Aggarwal.
              </p>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              
              {/* Search input */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search energy drinks, Belivita, chocolate, snacks..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-none">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                      : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:text-white'
                  }`}
                >
                  All Products ({PRODUCTS_DATA.length})
                </button>

                {CATEGORIES_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                        : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800/80 text-xs text-neutral-400">
              <span>
                Showing <strong className="text-white">{filteredProducts.length}</strong> products
              </span>
              <span className="text-emerald-400 font-medium">
                Tap &apos;Order on WhatsApp&apos; on any item for real-time inventory
              </span>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center">
                <p className="text-base text-neutral-300 font-medium mb-2">No matching products found</p>
                <p className="text-xs text-neutral-500 max-w-sm mb-6">
                  Try clearing your search query or selecting a different category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-neutral-950 font-bold text-xs"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewProduct={setSelectedProduct}
                    onAddToInquiry={handleAddToInquiry}
                    isInInquiry={inquiryItemIds.includes(product.id)}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* VIEW 3: CATEGORIES */}
        {activeView === 'categories' && (
          <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Zap className="w-3.5 h-3.5" />
                <span>Product Categories</span>
              </div>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Explore by Category
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                Browse our specialty imports, Belivita fragrance drops, energy cans, and gourmet snacks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES_DATA.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  onSelectCategory={handleSelectCategory}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: BEST SELLERS */}
        {activeView === 'bestsellers' && (
          <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Flame className="w-3.5 h-3.5" />
                <span>High Demand</span>
              </div>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Best Sellers Collection
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                Our most frequently ordered items across India. Fast-moving batches with prompt dispatch.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bestSellerProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewProduct={setSelectedProduct}
                  onAddToInquiry={handleAddToInquiry}
                  isInInquiry={inquiryItemIds.includes(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: NEW ARRIVALS */}
        {activeView === 'newarrivals' && (
          <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Just Landed</span>
              </div>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                New Arrivals
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                Fresh international stock arrivals and limited edition runs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newArrivalProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewProduct={setSelectedProduct}
                  onAddToInquiry={handleAddToInquiry}
                  isInInquiry={inquiryItemIds.includes(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 6: BELIVITA PERFUMES DEDICATED VIEW */}
        {activeView === 'belivita' && (
          <div>
            <BelivitaSpotlight
              products={PRODUCTS_DATA}
              onViewProduct={setSelectedProduct}
              onAddToInquiry={handleAddToInquiry}
              inquiryItemIds={inquiryItemIds}
              onViewAllBelivita={() => {}}
            />

            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="font-heading font-bold text-2xl text-white mb-6">
                All Belivita Fragrances & Editions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS_DATA.filter((p) => p.isBelivita || p.category === 'belivita').map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewProduct={setSelectedProduct}
                    onAddToInquiry={handleAddToInquiry}
                    isInInquiry={inquiryItemIds.includes(product.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 7: ABOUT */}
        {activeView === 'about' && (
          <div>
            <AboutSection />
            <WhySellerstop />
            <InstagramFeed />
          </div>
        )}

        {/* VIEW 8: CONTACT */}
        {activeView === 'contact' && (
          <div>
            <ContactSection />
            <AboutSection />
          </div>
        )}
      </motion.main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToInquiry={handleAddToInquiry}
      />

      {/* Order Inquiry Drawer */}
      <OrderInquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        items={inquiryItems}
        onUpdateQuantity={handleUpdateInquiryQuantity}
        onRemoveItem={handleRemoveInquiryItem}
        onClearInquiry={handleClearInquiry}
        onContinueShopping={() => {
          setActiveView('shop');
          setIsInquiryOpen(false);
        }}
      />

      {/* Floating Animated WhatsApp Concierge Button */}
      <FloatingWhatsAppWidget />

      {/* Footer */}
      <Footer
        setActiveView={setActiveView}
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />

    </div>
  );
}
