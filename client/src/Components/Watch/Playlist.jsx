import React from 'react';
import { TopCategory, VideoCard } from '../inc';

const Playlist = () => {
  const categories = ['All', 'From JioStudios', 'Bigg Boss', 'Pavitra Rista', 'TMKOC', 'Zee Tv'];
  return (
    <div id="watch_playlist" className="">
      <TopCategory categories={categories} />

      <div className="playlist">
        <VideoCard
          thumbnail="1.webp"
          videoId="watchtv"
          channelLogo="ZeeTv.jpg"
          channelName="ZeeTv"
          isVerified={true}
          channelHandle="dsgdg"
          duration="4516"
          totalViews="213531564"
          uploadTime="2024-01-25T11:15:14.319Z"
          videoTitle="Abhishek is a winner of BiggBoss 17 and runner up is Munawar Faruqi"
          isPlaylistItem={true}
          isLogoAllowed={false}
        />

        <VideoCard
          thumbnail="1.webp"
          videoId="watchtv"
          channelLogo="ZeeTv.jpg"
          channelName="ZeeTv"
          isVerified={true}
          channelHandle="dsgdg"
          duration="4516"
          totalViews="213531564"
          uploadTime="2024-01-25T11:15:14.319Z"
          videoTitle="Abhishek is a winner of BiggBoss 17 and runner up is Munawar Faruqi"
          isPlaylistItem={true}
          isLogoAllowed={false}
        />

        <VideoCard
          thumbnail="1.webp"
          videoId="watchtv"
          channelLogo="ZeeTv.jpg"
          channelName="ZeeTv"
          isVerified={true}
          channelHandle="dsgdg"
          duration="4516"
          totalViews="213531564"
          uploadTime="2024-01-25T11:15:14.319Z"
          videoTitle="Abhishek is a winner of BiggBoss 17 and runner up is Munawar Faruqi"
          isPlaylistItem={true}
          isLogoAllowed={false}
        />

        <VideoCard
          thumbnail="1.webp"
          videoId="watchtv"
          channelLogo="ZeeTv.jpg"
          channelName="ZeeTv"
          isVerified={true}
          channelHandle="dsgdg"
          duration="4516"
          totalViews="213531564"
          uploadTime="2024-01-25T11:15:14.319Z"
          videoTitle="Abhishek is a winner of BiggBoss 17 and runner up is Munawar Faruqi"
          isPlaylistItem={true}
          isLogoAllowed={false}
        />
      </div>
    </div>
  );
};

export default Playlist;
