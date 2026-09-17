import React from 'react';
import { motion } from 'motion/react';
import { CategoryInfo } from '../types';
import { Zap, Sparkles, Flame, Cookie, Heart, Globe, TrendingUp, ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'Flame':
        return <Flame className="w-4 h-4 text-amber-400" />;
      case 'Cookie':
        return <Cookie className="w-4 h-4 text-amber-400" />;
      case 'Heart':
        return <Heart className="w-4 h-4 text-amber-400" />;
      case 'Globe':
        return <Globe className="w-4 h-4 text-amber-400" />;
      case 'TrendingUp':
      default:
        return <TrendingUp className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      id={`category-card-${category.id}`}
      onClick={() => onSelectCategory(category.id)}
      className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden cursor-pointer border border-neutral-800/80 hover:border-amber-400/60 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10"
    >
      {/* Background Image with Zoom */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-90"
      />

      {/* Dark Ambient Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />

      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/60 text-xs font-semibold text-white">
          {getIcon(category.iconName)}
          <span>{category.name}</span>
        </div>

        <div className="w-8 h-8 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/60 flex items-center justify-center text-neutral-300 group-hover:text-neutral-950 group-hover:bg-amber-400 group-hover:border-amber-400 transition-all">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="font-heading font-black text-xl text-white group-hover:text-amber-300 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-neutral-300 mt-1 line-clamp-1">
          {category.tagline}
        </p>
        <span className="text-[11px] text-amber-400/90 font-semibold mt-2 inline-block">
          Explore Curated Items →
        </span>
      </div>
    </motion.div>
  );
};
