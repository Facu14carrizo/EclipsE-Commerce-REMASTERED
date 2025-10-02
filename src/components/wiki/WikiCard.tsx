import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { WikiArticle } from '../../types';

interface WikiCardProps {
  article: WikiArticle;
  onReadMore: (article: WikiArticle) => void;
}

export function WikiCard({ article, onReadMore }: WikiCardProps) {
  const categoryLabels = {
    planets: 'Planetas',
    stars: 'Estrellas',
    galaxies: 'Galaxias',
    nebulae: 'Nebulosas',
    comets: 'Cometas',
    blackholes: 'Agujeros Negros'
  };

  return (
    <article className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-purple-400/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full font-medium">
          {categoryLabels[article.category]}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{article.readTime} min lectura</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-400 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/10 text-cyan-400 text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read more button */}
        <button
          onClick={() => onReadMore(article)}
          className="group/btn flex items-center space-x-2 text-purple-400 hover:text-white transition-colors font-medium"
        >
          <span>Leer artículo</span>
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
}