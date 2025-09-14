import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from '@/components/ProductCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface ProductSuggestionsProps {
  currentProductId?: string;
  category?: string;
  limit?: number;
}

const ProductSuggestions = ({ 
  currentProductId, 
  category,
  limit = 4 
}: ProductSuggestionsProps) => {
  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ['product-suggestions', currentProductId, category],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .limit(limit);

      // If we have a current product, exclude it
      if (currentProductId) {
        query = query.neq('id', currentProductId);
      }

      // If we have a category, filter by it, otherwise get random products
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Shuffle the results for better variety
      return data?.sort(() => Math.random() - 0.5) || [];
    }
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Suggested for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (suggestions.length === 0) return null;

  return (
    <Card className="fade-in-up">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {category ? `More from ${category}` : 'Suggested for You'}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">Choose Category</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {['Electronics','Home & Garden','Books','Beauty','Athletic Wear','Outerwear','Shoes'].map((cat) => (
                <DropdownMenuItem key={cat} asChild>
                  <a href={`/search?q=${encodeURIComponent(cat)}`}>{cat}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {suggestions.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSuggestions;