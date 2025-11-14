import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Cart = () => {
  const { t } = useTranslation();
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Новые состояния для данных клиента
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const handleCheckout = async () => {
    if (items.length === 0) return;

    if (!customerName || !customerPhone || !customerAddress) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/order/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: customerName,  
          customer_phone: customerPhone,
          customer_address: customerAddress,
          total_price: total.toString(),
          items: items.map((item) => ({
            product_name: item.name,
            quantity: item.quantity,
            price: item.price.toString(),
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to create order");

      setSuccess(true);
      clearCart();
      setCustomerName("");
      setCustomerPhone("");
      setCustomerAddress("");
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-serif font-bold mb-2">
            {t("cart.empty")}
          </h2>
          <Link to="/products">
            <Button className="mt-4">{t("cart.continueShopping")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-serif font-bold mb-8">{t("cart.title")}</h1>

          {success && (
            <div className="p-4 mb-6 bg-green-100 text-green-700 rounded-lg">
              ✅ {t("cart.success") || "Ваш заказ успешно оформлен!"}
            </div>
          )}

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <p className="text-primary font-bold">
                        {item.price.toLocaleString()} so'm
                      </p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Форма для данных клиента */}
          <Card className="mb-6">
            <CardContent className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Телефон"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Адрес"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="flex justify-between items-center text-2xl font-bold mb-6">
                <span>{t("cart.total")}:</span>
                <span className="text-primary">{total.toLocaleString()} so'm</span>
              </div>
              <div className="flex gap-4">
                <Link to="/products" className="flex-1">
                  <Button variant="outline" className="w-full">
                    {t("cart.continueShopping")}
                  </Button>
                </Link>
                <Button
                  className="flex-1"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? "⏳ " + t("cart.processing") : t("cart.checkout")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;