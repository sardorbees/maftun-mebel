import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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

  const fetchCertificates = () => {
    axios
      .get<Certificate[]>("http://127.0.0.1:8000/api/certifikat/images/")
      .then((res) => setCertificates(res.data))
      .catch((err) => console.error("Ошибка загрузки сертификатов:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCertificates();

    const interval = setInterval(() => {
      fetchCertificates();
    }, 1000); // автообновление каждую секунду

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Загрузка сертификатов...</p>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-serif font-bold mb-6 text-center">
            Sertifikatlar
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Yutuqlar va mukofotlar
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-artisan transition-all duration-300">
                  <div className="aspect-[4/3] bg-muted relative">
                    <img
                      src={cert.image}
                      alt={`Certificate ${cert.id}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certificates;