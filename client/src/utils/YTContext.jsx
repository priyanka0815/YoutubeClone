import React, { createContext, useContext, useState } from "react";
import { menuBar, TopCategories } from "./siteData";
import { API } from "./api";
import { constructQueryFromObj } from "./functions";

const YtContext = createContext();
const YTProvider = ({ children }) => {
  const contextData = {};
  let temp;

  if ((temp = localStorage.getItem("googleAuth"))) {
    temp = JSON.parse(temp);

    if (temp.expireTime < Date.now()) {
      localStorage.removeItem("googleAuth");
      localStorage.removeItem("userInfo");
    } else {
      contextData.googleAuth = temp;

      if ((temp = localStorage.getItem("userInfo"))) {
        contextData.userInfo = JSON.parse(temp);
      }
    }
  }

  contextData.siteBarData = menuBar;

  const [data, setData] = useState(contextData);

  loadChannelData(data, setData);
  loadSubscribedChannels(data, setData);

  return <YtContext.Provider value={[data, setData]}>{children}</YtContext.Provider>;
};

const loadChannelData = async (contextData, setContextData) => {
  if (!contextData.googleAuth || contextData.channelId) {
    return;
  }

  const res = await API.getMyChannel({
    body: constructQueryFromObj({ part: "id" }),
    authorization: `${contextData.googleAuth.tokenType} ${contextData.googleAuth.accessToken}`,
  });

  if (!res.isError && res.items && res.items.length > 0) {
    setContextData((prevContextData) => ({
      ...prevContextData,
      channelId: res.items[0].id,
    }));
  }
};

const loadSubscribedChannels = async (ytContextData, setYtContextData) => {
  if (!ytContextData.googleAuth || ytContextData.subscribedChannels) {
    return;
  }

  const res = await API.getMySubscriptionOnly({
    body: "",
    authorization: `${ytContextData.googleAuth.tokenType} ${ytContextData.googleAuth.accessToken}`,
  });

  if (res.isError || !res.items) return;

  const subscribed = res.items.map((item) => ({
    title: item.snippet.title,
    channelId: item.snippet.resourceId.channelId,
    thumbnails: item.snippet.thumbnails,
    newItemCount: item.contentDetails.newItemCount,
  }));

  setYtContextData((prevContextData) => ({
    ...prevContextData,
    subscribedChannels: subscribed,
  }));

  addSubscriberToMenuBar(subscribed, setYtContextData);
};

const addSubscriberToMenuBar = (subscribed, setYtContextData) => {
  setYtContextData((prevContextData) => {
    const subcribedMenuBarData = subscribed.map((item) => ({
      icon: <img src={item.thumbnails?.default.url} alt={`${item.title}&apos;s channel logo`} />,
      link: `/channel/${item.channelId}`,
      title: item.title,
      haveUpdate: item.newItemCount > 0,
    }));

    prevContextData.siteBarData.find((e) => e.key === "subscription").blockItems = subcribedMenuBarData;

    return prevContextData;
  });
};

export const useYtContext = () => {
  return useContext(YtContext);
};
export { YTProvider };
