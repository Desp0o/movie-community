import React, { LegacyRef, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

interface PostVideoProps {
  image: string;
}

const PostVideo: React.FC<PostVideoProps> = ({ image }) => {
  const videoStoragePath = import.meta.env.VITE_VIDEO_PATH;

  const [hasPlayed, setHasPlayed] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isControlShown, setControlShown] = useState(false)

  const showControlers = () => {
    setControlShown(true)
  }

  const hideControlers = () => {
    setControlShown(false)
  }

  // eslint-disable-next-line
  const videoRef: LegacyRef<any> | undefined = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the element is intersecting the viewport
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (!hasPlayed) {
            setHasPlayed(true);
          }
        } else {
          setIsIntersecting(false);
        }
      },
      {
        threshold: 0.5 
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [hasPlayed]);

  return (
    <div className="video_container" ref={videoRef} onMouseEnter={showControlers} onMouseLeave={hideControlers}>
      <ReactPlayer
        className='react-player'
        url={`${videoStoragePath}${image}`}
        playing={isIntersecting}
        controls={isControlShown}
        muted={true}
        width='100%'
        height='100%'
        ref={videoRef}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
              playsInline: true
            }
          }}}
      />
    </div>
  );
};

export default PostVideo;
