import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../components/assets/css/media.css";
import one from '../components/assets/img/mebel/one.jfif'
import two from '../components/assets/img/mebel/two.jpg'

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper"; // <--- сюда
import "swiper/css";
import "swiper/css/pagination";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string | number;
  old_price?: string | number;
  image: string;
  is_new: boolean;
  in_stock: boolean;
  created_at?: string;
}

const Home = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Загружаем товары из API
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/product/");
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Ошибка загрузки:", err);
      setLoading(false);
    }
  };

  // Автообновление каждую секунду
  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 1000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: "Bizning mebellar",
      image: one,
      ctaLink: "/products",
    },
    {
      title: "Bizning mebellar",
      image: two,
      ctaLink: "/products",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* 🟠 HERO SECTION */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Swiper
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-full h-full flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="container text-center z-10 text-white"
                >
                  <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-gradient">
                    {t(slide.title)}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                    {t(slide.subtitle)}
                  </p>
                  <Link to={slide.ctaLink}>
                    <Button size="lg" className="group">
                      {t("home.hero.cta")}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>


      {/* 🟣 FEATURED PRODUCTS */}
      <section className="py-20 container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-serif font-bold">
              {t("home.featured")}
            </h2>
            <Link to="/products">
              <Button variant="ghost" className="group">
                {t("home.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Состояния загрузки */}
          {loading ? (
            <p className="text-center text-muted-foreground text-lg">
              Mahsulotlar yuklanmoqda...
            </p>
          ) : products.length === 0 ? (
            <p className="text-center text-muted-foreground text-lg">
              Mahsulotlar topilmadi 😔
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={String(product.id)}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  old_price={product.old_price}
                  image={product.image}
                  is_new={product.is_new}
                  in_stock={product.in_stock}
                />
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* 🟢 ABOUT SECTION */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6">
                MAFTUN MEBEL
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                MAFTUN MEBEL OʻZ SHOURUMINI OCHDI ENDILIKDA SIZ BEMALOL KELIB MAHSULOTLARIMIZNI KOʻRIB HARID QILISHINGIZ MUMKIN
              </p>
              <Link to="/about">
                <Button variant="outline" className="group">
                  Batafsil
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden shadow-artisan">
              <img
                src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80"
                alt="Artisan at work"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;