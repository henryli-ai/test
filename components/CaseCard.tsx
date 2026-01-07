
import React, { useState } from 'react';
import { SuccessCase } from '../types';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';

interface CaseCardProps {
  item: SuccessCase;
  onClick: () => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ item, onClick }) => {
  const [liked, setLiked] = useState(false);
  
  return (
    <div className="bg-white border border-gray-100 rounded-2xl md:rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group h-full">
      {/* Header */}
      <div className="px-3 md:px-5 py-2.5 md:py-4 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-600 p-[1.5px] shrink-0">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-0.5">
              <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center text-[10px] md:text-lg shadow-inner">
                🏢
              </div>
            </div>
          </div>
          <div className="min-w-0">
            <h4 className="text-[10px] md:text-xs font-black text-slate-900 truncate tracking-tight">{item.client}</h4>
            <p className="text-[8px] md:text-[9px] text-purple-600 font-bold uppercase truncate">{item.role}</p>
          </div>
        </div>
        <button className="text-slate-300 hidden md:block">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Image Container */}
      <div 
        className="aspect-square relative cursor-pointer overflow-hidden"
        onClick={onClick}
      >
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        {/* Results Badge - Responsive size */}
        <div className="absolute bottom-2 left-2 md:bottom-5 md:left-5 bg-white/95 backdrop-blur-md px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-2xl shadow-xl border border-white/50">
          <span className="text-[8px] md:text-xs font-black text-purple-700 italic">{item.results.split(' ')[0]}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3 md:mb-5">
          <div className="flex items-center gap-3 md:gap-5">
            <button onClick={() => setLiked(!liked)} className="transition-transform active:scale-125">
              <Heart className={`w-5 h-5 md:w-6 md:h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-slate-800'}`} />
            </button>
            <button onClick={onClick} className="hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-slate-800" />
            </button>
          </div>
          <button className="hover:scale-110 transition-transform">
            <Bookmark className="w-5 h-5 md:w-6 md:h-6 text-slate-800" />
          </button>
        </div>

        <div className="space-y-1.5 md:space-y-3 flex-1 min-w-0">
          <p className="text-[11px] md:text-sm font-black text-slate-900 leading-tight line-clamp-2 md:line-clamp-none">
            {item.title}
          </p>
          <p className="text-[9px] md:text-xs text-slate-500 line-clamp-1 md:line-clamp-2 font-medium">
            {item.summary}
          </p>
          
          <div className="flex flex-wrap gap-1 md:gap-2 pt-1">
            {item.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[8px] md:text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded md:rounded-lg">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-[7px] md:text-[9px] text-slate-300 font-black uppercase pt-4 tracking-tighter md:tracking-widest">
          {item.date}
        </p>
      </div>
    </div>
  );
};

export default CaseCard;
