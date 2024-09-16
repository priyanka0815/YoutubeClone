import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { API } from "../../utils/api";
import { constructQueryFromObj } from "../../utils/functions";
import { PlayListCard } from "../inc";

const ChannelPlayList = () => {
  const [channelDetails] = useOutletContext();
  const [playlistData, setPlaylistData] = useState([]);

  useEffect(() => {
    const fetchPlayLists = async () => {
      const response = await API.getPlayList(
        constructQueryFromObj({
          part: "snippet,status,contentDetails",
          channelId: channelDetails.id,
          maxResults: 20,
        })
      );

      if (!response.isError) {
        setPlaylistData(response.items);
      }
    };

    if (channelDetails.id) fetchPlayLists();
  }, [channelDetails.id]);
  return (
    <div className="playlist-grid">
      {playlistData.length == 0 && <h2>No Item Available in the Playlist</h2>}

      {playlistData.map((item, idx) => (
        <PlayListCard {...item} key={idx} />
      ))}
    </div>
  );
};

export default ChannelPlayList;
