import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import AISearchBar from '@/components/AISearchBar';
import ProductSection from '@/components/ProductSection';
import ProductSuggestions from '@/components/ProductSuggestions';
import HelloIntro from '@/components/HelloIntro';
import VisitorTracker from '@/components/VisitorTracker';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

// Updated Product interface to match Supabase data structure
interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  images?: string[];
  category: string;
  stock: number;
  is_new?: boolean;
  brand?: string;
}

const Index = () => {
  const { data: featuredProducts = [] } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(4);
      if (error) throw error;
      return data as Product[];
    }
  });

  const { data: newArrivals = [] } = useQuery({
    queryKey: ['new-arrivals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_new', true)
        .limit(4);
      if (error) throw error;
      return data as Product[];
    }
  });

  const { data: athleticWear = [] } = useQuery({
    queryKey: ['athletic-wear'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'Athletic Wear')
        .limit(4);
      if (error) throw error;
      return data as Product[];
    }
  });

  const { data: outerwear = [] } = useQuery({
    queryKey: ['outerwear'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'Outerwear')
        .limit(4);
      if (error) throw error;
      return data as Product[];
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <HelloIntro />
      <Navigation />
      <VisitorTracker />

      {/* Back to School Hero - mobile-first and responsive */}
      <section className="py-10 sm:py-14 lg:py-20 px-4">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500 text-white">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-3xl bg-white/10 blur-0" />
            <div className="pointer-events-none absolute top-16 right-24 h-24 w-24 rounded-2xl bg-white/10" />
            <div className="pointer-events-none absolute bottom-8 right-40 h-20 w-20 rounded-full bg-white/15" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-20">
              {/* Left content */}
              <div className="order-2 lg:order-1 text-center lg:text-left">
                <div className="inline-flex items-center justify-center lg:justify-start text-sm sm:text-base font-semibold bg-white/20 backdrop-blur px-4 sm:px-5 py-2 rounded-full">
                  21 Aug - 4 Sep
                </div>
                <h1 className="mt-4 text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight">
                  Back to School Sale
                </h1>
                <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-white/90">
                  Backpacks, stationery, laptops, kids' fashion and more!
                </p>
                {/* Inline search like navbar */}
                <div className="mt-5 sm:mt-6">
                  <div className="mx-auto lg:mx-0 max-w-xl">
                    <AISearchBar placeholder="Search home, kitchen, appliances..." compact />
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="mt-4 sm:mt-6">
                  <Link to="/products">
                    <Button size="lg" className="h-12 sm:h-12 px-6 sm:px-8 text-base sm:text-lg bg-white text-gray-900 hover:bg-white/90">
                      Shop Deals
                    </Button>
                  </Link>
                </div>

                {/* Quick category icons */}
                <div className="mt-6 sm:mt-8 grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 justify-items-center">
                  <Link to="/electronics" className="group">
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition">
                        <span className="text-2xl">📺</span>
                      </div>
                      <span className="text-xs">Electronics</span>
                    </div>
                  </Link>
                  <Link to="/home-garden" className="group">
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition">
                        <span className="text-2xl">🏠</span>
                      </div>
                      <span className="text-xs">Home</span>
                    </div>
                  </Link>
                  <Link to="/products" className="group">
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition">
                        <span className="text-2xl">🍳</span>
                      </div>
                      <span className="text-xs">Kitchen</span>
                    </div>
                  </Link>
                  <Link to="/books" className="group">
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition">
                        <span className="text-2xl">📚</span>
                      </div>
                      <span className="text-xs">Books</span>
                    </div>
                  </Link>
                  <Link to="/beauty" className="group">
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition">
                        <span className="text-2xl">💄</span>
                      </div>
                      <span className="text-xs">Beauty</span>
                    </div>
                  </Link>
                  <Link to="/products" className="group">
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition">
                        <span className="text-2xl">🔥</span>
                      </div>
                      <span className="text-xs">Deals</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Right visuals */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
                  <div className="absolute inset-0 bg-white/10 rounded-3xl rotate-6" />
                  <div className="absolute inset-0 bg-white/15 rounded-3xl -rotate-6" />
                  <div className="absolute inset-0 rounded-3xl flex items-center justify-center">
                    <span className="text-6xl sm:text-7xl">🎒</span>
                  </div>
                  <div className="absolute -top-3 -right-3 h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <span className="text-2xl">✏️</span>
                  </div>
                  <div className="absolute -bottom-4 right-16 h-12 w-16 rounded-xl bg-white/20 flex items-center justify-center">
                    <span className="text-xl">💻</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products">
        <ProductSection
          title="Featured Products"
          description="Handpicked treasures from our Egyptian marketplace"
          products={featuredProducts}
          viewAllLink="/products"
        />
      </section>

      {/* Enhanced Shop by Category */}
      <section className="py-20 bg-gradient-to-br from-souq-cream to-souq-sand">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-display font-bold mb-6 souq-text-gradient">Shop by Category</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Explore our curated collections of authentic and modern treasures</p>
          </div>
          
          {/* Mobile slider, grid on md+ */}
          <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:overflow-visible scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            <Link to="/electronics" className="group flex-none min-w-[220px] sm:min-w-[240px] md:min-w-0">
              <Card className="hover:-translate-y-1 transition-all duration-300 bg-white/80 border border-gray-100 shadow-sm hover:shadow-md h-full">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="bg-gradient-to-br from-sky-400 to-fuchsia-500 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <span className="text-white text-2xl">📱</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:souq-text-gradient transition-all duration-300">Electronics</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Latest gadgets & innovative tech</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/home-garden" className="group flex-none min-w-[220px] sm:min-w-[240px] md:min-w-0">
              <Card className="hover:-translate-y-1 transition-all duration-300 bg-white/80 border border-gray-100 shadow-sm hover:shadow-md h-full">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-400 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <span className="text-white text-2xl">🏠</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:souq-text-gradient transition-all duration-300">Home & Garden</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Home essentials & décor</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/books" className="group flex-none min-w-[220px] sm:min-w-[240px] md:min-w-0">
              <Card className="hover:-translate-y-1 transition-all duration-300 bg-white/80 border border-gray-100 shadow-sm hover:shadow-md h-full">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-500 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <span className="text-white text-2xl">📚</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:souq-text-gradient transition-all duration-300">Books</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Knowledge & literature</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/beauty" className="group flex-none min-w-[220px] sm:min-w-[240px] md:min-w-0">
              <Card className="hover:-translate-y-1 transition-all duration-300 bg-white/80 border border-gray-100 shadow-sm hover:shadow-md h-full">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="bg-gradient-to-br from-pink-500 to-rose-500 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <span className="text-white text-2xl">💄</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:souq-text-gradient transition-all duration-300">Beauty</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">Cosmetics & wellness</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <ProductSection
        title="New Arrivals"
        description="Fresh additions to our marketplace"
        products={newArrivals}
        viewAllLink="/products"
      />

      {/* Product Suggestions */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ProductSuggestions limit={8} />
        </div>
      </div>

      {/* Enhanced Call to Action */}
      <section className="souq-gradient-luxury text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 arabic-pattern opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="font-display text-display font-bold mb-6">Ready to Explore Souq Masr?</h2>
            <p className="text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Join thousands of satisfied customers who trust us for authentic Egyptian products and modern innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/products">
                <Button size="xl" variant="elegant" className="text-lg px-12 py-6 glow-effect">
                  Browse All Products
                </Button>
              </Link>
              <Link to="/signin">
                <Button size="xl" variant="outline" className="text-lg px-12 py-6 border-white/30 text-white hover:bg-white/10">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
