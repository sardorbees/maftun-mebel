import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Mahsulotlar qanday materiallardan tayyorlanadi?",
    answer:
      "Rossiyadan import qilingan MDF, LDSP, HDF materiallarimiz ishonchli va yuqori sifatli materiallardir.",
  },
  {
    question: "Buyurtma qancha vaqtda tayyorlanadi?",
    answer:
      "Standart mahsulotlar 3-5 ish kunida, maxsus buyurtmalar esa 2-3 hafta ichida tayyorlanadi. Aniq muddatlar mahsulot murakkabligiga bog'liq. Bizni mahsulotlar kanveyirda usulda chiqariladi sababi, har doim mijoz buyurtma bergan kundayoq yetkaziladi.",
  },
  {
    question: "Yetkazib berish xizmati bormi?",
    answer:
      "Ha, biz O'zbekistonning barcha hududlariga yetkazib berish xizmatini taqdim etamiz. Mahsulotlarimiz usta tomonidan joyida yetkazib beriladi va yig'iladi. Mijoz tovarlarni qabul qilib olgandan so'ng, hisob-faktura tuziladi.",
  },
  {
    question: "Mahsulotlarni qaytarish mumkinmi?",
    answer:
      "Agar mahsulot shikastlangan yoki noto'g'ri kelgan bo'lsa, 14 kun ichida qaytarishingiz mumkin. Qaytarish shartlari to'liq saqlanishi kerak.",
  },
  {
    question: "Maxsus buyurtma berish mumkinmi?",
    answer:
      "Albatta! Biz sizning xohishingiz bo'yicha maxsus dizayn va o'lchamlarda mahsulotlar tayyorlaymiz. Batafsil ma'lumot uchun biz bilan bog'laning.",
  },
  {
    question: "Mahsulotlarga kafolat berila dimi?",
    answer:
      "Barcha mahsulotlarimizga ishlab chiqaruvchi kamchiliklariga qarshi 6 oylik kafolat beriladi. Notog'ri foydalanishdan kelib chiqqan shikastlar kafolatga kirmaydi.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-serif font-bold mb-6 text-center">
            Tez-tez so'raladigan savollar
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Mijozlarimiz tomonidan eng ko'p beriladigan savollar
          </p>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6 bg-card"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
