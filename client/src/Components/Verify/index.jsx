import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useYtContext } from "../../utils/YTContext";

const Verify = () => {
  const navigate = useNavigate();
  const [contextData, setContextData] = useYtContext();

  useEffect(() => {
    (async function () {
      const hash = window.location.hash;

      const googleAuthJson = {
        accessToken: hash.match(/access_token=([a-zA-Z0-9\-_.]+)/)[1],
        tokenType: hash.match(/token_type=([a-zA-Z]+)/)[1],
        expireTime: Date.now() + hash.match(/expires_in=([\d]+)/)[1] * 1000,
      };

      localStorage.setItem("googleAuth", JSON.stringify(googleAuthJson));

      // getting user info
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            method: "get",
            headers: {
              Authorization: googleAuthJson.tokenType + " " + googleAuthJson.accessToken,
            },
          }),
          data = await res.json();

        if (data.error) {
          localStorage.removeItem("googleAuthJson");
          localStorage.removeItem("userInfo");
        } else {
          localStorage.setItem("userInfo", JSON.stringify(data));
          setContextData((prevContextData) => ({
            ...prevContextData,
            userInfo: data,
            googleAuth: googleAuthJson,
          }));
        }
      } catch (e) {
        console.log("Failed to get user Info", e);
      }

      navigate("/", { replace: true });
    })();
  }, []);

  return <div>Verify</div>;
};

export default Verify;
