import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import one from '../components/assets/img/product/one.jpg'
import two from '../components/assets/img/product/two.jpg'
import three from '../components/assets/img/product/three.jpg'
import four from '../components/assets/img/product/four.jpg'

// Mock featured products
const featuredProducts = [
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
];

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-warm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container text-center z-10"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-gradient">
            {t("home.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t("home.hero.subtitle")}
          </p>
          <Link to="/products">
            <Button size="lg" className="group">
              {t("home.hero.cta")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-serif font-bold">{t("home.featured")}</h2>
            <Link to="/products">
              <Button variant="ghost" className="group">
                {t("home.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* About Preview */}
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
                Sattorova bilan tanishing
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Ko'p yillik tajriba va an'anaviy hunarmandchilikka sadoqat bilan,
                har bir mahsulot noyob va maxsus e'tibor bilan yaratiladi.
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