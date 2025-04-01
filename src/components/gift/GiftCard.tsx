
import { useState } from "react";
import { ExternalLink, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Gift } from "@/types/gift";

interface GiftCardProps {
  gift: Gift;
}

const GiftCard = ({ gift }: GiftCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div className="gift-item flex flex-col h-full">
      <div className="relative pb-[70%] overflow-hidden rounded-md mb-3">
        <img 
          src={gift.image} 
          alt={gift.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <button 
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isFavorite ? 'bg-birthday-red text-white' : 'bg-white/80 text-gray-500 hover:bg-birthday-red/10'
          }`}
        >
          <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="flex-grow">
        <h3 className="font-semibold text-birthday-dark mb-1">{gift.name}</h3>
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-500">${gift.price.toFixed(2)}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {gift.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
        <p className="text-sm text-gray-600 mb-4">{gift.description}</p>
      </div>
      
      <a 
        href={gift.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mt-auto"
      >
        <Button className="w-full bg-birthday-teal hover:bg-birthday-teal/90 flex items-center">
          View Gift
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </a>
    </div>
  );
};

export default GiftCard;
