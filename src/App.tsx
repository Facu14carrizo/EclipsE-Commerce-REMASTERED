import React, { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/layout/Hero';
import { ProductCard } from './components/product/ProductCard';
import { ProductFilters } from './components/product/ProductFilters';
import { WikiCard } from './components/wiki/WikiCard';
import { Modal } from './components/ui/Modal';
import { SearchModal } from './components/ui/SearchModal';
import { Cart } from './components/ui/Cart';
import { ContactForm } from './components/ui/ContactForm';
import { useCart } from './contexts/CartContext';
import { products } from './data/products';
import { wikiArticles, wikiCategories } from './data/wiki';
import { FilterState, Product, WikiArticle } from './types';
import { Star, ShoppingCart, Clock, ArrowLeft, Filter, Grid2x2 as Grid, List, Mail, Phone, MapPin } from 'lucide-react';

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<WikiArticle | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wikiCategory, setWikiCategory] = useState<string>('all');
  
  const { addItem } = useCart();

  // Product filters
  const maxPrice = Math.max(...products.map(p => p.price));
  const [filters, setFilters] = useState<FilterState>({
    type: [],
    brand: [],
    priceRange: [0, maxPrice],
    inStock: false
  });

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesType = filters.type.length === 0 || filters.type.includes(product.type);
    const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand);
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesStock = !filters.inStock || product.inStock;
    
    return matchesType && matchesBrand && matchesPrice && matchesStock;
  });

  // Filter articles
  const filteredArticles = wikiCategory === 'all' 
    ? wikiArticles 
    : wikiArticles.filter(article => article.category === wikiCategory);

  const renderHome = () => (
    <div className="min-h-screen">
      <Hero onExploreClick={() => setActiveSection('catalog')} />
      
      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Productos <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Destacados</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Descubre nuestra selección de telescopios y accesorios premium para explorar el cosmos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setActiveSection('catalog')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Ver Catálogo Completo
            </button>
          </div>
        </div>
      </section>

      {/* Featured Wiki Articles */}
      <section className="py-20 bg-gradient-to-br from-slate-800 via-indigo-900/20 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Explora el <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Universo</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Aprende sobre los misterios del cosmos con nuestra enciclopedia astronómica
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wikiArticles.slice(0, 3).map((article) => (
              <WikiCard
                key={article.id}
                article={article}
                onReadMore={setSelectedArticle}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setActiveSection('wiki')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Explorar Wiki Completa
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const renderCatalog = () => (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Catálogo de <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Productos</span>
          </h1>
          <p className="text-xl text-gray-300">
            Descubre nuestra amplia gama de telescopios y accesorios astronómicos
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              maxPrice={maxPrice}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filtros</span>
                </button>
                
                <span className="text-gray-300">
                  {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-cyan-500 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-cyan-500 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Products */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No se encontraron productos con los filtros seleccionados</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWiki = () => (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-slate-900 via-indigo-900/10 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Wiki <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Astronómica</span>
          </h1>
          <p className="text-xl text-gray-300">
            Aprende sobre los misterios y maravillas del universo
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setWikiCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              wikiCategory === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-slate-700/50 text-gray-300 hover:text-white hover:bg-slate-600/50'
            }`}
          >
            Todos
          </button>
          {wikiCategories.map((category) => (
            <button
              key={category.value}
              onClick={() => setWikiCategory(category.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                wikiCategory === category.value
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-slate-700/50 text-gray-300 hover:text-white hover:bg-slate-600/50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <WikiCard
              key={article.id}
              article={article}
              onReadMore={setSelectedArticle}
            />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No hay artículos en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Sobre <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AstroShop</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Somos apasionados por la astronomía y nos dedicamos a acercar el universo a todos
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Nuestra Misión</h2>
            <p className="text-gray-300 leading-relaxed">
              En AstroShop, creemos que el universo debe ser accesible para todos. Nos especializamos en 
              proporcionar telescopios de alta calidad y conocimiento astronómico para inspirar a la próxima 
              generación de exploradores del cosmos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Calidad Premium</h3>
              <p className="text-gray-300">
                Seleccionamos cuidadosamente cada producto de las mejores marcas internacionales 
                para garantizar la mejor experiencia de observación.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Educación</h3>
              <p className="text-gray-300">
                Nuestra wiki astronómica proporciona conocimiento científico preciso y accesible 
                sobre los misterios del cosmos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => <ContactForm />;

  return (
    <>
      <Navbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onSearchToggle={() => setIsSearchOpen(true)}
      />

      {activeSection === 'home' && renderHome()}
      {activeSection === 'catalog' && renderCatalog()}
      {activeSection === 'wiki' && renderWiki()}
      {activeSection === 'about' && renderAbout()}
      {activeSection === 'contact' && renderContact()}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Modal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <div className="flex items-start space-x-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-64 h-64 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-cyan-400 font-medium">{selectedProduct.brand}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-300">{selectedProduct.rating}</span>
                    <span className="text-xs text-gray-500">({selectedProduct.reviews} reseñas)</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">{selectedProduct.name}</h2>
                
                <p className="text-gray-300 mb-6">{selectedProduct.description}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-white">${selectedProduct.price}</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                    )}
                  </div>
                  
                  {selectedProduct.inStock ? (
                    <button
                      onClick={() => {
                        addItem(selectedProduct);
                        setSelectedProduct(null);
                        // Opcional: mostrar el carrito después de agregar
                        // setTimeout(() => setIsOpen(true), 300);
                      }}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Agregar al Carrito</span>
                    </button>
                  ) : (
                    <span className="px-6 py-3 bg-gray-600 text-gray-400 rounded-lg">Agotado</span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Specifications */}
            <div className="bg-slate-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Especificaciones</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-400 capitalize">{key}:</span>
                    <span className="text-gray-300">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <Modal
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center space-x-2 text-purple-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver</span>
            </button>
            
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full">
                  {selectedArticle.category}
                </span>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{selectedArticle.readTime} min de lectura</span>
                </div>
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">{selectedArticle.title}</h1>
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedArticle.content}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 text-cyan-400 text-sm rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        articles={wikiArticles}
        onViewProduct={setSelectedProduct}
        onViewArticle={setSelectedArticle}
      />

      {/* Cart */}
      <Cart />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-900">
        <AppContent />
      </div>
    </CartProvider>
  );
}

export default App;