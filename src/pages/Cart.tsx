import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Cart = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Данные клиента
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  // 🔥 Telegram + Backend
  const BOT_TOKEN = "8455589037:AAEB271gLar71WT025uJKUPuZCcQIvfUD0k";
  const CHAT_ID = "@maftunmebel";
  const ADMIN_CHAT_ID = "6427349045";

  const handleCheckout = async () => {
    if (!customerName || !customerPhone || !customerAddress) {
      toast.error(
        language === "uz"
          ? "Iltimos, barcha maydonlarni to‘ldiring."
          : "Пожалуйста, заполните все поля."
      );
      return;
    }

    if (items.length === 0) {
      toast.error(language === "uz" ? "Savat bo‘sh." : "Корзина пуста.");
      return;
    }

    setLoading(true);

    try {
      const itemsText = items
        .map((item) => `📦 ${item.name} — ${item.quantity} x ${item.price} UZS`)
        .join("\n");

      const tgMessage = `
🛒 <b>Yangi buyurtma!</b>

👤 <b>Ism:</b> ${customerName}
📞 <b>Telefon:</b> ${customerPhone}
📍 <b>Manzil:</b> ${customerAddress}

${itemsText}

💰 <b>Jami summa:</b> ${total.toLocaleString()} UZS
`;

      // 1) Send order to Telegram channel
      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: tgMessage,
            parse_mode: "HTML",
          }),
        });
      } catch (e) {
        console.warn("Telegram client error:", e);
      }

      // 2) Save order in backend database
      try {
        await fetch(
          "https://maftun-mebel-admin.onrender.com/api/order/orders/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customer_name: customerName,
              customer_phone: customerPhone,
              customer_address: customerAddress,
              total_price: total,
              items: items.map((item) => ({
                product_name: item.name,
                price: item.price,
                quantity: item.quantity,
              })),
            }),
          }
        );
      } catch (e) {
        console.warn("Backend error:", e);
      }

      // 3) Notify admin in Telegram
      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: ADMIN_CHAT_ID,
            text: `
📬 <b>Buyurtma tizimga saqlandi!</b>

👤 ${customerName}
📞 ${customerPhone}
💰 ${total.toLocaleString()} UZS

✅ Buyurtma muvaffaqiyatli qabul qilindi!
`,
            parse_mode: "HTML",
          }),
        });
      } catch (e) {
        console.warn("Admin TG error:", e);
      }

      toast.success(
        language === "uz"
          ? "Buyurtma muvaffaqiyatli yuborildi!"
          : "Заказ успешно отправлен!"
      );

      clearCart();
      setCustomerName("");
      setCustomerPhone("");
      setCustomerAddress("");
      setSuccess(true);
    } catch (err) {
      console.error(err);
      toast.error(language === "uz" ? "Xatolik yuz berdi." : "Ошибка.");
    } finally {
      setLoading(false);
    }
  };

  // 🛒 Cart is empty
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
          <h1 className="text-4xl font-serif font-bold mb-8">
            {t("cart.title")}
          </h1>

          {success && (
            <div className="p-4 mb-6 bg-green-100 text-green-700 rounded-lg">
              ✅ {t("cart.success")}
            </div>
          )}

          {/* Products list */}
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flexe gap-4">
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
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
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

          {/* Customer form */}
          <Card className="mb-6">
            <CardContent className="p-6 space-y-4">
              <input
                type="text"
                placeholder={language === "uz" ? "Ismingiz" : "Ваше имя"}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder={language === "uz" ? "Telefon" : "Телефон"}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder={language === "uz" ? "Manzil" : "Адрес"}
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </CardContent>
          </Card>

          {/* Total + Checkout */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="flexe justify-between items-center text-2xl font-bold mb-6">
                <span>{t("cart.total")}:</span>
                <span className="text-primary">
                  {total.toLocaleString()} so'm
                </span>
              </div>
              <div className="flexe gap-4">
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
                  {loading
                    ? "⏳ " +
                    (language === "uz"
                      ? "Yuborilmoqda..."
                      : "Отправляется...")
                    : t("cart.checkout")}
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