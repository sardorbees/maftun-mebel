import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import '../components/assets/css/media.css';

// 🎥 Импорт локальных файлов
import video1 from "../components/assets/img/video/one.mp4";
import video2 from "../components/assets/img/video/two.mp4";
import video3 from "../components/assets/img/video/three.mp4";
import video4 from "../components/assets/img/video/four.mp4";

interface Video {
  id: string;
  title: string;
  video: string;
}

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // 🎥 Локальные видео
  const videos: Video[] = [
    { id: "1", title: "Ustaxona 1", video: video1 },
    { id: "2", title: "Jarayon 2", video: video2 },
    { id: "3", title: "Ishlab chiqarish 3", video: video3 },
    { id: "4", title: "Ishlab chiqarish 3", video: video4 },
  ];

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
                      // muted
                      // loop
                      // playsInline
                      // autoPlay
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
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoGallery;