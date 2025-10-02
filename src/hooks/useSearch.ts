import { useState, useMemo } from 'react';
import { Product, WikiArticle } from '../types';

export function useSearch(products: Product[], articles: WikiArticle[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    
    const term = searchTerm.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const filteredArticles = useMemo(() => {
    if (!searchTerm) return articles;
    
    const term = searchTerm.toLowerCase();
    return articles.filter(article =>
      article.title.toLowerCase().includes(term) ||
      article.excerpt.toLowerCase().includes(term) ||
      article.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }, [articles, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredProducts,
    filteredArticles
  };
}