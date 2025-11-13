import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import axios from "axios";

interface GalleryImage {
  id: number;
  image: string;
  created_at: string;
}

const ImageGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchImages = () => {
    axios
      .get<GalleryImage[]>("http://127.0.0.1:8000/api/img/images/")
      .then((res) => setImages(res.data))
      .catch((err) => console.error("Ошибка загрузки изображений:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // Сразу загружаем изображения
    fetchImages();

    // Интервал для автообновления каждую секунду
    const interval = setInterval(() => {
      fetchImages();
    }, 1000);

    // Очистка интервала при размонтировании
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Загрузка изображений...</p>;
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
            Rasm Gallery
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Mahsulotlar va ustaxona fotosuratlari
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(img.image)}
              >
                <img
                  src={img.image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Gallery view"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;