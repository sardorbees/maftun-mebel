import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  old_price?: number | null;
  image: string;
  is_new: boolean;
  in_stock: boolean;
  created_at: string;
}

const Products = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/product/products/");
      setAllProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // 🔁 Можно убрать слишком частое обновление, чтобы не нагружать сервер
    const interval = setInterval(fetchProducts, 10000);
    return () => clearInterval(interval);
  }, []);

  // 🔍 Фильтрация + сортировка
  const filteredProducts = allProducts
    .filter((product) =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "newest")
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      return 0;
    });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 text-center">
            Mahsulotlar
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground text-center mb-8 sm:mb-12">
            Qo‘l mehnati bilan yaratilgan noyob mahsulotlar
          </p>

          {/* 🔍 Qidirish va Saralash */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Mahsulotlarni qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 text-base sm:text-sm"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[200px] h-11 text-base sm:text-sm">
                <SelectValue placeholder="Saralash" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Eng yangi</SelectItem>
                <SelectItem value="price-low">Arzon narx</SelectItem>
                <SelectItem value="price-high">Qimmat narx</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 🛍️ Mahsulotlar ro‘yxati */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-xl sm:text-2xl text-muted-foreground">
                Mahsulotlar yuklanmoqda...
              </p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div
              className="
                grid gap-5
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
              "
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={String(product.id)}
                  name={product.name}
                  price={product.price}
                  old_price={product.old_price}
                  image={product.image}
                  is_new={product.is_new}
                  in_stock={product.in_stock}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl sm:text-2xl text-muted-foreground">
                Hech qanday mahsulot topilmadi 😔
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Products;