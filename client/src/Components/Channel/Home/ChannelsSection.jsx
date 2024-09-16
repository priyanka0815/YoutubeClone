import React, { useEffect, useState } from "react";
import Section from "./Section";
import {
  addSubscription,
  convertToInternationalNumber,
  fetchSubscribe,
  removeSubscription,
} from "../../../utils/functions";
import { Link } from "react-router-dom";
import { useYtContext } from "../../../utils/YTContext";

const Card = (props) => {
  const [subscription, setSubscribed] = useState(false);
  const [ytContextData] = useYtContext();

  const addSubscribe = async (e) => {
    const data = await addSubscription(ytContextData, props.id);

    if (!data.isError) {
      setSubscribed({
        isSubscribed: true,
        subscriptionId: data.id,
      });
    }
  };

  const removeSubscribe = async (e) => {
    const data = await removeSubscription(ytContextData, subscription.subscriptionId);

    if (!data.isError) {
      setSubscribed({
        isSubscribed: false,
        subscriptionId: null,
      });
    }
  };

  useEffect(() => {
    async function fetchSubscribes() {
      const data = await fetchSubscribe(ytContextData, props.id);

      if (data && !data.isError) {
        if (data.items.length > 0) {
          setSubscribed((prevInfo) => ({
            isSubscribed: true,
            subscriptionId: data.items[0].id,
          }));
        }
      }
    }

    if (props.id) {
      fetchSubscribes();
    }
  }, [props.id]);

  return (
    <div className="channel-card">
      <Link to={props.snippet?.customUrl ? `/${props.snippet?.customUrl}` : `/channel/${props.snippet?.channelId}`}>
        <div className="channel-info">
          <div className="channel-logo">
            <img src={props.snippet?.thumbnails.medium.url} alt={`${props.snippet?.title}\'s Channel Avatar`} />
          </div>
          <h4 className="text-ellipsis">{props.snippet?.title}dasakdasjdasjldjasljfldjsajf;s</h4>

          <span className="subscriber-count">
            {convertToInternationalNumber(props.statistics?.subscriberCount, "subscriber", "subscribers")}
          </span>
        </div>
      </Link>

      <div className="subscribe">
        {subscription.isSubscribed ? (
          <button className="unsubscribe" onClick={removeSubscribe}>
            Unsubscribe
          </button>
        ) : (
          <button className="subscribe" onClick={addSubscribe}>
            Subscribe
          </button>
        )}
      </div>
    </div>
  );
};
const ChannelsSection = (props) => {
  if (!props.channelsData || props.channelsData.length == 0) {
    return <></>;
  }

  return (
    <Section
      Card={Card}
      className="channel-section"
      // sectionTitleLink={`/playlist?list=${props.id}`}
      sectionTitle={props.sectionData?.snippet?.title}
      // titlePlayAllLink={`/watch?${constructQueryFromObj({
      //   v: playlistItem[0]?.snippet.resourceId?.videoId,
      //   list: props.id,
      // })}`}
      // playlistId={props.id}
      cardData={props.channelsData}
    />
  );
};

export default ChannelsSection;
