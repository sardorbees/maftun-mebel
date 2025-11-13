import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import '../components/assets/css/media.css';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    question: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/applicationapplications/",
        formData
      );
      toast({
        title: "Xabar yuborildi!",
        description: "Tez orada siz bilan bog'lanamiz.",
      });
      setFormData({ full_name: "", phone: "", question: "" });
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      toast({
        title: "Xatolik!",
        description: "Xabar yuborilmadi. Iltimos, qayta urinib ko'ring.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-serif font-bold mb-6 text-center">
            Aloqa
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Biz bilan bog'laning, sizning savollaringizga javob beramiz
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Telefon</h3>
                      <a href="tel:+998946776780">
                        <p className="text-muted-foreground">+998 94 677 67 80</p>
                      </a>
                      <a href="tel:+998937428993">
                        <p className="text-muted-foreground">+998 93 742 89 93</p>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Telegram</h3>
                      <a href="https://t.me/Mebelshitsa">
                        <p className="text-muted-foreground">MAFTUN MEBEL</p>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Manzil</h3>
                      <p className="text-muted-foreground">
                        Yangi Toshkent
                        <br />
                        JalolTepa MFY. Mehribon ko'chasi 1 Uy
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Ismingiz
                    </label>
                    <Input
                      value={formData.full_name}
                      onChange={(e) =>
                        setFormData({ ...formData, full_name: e.target.value })
                      }
                      placeholder="Ismingizni kiriting"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Telefon
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+998 90 123 45 67"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Savol / Xabar
                    </label>
                    <Textarea
                      value={formData.question}
                      onChange={(e) =>
                        setFormData({ ...formData, question: e.target.value })
                      }
                      placeholder="Xabaringizni yozing..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Yuborilmoqda..." : "Xabar yuborish"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="contact mt-12">
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.7301916877127!2d69.24837617631839!3d41.3147328004983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0e21fe50fb%3A0xb4b0cff7a63ec7e!2z0YPQuy4g0K_QvdCz0Lgg0KLQvtGI0LrQtdC90YIsINCi0LDRiNC60LXQvdGCLCBUYXNoa2VudCwg0KPQt9Cx0LXQutC40YHRgtCw0L0!5e0!3m2!1sru!2s!4v1763020129625!5m2!1sru!2s"
                allowFullScreen
                loading="lazy"
                title="Наш офис в Ташкенте"
              ></iframe>
            </div>
            <p className="map-caption mt-2 text-center text-muted-foreground">
              Мы на карте — Ташкент, улица ...
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;