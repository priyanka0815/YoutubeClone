import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { Header, Sidebar } from "./Components/inc";
import Home from "./Components/Home";
import WatchPage from "./Components/Watch";
import Verify from "./Components/Verify";
import { YTProvider } from "./utils/YTContext";
import Channel from "./Components/Channel";
import ChannelVideos from "./Components/Channel/ChannelVideos";

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
                <Route path=":handle" element={<Channel />}>
                  <Route index path="home" element={<ChannelVideos />} />
                  <Route path="videos" element={<ChannelVideos />} />
                  <Route path="shorts" element={<ChannelVideos />} />
                  <Route path="live" element={<ChannelVideos />} />
                  <Route path="playlist" element={<ChannelVideos />} />
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
