import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useIsInViewport } from '../UseVideoViewport';
import { AspectRatio, Box, Link, Text } from '@chakra-ui/react';

export function VideoCard({
    index,
    author,
    videoURL,
    authorLink,
    lastVideoIndex,
    getVideos, }: any) {
    const video = useRef();
    const isInViewport = useIsInViewport(video);
    const [loadNewVidsAt, setloadNewVidsAt] = useState(lastVideoIndex);

    if (isInViewport) {
        setTimeout(() => {
            video?.current?.play();
        }, 1000);

        if (loadNewVidsAt === Number(video?.current?.id)) {
            setloadNewVidsAt((prev) => prev + 2);
            getVideos(3);
        }
    }

    const togglePlay = () => {
        let currentVideo = video?.current;
        if (currentVideo.paused) {
            currentVideo?.play();
        } else {
            currentVideo?.pause();
        }
    };

    useEffect(() => {
        if (!isInViewport) {
            video?.current?.pause();
        }
    }, [isInViewport]);

    return (
        <Box
            h={"100vh"}
            scrollSnapAlign={"start"}
            scrollSnapStop={"always"}
            bg={"#000"}
            position={"relative"}
            border={"1px solid transparent"}
        >
            <AspectRatio
                w={"100%"}
                h={"100%"}
                objectFit={"cover"}
                position={"absolute"}
            >
                <video
                    loop={true}
                    muted
                    ref={video}
                    onClick={togglePlay}
                    id={index}
                    autoPlay={index === 1}
                >
                    <source src={videoURL} type="video/mp4" />
                </video>
            </AspectRatio>
            <Box 
                p={"10px"} 
                position={"relative"} 
                top={"10%"} 
                color={"white"} 
                onClick={togglePlay}
            >
                <Text>@{author}</Text>
                <Text>
                    Video by <Link href={authorLink}>{author} </Link> on Pexel
                </Text>
            </Box>
        </Box>
    );
};