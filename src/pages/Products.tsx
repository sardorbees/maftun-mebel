import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import one from '../components/assets/img/product/one.jpg'
import two from '../components/assets/img/product/two.jpg'
import three from '../components/assets/img/product/three.jpg'
import four from '../components/assets/img/product/four.jpg'
import five from '../components/assets/img/product/five.jpg'
import six from '../components/assets/img/product/six.jpg'
import seven from '../components/assets/img/product/seven.jpg'
import eight from '../components/assets/img/product/eight.jpg'
import nine from '../components/assets/img/product/nine.jpg'

const allProducts = [
  {
    id: "1",
    name: "Купе 240×120×59 см",
    price: 2150000,
    oldPrice: 550000,
    image: one,
    isNew: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Купе 250×150×59 см",
    price: 2500000,
    image: two,
    isNew: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Купе 240×180×59 см",
    price: 2800000,
    image: three,
    inStock: true,
  },
  {
    id: "4",
    name: "Шкаф 4 эшикли 240×160×49 см",
    price: 2600000,
    oldPrice: 2600000,
    image: four,
    inStock: true,
  },
  {
    id: "5",
    name: "Шкаф 3 эшикли  Размери:250×135×49 см",
    price: 2200000,
    image: five,
    inStock: true,
  },
  {
    id: "6",
    name: "Шкаф 240×120×49 см",
    price: 2100000,
    image: six,
    inStock: false,
  },
  {
    id: "7",
    name: "Купе 200×180×59 см",
    price: 2200000,
    image: seven,
    isNew: true,
    inStock: true,
  },
  {
    id: "8",
    name: "Купе 200×180×59 см",
    price: 2200000,
    image: eight,
    inStock: true,
  },
  {
    id: "9",
    name: "Шкаф 4 - эшикли 200×160×49 см",
    price: 2100000,
    image: nine,
    inStock: true,
  },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredProducts = allProducts
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-serif font-bold mb-6 text-center">
            Mahsulotlar
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Qo'l mehnati bilan yaratilgan noyob mahsulotlar
          </p>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Mahsulotlarni qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Saralash" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Eng yangi</SelectItem>
                <SelectItem value="price-low">Arzon narx</SelectItem>
                <SelectItem value="price-high">Qimmat narx</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                Hech qanday mahsulot topilmadi
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Products;