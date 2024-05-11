import { VideoCard } from "@/components/VideoCard";
import { Box } from "@chakra-ui/react";
import { createClient } from "pexels";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setvideos] = useState<Array<any>>([]);
  const [videosLoaded, setvideosLoaded] = useState<Boolean>(false);

  const randomQuery = () => {
    const queries = ["Funny", "Art", "Animals", "Coding", "Space"];
    return queries[Math.floor(Math.random() * queries.length)];
  };

  const getVideos = (length : any) => {
    // Replace with your Pexels API Key
    const client = createClient("cRMrkHJu2v1W9pEgo8w4SpybDYQE6k2v1Zq5LPpqUiP72esLQVIXjiph");

    const query = randomQuery();
    client.videos
      .search({ query, per_page: length })
      .then((result) => {
        setvideos((oldVideos) => [...oldVideos, ...result.videos]);
        setvideosLoaded(true);
      })
      .catch((e) => setvideosLoaded(false));
  };

  useEffect(() => {
    getVideos(20);
  }, []);

  return (
    <Box>
      <Box 
        h={"100vh"}
        overflowY={"scroll"}
        scrollSnapType={"y mandatory"}
        scrollBehavior={"auto"}
        scrollSnapStop={"always"}
        overscrollBehaviorY={"contain"}
      >
        {videos.length > 0 ? (
          <>
            {videos.map((video, id) => (
              <VideoCard
                key={id}
                index={id}
                author={video.user.name}
                videoURL={video.video_files[0].link}
                authorLink={video.user.url}
                lastVideoIndex={videos.length - 1}
                getVideos={getVideos}
              />
            ))}
          </>
        ) : (
          <>
            <h1>Nothing to show here</h1>
          </>
        )}
      </Box>
    </Box>
  );
}