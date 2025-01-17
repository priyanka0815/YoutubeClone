import { API } from "./api";

export const parseDuration = (duration) => {
  const match = duration?.match(/^P((?<day>\d+)D)?T((?<hour>\d+)H)?((?<minute>\d+)M)?((?<second>\d+)S)?$/),
    group = match?.groups;

  if (!group) return "00:00";

  let day = "",
    hour = "",
    minute = "00:",
    second = "00";

  if (group.day) day = group.day + ":";
  if (group.hour) hour = group.hour.padStart(2, "0") + ":";
  if (group.minute) minute = group.minute.padStart(2, "0") + ":";
  if (group.second) second = group.second.padStart(2, "0");

  return hour + minute + second;

  second = parseInt(second);

  if (second < 3600) {
    let min = String(parseInt(second / 60)).padStart(2, "0"),
      sec = String(second % 60).padStart(2, "0");

    return `${min}:${sec}`;
  }

  let hr = parseInt(second / 3600),
    min = String(parseInt((second % 3600) / 60)).padStart(2, "0"),
    sec = String(second % 60).padStart(2, "0");

  return `${hr}:${min}:${sec}`;
};

export const convertToInternationalNumber = (number, singluarText = "", pluralText = "") => {
  number = String(number);

  if (number <= 1) return `${number} ${singluarText}`;

  if (number < 1000) return `${number} ${pluralText}`;

  if (number < 1000000) return parseInt(number / 1000) + `K ${pluralText}`;

  if (number < 1000000000) return parseInt(number / 1000000) + `M ${pluralText}`;

  return parseInt(number / 1000000000) + `B ${pluralText}`;
};

export const calculateAge = (time) => {
  time = new Date(time);
  const age = new Date(new Date() - new Date(time)),
    year = age.getUTCFullYear() - 1970,
    month = age.getUTCMonth(),
    day = age.getUTCDate() - 1,
    week = parseInt(day / 7),
    hours = age.getUTCHours(),
    minutes = age.getUTCMinutes(),
    second = age.getUTCSeconds();

  if (year) {
    if (year > 1) return `${year} years ago`;
    return `1 year ago`;
  }

  if (month) {
    if (month > 1) return `${month} months ago`;
    return `1 month ago`;
  }

  if (week > 1) {
    return `${week} weeks ago`;
  }

  if (day) {
    if (day > 1) return `${day} days ago`;
    return `1 day ago`;
  }

  if (hours) {
    if (hours > 1) return `${hours} hours ago`;
    return `1 hours ago`;
  }

  if (minutes) {
    if (minutes > 1) return `${minutes} minutes ago`;
    return `1 minute ago`;
  }

  return `${second} seconds ago`;
};

export const addToggle = (e, toggleSelector, toggleTextObj = ["More", "Less"]) => {
  const elem = e.target;

  const parent = elem.closest(toggleSelector);
  if (parent?.classList.contains("toggle-active")) {
    parent.classList.remove("toggle-active");
    elem.innerHTML = toggleTextObj[0];
  } else {
    parent?.classList.add("toggle-active");
    elem.innerHTML = toggleTextObj[1];
  }
};

export const constructQueryFromObj = (obj) => {
  let query = [];

  for (let i in obj) {
    query.push(`${i}=${obj[i]}`);
  }

  return query.join("&");
};

export const openConsentScreen = () => {
  var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  var form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("action", oauth2Endpoint);

  var params = {
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_REDIRECT_URL,
    response_type: "token",
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl",
    include_granted_scopes: "true",
    state: "google-auth",
  };

  for (let p in params) {
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);

    form.append(input);
  }

  document.documentElement.append(form);
  form.submit();
};

export const formatVideoDescription = (text) => {
  if (!text) return;

  text = text.replaceAll(
    /https?:\/\/(?:www\.)?[^\s/$.?#].[^\s]*\??[^\s#]*#?[^\s]*/gi,
    (url) => `<a href={${url}} >${url.substr(0, 50) + (url.length > 50 ? "..." : "")}</a>`
  );

  text = text.replaceAll("\n", "<br />");

  return text;
};

export const fetchSubscribe = async (ytContextData, channelId) => {
  if (!ytContextData.googleAuth) return;

  const data = await API.getSubscription({
    body: constructQueryFromObj({ mine: true, forChannelId: channelId }),
    authorization: `${ytContextData.googleAuth.tokenType} ${ytContextData.googleAuth.accessToken}`,
  });

  return data;
};

export const addSubscription = async (ytContextData, channelId) => {
  if (!ytContextData?.googleAuth?.tokenType || !channelId) return;

  const data = await API.addSubscription({
    body: {
      part: "snippet",
      snippet: {
        resourceId: {
          kind: "youtube#subscription",
          channelId: channelId,
        },
      },
    },
    authorization: `${ytContextData.googleAuth.tokenType} ${ytContextData.googleAuth.accessToken}`,
  });

  return data;
};

export const removeSubscription = async (ytContextData, subscriptionId) => {
  if (!ytContextData.googleAuth.tokenType || !subscriptionId) return;

  const data = await API.removeSubsciption({
    body: {
      id: subscriptionId,
    },
    authorization: `${ytContextData.googleAuth.tokenType} ${ytContextData.googleAuth.accessToken}`,
  });

  return data;
};
