import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import "./style.css";
import {
  calculateAge,
  constructQueryFromObj,
  convertToInternationalNumber,
  fetchSubscribe,
  formatVideoDescription,
} from "../../../utils/functions";
import { API } from "../../../utils/api";
import PlaylistSection from "./PlaylistSection";
import ChannelsSection from "./ChannelsSection";
import { useYtContext } from "../../../utils/YTContext";

const Home = () => {
  const [channelDetails] = useOutletContext();
  const [ytContextData] = useYtContext();
  const [playlistsInfo, setPlayListsInfo] = useState();
  const [channelsInfo, setChannelsInfo] = useState();
  const [sectionsData, setSectionsData] = useState([]);
  const [trailerInfo, setTrailerInfo] = useState(false);

  useEffect(() => {
    const extractIds = (arr) => {
      const singlePlayList = new Set(),
        channels = new Set();

      arr.forEach((item) => {
        const type = item.snippet.type;
        if (type == "singleplaylist") {
          singlePlayList.add(item.contentDetails.playlists[0]);
        } else if (type == "multiplechannels") {
          item.contentDetails.channels.forEach((channel) => channels.add(channel));
        }
      });

      return {
        playlist: singlePlayList,
        channels,
      };
    };

    const fetchPlayLists = async (ids) => {
      if (!ids) return;

      const response = await API.getPlayList(
        constructQueryFromObj({
          part: "snippet,contentDetails",
          id: [...ids].join(","),
        })
      );

      if (response.isError) {
        console.log("Error: while getting Playlist info");
        return;
      }

      const map = new Map();
      response.items.forEach((item) => {
        map.set(item.id, item.snippet);
      });

      setPlayListsInfo(response.items);
    };

    const fetchChannels = async (ids) => {
      const response = await API.getChannelDetails(
        constructQueryFromObj({ part: "snippet,statistics", id: [...ids].join(",") })
      );

      if (response.isError) {
        console.log("Error : while Fetching Channels Detail", response);
        return;
      }

      setChannelsInfo(response.items);
    };

    const getResources = async (processedIds) => {
      if (processedIds.playlist) {
        await fetchPlayLists(processedIds.playlist);
      }
      if (processedIds.channels) {
        await fetchChannels(processedIds.channels);
      }
    };

    const fetchSections = async () => {
      const response = await API.getChannelSectionDetails(
        constructQueryFromObj({
          part: "id,snippet,contentDetails",
          channelId: channelDetails.id,
        })
      );

      if (response.isError) {
        console.log("ERROR: While Fetching Channel Sections", response);
      } else {
        setSectionsData(response.items);

        const processedIds = extractIds(response.items);
        getResources(processedIds);
      }
    };

    if (channelDetails.id) {
      fetchSections();
    }
  }, [channelDetails.id]);

  useEffect(() => {
    const fetchVideo = async () => {
      const data = await API.getVideoDetails(
        `part=snippet,statistics&id=${channelDetails?.brandingSettings?.channel?.unsubscribedTrailer}`
      );

      if (!data.isError && data.items.length > 0) {
        setTrailerInfo(data.items[0]);
      }
    };

    if (!channelDetails?.isSubscribed && channelDetails?.brandingSettings?.channel?.unsubscribedTrailer) {
      fetchVideo();
    }
  }, [channelDetails?.brandingSettings?.channel?.unsubscribedTrailer]);

  return (
    <div>
      {!channelDetails?.isSubscribed && channelDetails?.brandingSettings?.channel?.unsubscribedTrailer && (
        <section className="channel-home-section">
          <div id="unsubscribe_trailer">
            <div id="watch_video">
              <iframe
                width="1280px"
                height="720px"
                src={`https://www.youtube.com/embed/${
                  channelDetails?.brandingSettings?.channel?.unsubscribedTrailer ?? ""
                }`}
                title={trailerInfo?.snippet?.title ?? "YouTube video player"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-detail">
              <h4>
                <Link to={`/watch?v=${trailerInfo?.id}`}>{trailerInfo?.snippet?.title}</Link>
              </h4>

              <span className="bold counter">
                {`${convertToInternationalNumber(trailerInfo?.statistics?.viewCount ?? 0, "view", "views")}`}
                {" • "}
                {trailerInfo?.snippet?.liveBroadcastContent == "live" && "Streamed "}
                {`${calculateAge(trailerInfo?.snippet?.publishedAt)} `}
              </span>

              <p
                className="text-ellipsis"
                dangerouslySetInnerHTML={{ __html: formatVideoDescription(trailerInfo?.snippet?.description) }}
              ></p>

              <span className="bold">
                <Link className="read-more" to={`/watch?v=${trailerInfo?.id}`}>
                  Read More
                </Link>
              </span>
            </div>
          </div>
        </section>
      )}

      {sectionsData.map((item, idx) => {
        if (item.snippet.type == "singleplaylist") {
          return (
            <PlaylistSection
              key={idx}
              id={item.contentDetails.playlists[0]}
              // playlistData={playlistsInfo ? playlistsInfo.get(item.contentDetails.playlists[0]) : null}
              playlistData={playlistsInfo?.filter((e) => item.contentDetails?.playlists?.includes(e.id))[0].snippet}
            />
          );
        } else if ((item.snippet.type = "multipleChannels")) {
          return (
            <ChannelsSection
              key={idx}
              channelsData={channelsInfo?.filter((e) => item.contentDetails?.channels?.includes(e.id))}
              sectionData={item}
            />
          );
        }
      })}
    </div>
  );
};

export default Home;
