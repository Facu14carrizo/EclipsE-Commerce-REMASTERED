import React from 'react';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <button
              onClick={() => onViewDetails(product)}
              className="flex items-center space-x-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-md text-white text-sm hover:bg-white/30 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>Ver detalles</span>
            </button>
            
            {product.inStock && (
              <button
                onClick={handleAddToCart}
                className="flex items-center space-x-1 px-3 py-1 bg-cyan-500/80 backdrop-blur-sm rounded-md text-white text-sm hover:bg-cyan-600/80 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Agregar</span>
              </button>
            )}
          </div>
        </div>

        {/* Stock indicator */}
        {!product.inStock && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded-md">
            Agotado
          </div>
        )}

        {/* Discount badge */}
        {product.originalPrice && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs rounded-md font-semibold">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-cyan-400 font-medium">{product.brand}</span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-300">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        </div>

        <h3 className="font-semibold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Specifications */}
        <div className="space-y-1 mb-4">
          {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-gray-500 capitalize">{key}:</span>
              <span className="text-gray-300">{value}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>

          {product.inStock ? (
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Agregar</span>
            </button>
          ) : (
            <button disabled className="px-4 py-2 bg-gray-600 text-gray-400 rounded-lg cursor-not-allowed">
              Agotado
            </button>
          )}
        </div>
      </div>
    </div>
  );
}