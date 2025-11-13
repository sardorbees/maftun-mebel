import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { ShoppingCart, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: string | number;
  old_price?: string | number;
  image: string;
  is_new?: boolean;
  in_stock?: boolean;
  created_at?: string;
}

export const ProductCard = ({
  id,
  name,
  price,
  old_price,
  image,
  is_new = false,
  in_stock = true,
}: ProductCardProps) => {
  const { t } = useTranslation();
  const { addItem, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  // Проверяем, есть ли товар уже в корзине
  const isInCart = items.some((item) => item.id === String(id));

  const handleAddToCart = () => {
    if (!in_stock) return;
    addItem({
      id: String(id),
      name,
      price: Number(price),
      image,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden group hover:shadow-artisan transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />

          {/* Значок "NEW" */}
          {is_new && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
              {t("product.new")}
            </Badge>
          )}

          {/* Если товара нет в наличии */}
          {!in_stock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="destructive">{t("product.outOfStock")}</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-serif font-semibold text-lg mb-2 line-clamp-2">
            {name}
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              {Number(price).toLocaleString()} so'm
            </span>
            {old_price && (
              <span className="text-sm text-muted-foreground line-through">
                {Number(old_price).toLocaleString()} so'm
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            disabled={!in_stock}
            className="w-full group/btn"
            variant={isInCart ? "secondary" : "default"}
          >
            {justAdded ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                {t("product.inCart")}
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                {isInCart ? t("product.inCart") : t("product.addToCart")}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};