import React from 'react';
import './home.css';

import TopCategory from './TopCategory';
import VideoCard from './VideoCard';

const index = () => {
  return (
    <div id="home">
      <TopCategory />
      <div id="homegrid">
        <VideoCard
          thumbnail="1.webp"
          videoId="watchtv"
          channelLogo="ZeeTv.jpg"
          channelName="ZeeTv"
          isVerified={true}
          channelHandle="dsgdg"
          duration="12"
          totalViews="235"
          uploadTime="2024-01-25T11:15:14.319Z"
        />
      </div>
    </div>
  );
};

export default index;