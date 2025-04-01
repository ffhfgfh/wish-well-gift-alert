
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GiftCard from "./GiftCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Filter, Gift as GiftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Gift } from "@/types/gift";
import { mockGifts } from "@/data/mockGifts";

const priceRanges = [
  { id: "all", name: "All Prices" },
  { id: "0-25", name: "Under $25" },
  { id: "25-50", name: "$25 - $50" },
  { id: "50-100", name: "$50 - $100" },
  { id: "100+", name: "$100+" },
];

const categories = [
  "Tech",
  "Home",
  "Fashion",
  "Beauty",
  "Books",
  "Sports",
  "Food",
  "Experiences",
  "Kids",
  "DIY",
];

const GiftRecommendations = () => {
  const [searchParams] = useSearchParams();
  const relationshipParam = searchParams.get("relationship") || "";
  const interestsParam = searchParams.get("interests") || "";
  
  const [gifts, setGifts] = useState<Gift[]>(mockGifts);
  const [filteredGifts, setFilteredGifts] = useState<Gift[]>(mockGifts);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Apply initial filters based on URL parameters
  useEffect(() => {
    let filtered = [...mockGifts];
    
    if (relationshipParam) {
      filtered = filtered.filter(gift => 
        gift.forRelationships.some(rel => 
          rel.toLowerCase() === relationshipParam.toLowerCase()
        )
      );
    }
    
    if (interestsParam) {
      const interestsList = interestsParam.toLowerCase().split(',');
      filtered = filtered.filter(gift => 
        gift.tags.some(tag => 
          interestsList.some(interest => 
            tag.toLowerCase().includes(interest.trim().toLowerCase())
          )
        )
      );
    }
    
    setGifts(filtered);
    setFilteredGifts(filtered);
  }, [relationshipParam, interestsParam]);

  // Apply filters
  useEffect(() => {
    let filtered = [...gifts];
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(gift => 
        gift.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        gift.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gift.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply price range
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      if (max) {
        filtered = filtered.filter(gift => gift.price >= min && gift.price <= max);
      } else {
        // For "100+"
        filtered = filtered.filter(gift => gift.price >= min);
      }
    }
    
    // Apply categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(gift => 
        gift.tags.some(tag => selectedCategories.includes(tag))
      );
    }
    
    setFilteredGifts(filtered);
  }, [searchTerm, priceRange, selectedCategories, gifts]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-birthday-dark mb-2">Gift Recommendations</h1>
        <p className="text-gray-600">
          {relationshipParam 
            ? `Personalized gift ideas for your ${relationshipParam.toLowerCase()}`
            : "Find the perfect gift for your loved ones"}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Mobile Toggle */}
        <button 
          className="lg:hidden flex items-center justify-between w-full p-3 border rounded-lg mb-4"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <span className="flex items-center font-medium">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </span>
          <span>{isFilterOpen ? "Hide" : "Show"}</span>
        </button>

        {/* Filters Sidebar */}
        <div 
          className={cn(
            "lg:w-60 lg:flex-shrink-0",
            isFilterOpen ? "block" : "hidden lg:block"
          )}
        >
          <div className="border rounded-lg p-5 sticky top-20">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Price Range</h3>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.id} value={range.id}>{range.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={selectedCategories.includes(category)} 
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label 
                      htmlFor={`category-${category}`}
                      className="ml-2 text-sm cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search for gifts..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Results Count */}
          <div className="mb-4 text-sm text-gray-600">
            {filteredGifts.length} gift{filteredGifts.length !== 1 && 's'} found
          </div>
          
          {/* Gift Cards */}
          {filteredGifts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGifts.map((gift) => (
                <GiftCard key={gift.id} gift={gift} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-xl bg-gray-50">
              <div className="w-16 h-16 bg-birthday-teal/20 rounded-full flex items-center justify-center mx-auto">
                <GiftIcon className="h-8 w-8 text-birthday-teal" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No gifts found</h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your filters or search term
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftRecommendations;
