import React from 'react';
import { FilterState } from '../../types';
import { brands, types } from '../../data/products';

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  maxPrice: number;
}

export function ProductFilters({ filters, onFiltersChange, maxPrice }: ProductFiltersProps) {
  const handleTypeChange = (type: string) => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type];
    
    onFiltersChange({ ...filters, type: newTypes });
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brand.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...filters.brand, brand];
    
    onFiltersChange({ ...filters, brand: newBrands });
  };

  const handlePriceChange = (value: number, index: number) => {
    const newPriceRange: [number, number] = [...filters.priceRange];
    newPriceRange[index] = value;
    onFiltersChange({ ...filters, priceRange: newPriceRange });
  };

  const clearFilters = () => {
    onFiltersChange({
      type: [],
      brand: [],
      priceRange: [0, maxPrice],
      inStock: false
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Filtros</h3>
        <button
          onClick={clearFilters}
          className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
        >
          Limpiar
        </button>
      </div>

      {/* Type Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Tipo de Producto</h4>
        <div className="space-y-2">
          {types.map((type) => (
            <label key={type.value} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.type.includes(type.value)}
                onChange={() => handleTypeChange(type.value)}
                className="w-4 h-4 text-cyan-500 bg-transparent border-gray-400 rounded focus:ring-cyan-500 focus:ring-2"
              />
              <span className="text-gray-400 group-hover:text-white transition-colors">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Marca</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="w-4 h-4 text-cyan-500 bg-transparent border-gray-400 rounded focus:ring-cyan-500 focus:ring-2"
              />
              <span className="text-gray-400 group-hover:text-white transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Rango de Precio</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-1">Mínimo</label>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm text-cyan-400">${filters.priceRange[0]}</span>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-1">Máximo</label>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm text-cyan-400">${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Filter */}
      <div>
        <label className="flex items-center space-x-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onFiltersChange({ ...filters, inStock: e.target.checked })}
            className="w-4 h-4 text-cyan-500 bg-transparent border-gray-400 rounded focus:ring-cyan-500 focus:ring-2"
          />
          <span className="text-gray-400 group-hover:text-white transition-colors">Solo en stock</span>
        </label>
      </div>
    </div>
  );
}