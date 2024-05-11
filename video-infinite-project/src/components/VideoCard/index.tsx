import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useIsInViewport } from '../UseVideoViewport';
import { AspectRatio, Box, Link, Text } from '@chakra-ui/react';

interface VideoCardProps {
    index: number;
    author: string;
    videoURL: string;
    authorLink: string;
    lastVideoIndex: number;
    getVideos: (numVideos: number) => void;
}

export function VideoCard({
    index,
    author,
    videoURL,
    authorLink,
    lastVideoIndex,
    getVideos,
}: VideoCardProps) {
    const video = useRef<HTMLVideoElement>(null);
    const isInViewport = useIsInViewport(video);
    const [loadNewVidsAt, setloadNewVidsAt] = useState<number>(lastVideoIndex);

    if (isInViewport) {
        setTimeout(() => {
            video.current?.play();
        }, 1000);

        if (loadNewVidsAt === Number(video.current?.id)) {
            setloadNewVidsAt((prev: number) => prev + 2);
            getVideos(3);
        }
    }

    const togglePlay = () => {
        const currentVideo = video.current;
        if (currentVideo && currentVideo.paused) {
            currentVideo.play();
        } else {
            currentVideo?.pause();
        }
    };

    useEffect(() => {
        if (!isInViewport) {
            video.current?.pause();
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
                    id={index.toString()}
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
}
