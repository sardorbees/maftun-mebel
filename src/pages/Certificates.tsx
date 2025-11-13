import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Certificate {
  id: number;
  image: string;
  created_at: string;
}

const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCertificates = async () => {
    try {
      const res = await axios.get<Certificate[]>(
        "http://127.0.0.1:8000/api/certifikat/images/"
      );
      setCertificates(res.data);
    } catch (err) {
      console.error("❌ Sertifikatlarni yuklashda xato:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();

    // 🔁 автообновление каждые 5 секунд (не слишком часто)
    const interval = setInterval(fetchCertificates, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-muted-foreground animate-pulse">
          Sertifikatlar yuklanmoqda...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 text-center">
            Sertifikatlar
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground text-center mb-10">
            Bizning yutuqlarimiz va mukofotlarimiz
          </p>

          {/* 🏆 Sertifikatlar grid */}
          {certificates.length > 0 ? (
            <div
              className="
                grid
                gap-6
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
              "
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 rounded-2xl">
                    <div className="relative">
                      <img
                        src={cert.image}
                        alt={`Certificate ${cert.id}`}
                        className="w-full h-auto object-contain rounded-t-2xl"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center shadow-md">
                        <Award className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                Sertifikatlar mavjud emas 😔
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Certificates;