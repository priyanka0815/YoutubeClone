import React, { createContext, useContext, useState } from "react";

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

  const [data, setData] = useState(contextData);

  return <YtContext.Provider value={[data, setData]}>{children}</YtContext.Provider>;
};

export const useYtContext = () => {
  return useContext(YtContext);
};
export { YTProvider };
