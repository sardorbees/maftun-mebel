import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import '../components/assets/css/media.css'

interface Video {
  id: string;
  title: string;
  thumbnail?: string;
  duration?: string;
  video: string; // URL самого видео
}

const VideoGallery = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Функция для загрузки видео
  const fetchVideos = () => {
    axios
      .get<Video[]>("http://127.0.0.1:8000/api/video/videos/")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error("Ошибка загрузки видео:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // Сразу загружаем видео
    fetchVideos();

    // Устанавливаем интервал для автообновления каждую секунду
    const interval = setInterval(() => {
      fetchVideos();
    }, 1000);

    // Очистка интервала при размонтировании
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Загрузка видео...</p>;
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
            Video Gallery
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Ishlab chiqarish jarayoni va ustaxona videolari
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="group cursor-pointer overflow-hidden hover:shadow-artisan transition-all duration-300"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative aspect-video">
                    <video
                      src={video.video}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play
                          className="w-6 h-6 text-primary-foreground ml-1"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{video.title}</h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Диалог с видео */}
      <Dialog
        open={!!selectedVideo}
        onOpenChange={() => setSelectedVideo(null)}
      >
        <DialogContent className="max-w-4xl p-0">
          {selectedVideo && (
            <video
              src={selectedVideo.video}
              controls
              autoPlay
              style={{ background: 'none' }}
              className="w-fulle h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoGallery;