import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface FilterSidebarProps {
  filters: {
    category: string;
    company: string;
    minPrice: number;
    maxPrice: number;
    top: number;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

export default function FilterSidebar({
  filters,
  setFilters,
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (value: number[]) => {
    setLocalFilters((prev) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  };

  const handleSearch = () => {
    setFilters(localFilters);
  };

  return (
    <div className="w-64 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            value={localFilters.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
        </div>

        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={localFilters.company}
            onChange={handleInputChange}
            placeholder="Company"
          />
        </div>

        <div>
          <Label>Price Range</Label>
          <Slider
            min={0}
            max={1000}
            step={1}
            value={[localFilters.minPrice, localFilters.maxPrice]}
            onValueChange={handleSliderChange}
          />
          <div className="flex justify-between mt-2">
            <span>${localFilters.minPrice}</span>
            <span>${localFilters.maxPrice}</span>
          </div>
        </div>

        <div>
          <Label htmlFor="top">Top N Products</Label>
          <Input
            id="top"
            name="top"
            type="number"
            value={localFilters.top}
            onChange={handleInputChange}
            placeholder="Top N Products"
          />
        </div>

        <Button onClick={handleSearch} className="w-full">
          Search
        </Button>
      </div>
    </div>
  );
}
