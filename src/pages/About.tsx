import { motion } from "framer-motion";
import { Award, Heart, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-serif font-bold mb-6 text-center">
            Biz haqimizda
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            MAFTUN-MEBEL - O'zbekistonda eng arzon ,sifatli va hamyonbop mebellar
          </p>

          {/* Main Image */}
          <div className="aspect-video rounded-lg overflow-hidden shadow-artisan mb-12">
            <img
              src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&q=80"
              alt="Workshop"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Story */}
          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-lg leading-relaxed mb-6">
              MAFTUN-MEBEL - mebellarimizni optim narhda taklif qilamiz.
              Etkazib va ornatib berish hizmatlati ham mavjud
            </p>
            <p className="text-lg leading-relaxed mb-6">
              MAFTUN MEBEL OʻZ SHOURUMINI OCHDI ENDILIKDA SIZ BEMALOL KELIB MAHSULOTLARIMIZNI KOʻRIB HARID QILISHINGIZ MUMKIN
            </p>
            <p className="text-lg leading-relaxed">
              Mahsulotlarimiz haqida, yuqori sifatli, bardoshli. Biz ruscha DSP + MDF laminatlaridan foydalanamiz
            </p>
            <br />
            <p className="text-lg leading-relaxed">
              Mahsulotlarning sifati ularning arzonligi bilan afzalliklarga ega.
            </p>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6 rounded-lg bg-card shadow-soft"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-xl mb-2">Mizhozlar savollariga javoblar</h3>
              <p className="text-muted-foreground">
                PVX PlASMAS KROMKA ISHLATILADI
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 rounded-lg bg-card shadow-soft"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-xl mb-2">Abduqodirov Ashirmat 2017 yilda ish boshlaganmiz</h3>
              <p className="text-muted-foreground">
                Men 7 ta shogird bilan ishlayman. Biz kichik o'lchamdagi mebel ishlab chiqaramiz.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center p-6 rounded-lg bg-card shadow-soft"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-xl mb-2">Asosan kanveir asosida mebel lar ishlab chikaramiz</h3>
              <p className="text-muted-foreground">
                Va biz uni mebel do'konlariga tarqatamiz
              </p>
            </motion.div>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-primary text-primary-foreground rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">
              Yutuqlarimiz
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">22+</div>
                <div className="text-primary-foreground/80">Yillik tajriba</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-primary-foreground/80">Baxtli mijozlar</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-primary-foreground/80">Noyob mahsulotlar</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
