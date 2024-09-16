import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { Header, Sidebar } from "./Components/inc";
import Home from "./Components/Home";
import WatchPage from "./Components/Watch";
import Verify from "./Components/Verify";
import { YTProvider } from "./utils/YTContext";
import { ChannelDashboard, ChannelHome, ChannelPlayList, ChannelVideos } from "./Components/Channel";

const App = () => {
  return (
    <BrowserRouter>
      <YTProvider>
        <Header />

        <div id="main_screen">
          <Sidebar />

          <main>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />

                <Route path=":handle" element={<ChannelDashboard />}>
                  <Route index element={<ChannelHome />} />
                  <Route path="videos" element={<ChannelVideos />} />
                  <Route path="shorts" element={<ChannelVideos />} />
                  <Route path="live" element={<ChannelVideos />} />
                  <Route path="playlist" element={<ChannelPlayList />} />
                  <Route path="community" element={<ChannelVideos />} />
                </Route>

                <Route path="channel/:channelId" element={<ChannelDashboard />}>
                  <Route index element={<ChannelHome />} />
                  <Route path="videos" element={<ChannelVideos />} />
                  <Route path="shorts" element={<ChannelVideos />} />
                  <Route path="live" element={<ChannelVideos />} />
                  <Route path="playlist" element={<ChannelPlayList />} />
                  <Route path="community" element={<ChannelVideos />} />
                </Route>
              </Route>

              <Route path="/watch" element={<WatchPage />} />
              <Route path="/account/">
                <Route path="verify" element={<Verify />} />
              </Route>
            </Routes>
          </main>
        </div>
      </YTProvider>
    </BrowserRouter>
  );
};

export default App;
