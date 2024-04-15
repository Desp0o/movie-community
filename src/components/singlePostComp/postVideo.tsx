import React from "react";

interface PostVideoProps {
  image: string;
}

const PostVideo: React.FC<PostVideoProps> = ({ image }) => {
  const videoStoragePath = import.meta.env.VITE_VIDEO_PATH;

  return (
    <video width="100%" height="100%" style={{maxHeight: '350px'}} controls controlsList="nodownload">
      <source src={`${videoStoragePath}${image}`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default PostVideo;
