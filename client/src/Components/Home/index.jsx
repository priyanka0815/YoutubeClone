import React, { useEffect, useState } from "react";
import "./home.css";

import { TopCategories } from "../../utils/siteData";
import { TopCategory, VideoCard } from "../inc";
import { API } from "../../utils/api";

const index = () => {
  const [videos, setVideos] = useState([]);
  const [channelsDetail, setChannelsDetail] = useState(new Map());

  useEffect(() => {
    const getHomeVideos = async () => {
      const response = await API.getVideoDetails(
        `part=snippet,statistics,contentDetails&regionCode=IN&chart=mostPopular&maxResults=50`
      );

      if (response.isError) {
        throw new Error("Unable to load Home video", response);
      }
      setVideos(response.items);

      const videoIds = response.items.map((video) => video.snippet.channelId);
      const channelResponse = await API.getChannelDetails(`part=snippet&id=${videoIds.join(",")}&maxResults=50`);

      const channelMap = new Map();
      channelResponse.items.forEach((channel) => {
        channelMap.set(channel.id, channel.snippet);
      });

      setChannelsDetail(channelMap);
    };

    getHomeVideos();
  }, []);

  return (
    <div id="home">
      <TopCategory categories={TopCategories} />
      <div id="homegrid">
        {videos.map((video, idx) => (
          <VideoCard
            key={idx}
            video={video}
            channel={channelsDetail.get(video.snippet.channelId)}
            loadChannelInfo={false}
          />
        ))}
        {/* <VideoCard
          thumbnail="1.webp"
          videoId="watchtv"
          channelLogo="ZeeTv.jpg"
          channelName="ZeeTv"
          isVerified={true}
          channelHandle="dsgdg"
          duration="4516"
          totalViews="213531564"
          uploadTime="2024-08-15T11:15:14.319Z"
          videoTitle="Abhishek is a winner of BiggBoss 17 and runner up is Munawar Faruqi"
        /> */}
      </div>
    </div>
  );
};

export default index;
