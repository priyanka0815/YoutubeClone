import React, { useEffect, useState } from "react";
import { API } from "../../../utils/api";
import { constructQueryFromObj } from "../../../utils/functions";
import Section from "./Section";
import { VideoCard } from "../../inc";

const Card = (props) => {
  return (
    <VideoCard
      video={{
        ...props,
        id: props.snippet.resourceId.videoId,
        channel: {
          title: props.snippet.videoOwnerChannelTitle,
          channelId: props.snippet.videoOwnerChannelId,
          customUrl: null,
        },
      }}
      isLogoAllowed={false}
    />
  );
};

const PlaylistSection = (props) => {
  const [playlistItem, setPlayListItem] = useState([]);

  useEffect(() => {
    const fetchPlayListData = async () => {
      const response = await API.getPlayListItems(
        constructQueryFromObj({
          part: "snippet,contentDetails,status",
          playlistId: props.id,
          maxResults: 50,
        })
      );

      if (response.isError) {
        console.log("ERROR : While Fetching Home Playlist Data", response);
        return;
      }

      setPlayListItem(response.items?.filter((item) => item.status.privacyStatus != "private"));
    };

    if (props.id) {
      fetchPlayListData();
    }
  }, [props.id]);

  return (
    props.playlistData && (
      <Section
        className="playlist"
        Card={Card}
        sectionTitleLink={`/playlist?list=${props.id}`}
        sectionTitle={props.playlistData.title}
        titlePlayAllLink={`/watch?${constructQueryFromObj({
          v: playlistItem[0]?.snippet.resourceId?.videoId,
          list: props.id,
        })}`}
        playlistId={props.id}
        cardData={playlistItem.slice(0, 8)}
      />
    )
  );
};

export default PlaylistSection;
