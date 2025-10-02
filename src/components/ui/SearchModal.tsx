import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Modal } from './Modal';
import { Product, WikiArticle } from '../../types';
import { ProductCard } from '../product/ProductCard';
import { WikiCard } from '../wiki/WikiCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  articles: WikiArticle[];
  onViewProduct: (product: Product) => void;
  onViewArticle: (article: WikiArticle) => void;
}

export function SearchModal({ 
  isOpen, 
  onClose, 
  products, 
  articles, 
  onViewProduct, 
  onViewArticle 
}: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'articles'>('products');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleProductView = (product: Product) => {
    onViewProduct(product);
    onClose();
  };

  const handleArticleView = (article: WikiArticle) => {
    onViewArticle(article);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos o artículos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-700/50 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Productos ({filteredProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === 'articles'
                ? 'bg-purple-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Artículos ({filteredArticles.length})
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {searchTerm === '' ? (
            <div className="text-center py-8 text-gray-400">
              Escribe algo para comenzar la búsqueda
            </div>
          ) : (
            <>
              {activeTab === 'products' && (
                <div className="space-y-4">
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No se encontraron productos
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {filteredProducts.slice(0, 6).map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onViewDetails={handleProductView}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'articles' && (
                <div className="space-y-4">
                  {filteredArticles.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No se encontraron artículos
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {filteredArticles.slice(0, 6).map((article) => (
                        <WikiCard
                          key={article.id}
                          article={article}
                          onReadMore={handleArticleView}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}