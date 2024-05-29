import React from "react";
import { TopCategory, VideoCard } from "../inc";

const Playlist = () => {
  const categories = ["All", "From JioStudios", "Bigg Boss", "Pavitra Rista", "TMKOC", "Zee Tv"];
  return (
    <div id="watch_playlist" className="">
      <TopCategory categories={categories} />

      <div className="playlist">
        <VideoCard video={{ id: "" }} />
      </div>
    </div>
  );
};

export default Playlist;
