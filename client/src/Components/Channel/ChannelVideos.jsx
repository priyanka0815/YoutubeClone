import React, { useEffect, useState } from "react";
import { VideoCard } from "../inc";
import { API } from "../../utils/api";
import { useOutletContext } from "react-router-dom";
import { constructQueryFromObj } from "../../utils/functions";

const ChannelHeader = () => {
  const [channelDetails] = useOutletContext();
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState("date");

  useEffect(() => {
    const getVideos = async () => {
      const response = await API.getSearch(
        constructQueryFromObj({
          part: "id",
          channelId: channelDetails.id,
          order: order,
          maxResults: 50,
          type: "video",
          videoEmbeddable: true,
        })
      );

      if (response.isError) {
        throw new Error("Unable to load Home video", response);
      }

      const videoIds = response.items.map((video) => video.id.videoId);
      const videoResponse = await API.getVideoDetails(
        constructQueryFromObj({
          part: "snippet,statistics,contentDetails",
          id: videoIds,
        })
      );

      console.log(videoResponse);

      setVideos(videoResponse.items);
    };

    if (channelDetails.id) getVideos();
  }, [channelDetails.id]);

  return (
    <div className="video-grid">
      {videos.map((video, idx) => (
        <VideoCard
          key={idx}
          video={video}
          // channel={channelsDetail.get(video.snippet.channelId)}
          isLogoAllowed={false}
          isChannelNameAllowed={false}
          loadChannelInfo={false}
        />
      ))}
    </div>
  );
};

export default ChannelHeader;
