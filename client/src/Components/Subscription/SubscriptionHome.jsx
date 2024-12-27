import React, { useEffect, useState } from "react";
import { useYtContext } from "../../utils/YTContext";
import { API } from "../../utils/api";
import { constructQueryFromObj } from "../../utils/functions";
import { VideoCard } from "../inc";

const SubscriptionHome = () => {
  const [ytContextData] = useYtContext();
  const [videos, setVideos] = useState([]);
  const channelsDetail = new Map(
    ytContextData.subscribedChannels?.map((channel) => [channel.channelId, channel]) || []
  );

  useEffect(() => {
    const fetchVideos = async () => {
      // getting upload playlist form channel data
      const channelIds = ytContextData.subscribedChannels.map((channel) => channel.channelId).join(",");

      let res = await API.getChannelDetails(
        constructQueryFromObj({
          part: "snippet,contentDetails",
          // channelId: channelIds,
          id: channelIds,
          // order: "date",
          // type: "video",
          maxResults: 50,
        })
      );

      if (res.isError) return;

      const uploadPlaylists = res.items?.map((item) => ({ [item.id]: item.contentDetails.relatedPlaylists?.uploads }));

      // getting videos from each playlist
      const playListPromise = [];
      for (const playlist of uploadPlaylists) {
        playListPromise.push(
          API.getPlayListItems({
            body: constructQueryFromObj({
              part: "snippet,status",
              playlistId: playlist[Object.keys(playlist)[0]],
              maxResults: 50,
            }),
          })
        );
      }


      const responses = await Promise.all(playListPromise);
      const playlistVideos = responses.map(response => {
        if(!response.isError) return response.items
        else return []
      }).flat();

      setVideos(
        playlistVideos
          .map((item) => ({
            id: item.snippet.resourceId.videoId,
            snippet: item.snippet,
            status: item.status,
          }))
          .sort((a, b) => (new Date(a.snippet.publishedAt) > new Date(b.snippet.publishedAt) ? -1 : 1))
          .splice(0, 100)
      );
    };

    if (ytContextData.subscribedChannels) {
      fetchVideos();
    }
  }, [ytContextData.subscribedChannels]);

  return (
    <div id="homegrid" className="video-grid">
      {videos?.map((video, idx) => (
        <VideoCard
          key={idx}
          video={video}
          channel={channelsDetail.get(video.snippet.channelId)}
          loadChannelInfo={false}
        />
      ))}
    </div>
  );
};

export default SubscriptionHome;
