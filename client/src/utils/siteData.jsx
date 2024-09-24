import {
  ArrowRight,
  CaretDown,
  CaretUp,
  FashionAndBeautyIcon,
  GamingIcon,
  HelpIcon,
  HistoryIcon,
  HomeIcon,
  LearningIcon,
  LikeOutlinedIcon,
  LiveIcon,
  MoviesIcon,
  MusicIcon,
  NewsIcon,
  PlayListIcon,
  PodcastsIcon,
  ReportHistoryIcon,
  SendFeedbackIcon,
  SettingIcon,
  ShoppingIcon,
  ShortsIcon,
  SportsIcon,
  SubscriptionIcon,
  TrendingIcon,
  WatchLaterIcon,
  YouIcon,
  YouTubeKidsIcon,
  YouTubeMusicIcon,
  YouTubePremiumIcon,
  YouTubeStudioIcon,
  YourChannelIcon,
  YourVideosIcon,
} from "./Icons";

import ApnaCollege from "../assets/images/apnacollege.jpg";
import ArshGoyal from "../assets/images/arshgoyal.jpg";
import CodeWithHarry from "../assets/images/codewithharry.jpg";
import GateSmashers from "../assets/images/gatesmashers.jpg";
import GreatStack from "../assets/images/greatstack.jpg";
import MrWebdesigner from "../assets/images/mr.webdesigner.jpg";

export const sideBarLinks = [
  {
    icon: <HomeIcon />,
    title: "Home",
    link: "/",
  },
  {
    icon: <ShortsIcon />,
    title: "Shorts",
    link: "/shorts",
  },
  {
    icon: <SubscriptionIcon />,
    title: "Subscription",
    link: "/subscription",
  },
  {
    icon: <YouIcon />,
    title: "You",
    link: "/you",
  },
];

export const TopCategories = [
  "All",
  "Bigg Boss",
  "Music",
  "Gate Exam",
  "Live",
  "News",
  "Filmi",
  "Tmkoc",
  "Shorts",
  "Trending",
  "Movies",
  "Bollywood",
  "Hollywood",
  "Pavitra Rista",
];

export const menuBar = [
  {
    icon: <HomeIcon />,
    link: "/",
    title: "Home",
  },

  {
    icon: <ShortsIcon />,
    link: "/shorts",
    title: "Shorts",
  },

  {
    icon: <SubscriptionIcon />,
    link: "/feed/subscription",
    title: "Subscriptions",
  },

  {
    title: (
      <>
        You <ArrowRight />
      </>
    ),
    link: "/feed/you",
    isBlock: true,
    blockItems: [
      {
        icon: <YourChannelIcon />,
        link: "/channel/...",
        title: "Your Channel",
      },
      {
        icon: <HistoryIcon />,
        link: "https://www.youtube.com/feed/history",
        title: "History",
      },
      {
        icon: <PlayListIcon />,
        link: "/feed/playlist",
        title: "Playlist",
      },
      // TODO: Update Channel Link
      {
        icon: <YourVideosIcon />,
        link: "https://studio.youtube.com/channel/{CHANNEL_VIDEO}/videos",
        title: "Your Videos",
      },
      {
        icon: <WatchLaterIcon />,
        link: "/playlist?list=WL",
        title: "Watch later",
      },
      {
        icon: <LikeOutlinedIcon />,
        link: "/playlist?list=LL",
        title: "Liked Videos",
      },
    ],

  },

  {
    title: "Subscriptions",
    isBlock: true,
    blockItems: [
      {
        icon: <img src={ApnaCollege} alt="" />,
        link: "/@ApnaCollegeOfficial",
        title: "Apna College",
      },
      {
        icon: <img src={ArshGoyal} alt="" />,
        link: "/@ArshGoyal",
        title: "Arsh Goyal",
      },
      {
        icon: <img src={CodeWithHarry} alt="" />,
        link: "/@CodeWithHarry",
        title: "CodeWithHarry",
      },
      {
        icon: <img src={GateSmashers} alt="" />,
        link: "/@GateSmashers",
        title: "Gate Smashers",
      },
      {
        icon: <img src={GreatStack} alt="" />,
        link: "/@GreatStackDev",
        title: "GreatStack",
      },
      {
        icon: <img src={MrWebdesigner} alt="" />,
        link: "/@MrWebDesignerAnas",
        title: "Mr. Web Designer",
      },
      {
        icon: <img src={GreatStack} alt="" />,
        link: "/@GreatStackDev",
        title: "GreatStack",
      },
      {
        icon: <img src={MrWebdesigner} alt="" />,
        link: "/@MrWebDesignerAnas",
        title: "Mr. Web Designer",
      },
    ],
    blockInfo: {
      maxItems: 7,
      collapse: {
        title: "Show fewer",
        icon: <CaretUp />,
      },
      expand: {
        title: "Show More",
        icon: <CaretDown />,
      },
    },
  },

  {
    title: "explore",
    isBlock: true,
    blockItems: [
      {
        icon: <TrendingIcon />,
        link: "https://www.youtube.com/feed/trending?bp=6gQJRkVleHBsb3Jl",
        title: "Trending",
      },
      {
        icon: <ShoppingIcon />,
        link: "https://www.youtube.com/channel/UCkYQyvc_i9hXEo4xic9Hh2g",
        title: "Shopping",
      },
      {
        icon: <MusicIcon />,
        link: "https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ",
        title: "Music",
      },
      {
        icon: <MoviesIcon />,
        link: "https://www.youtube.com/feed/storefront?bp=ogUCKAU%3D",
        title: "Films",
      },
      {
        icon: <LiveIcon />,
        link: "https://www.youtube.com/channel/UC4R8DWoMoI7CAwX8_LjQHig",
        title: "Live",
      },
      {
        icon: <GamingIcon />,
        link: "https://www.youtube.com/gaming",
        title: "Gaming",
      },
      {
        icon: <NewsIcon />,
        link: "https://www.youtube.com/channel/UCYfdidRxbB8Qhf0Nx7ioOYw",
        title: "News",
      },
      {
        icon: <SportsIcon />,
        link: "https://www.youtube.com/channel/UCEgdi0XIXXZ-qJOFPf4JSKw",
        title: "Sports",
      },
      {
        icon: <LearningIcon />,
        link: "https://www.youtube.com/feed/courses_destination",
        title: "Courses",
      },
      {
        icon: <FashionAndBeautyIcon />,
        link: "https://www.youtube.com/channel/UCrpQ4p1Ql_hG8rKXIKM1MOQ",
        title: "Fashion & Beauty",
      },
      {
        icon: <PodcastsIcon />,
        link: "https://www.youtube.com/podcasts",
        title: "Podcasts",
      },
    ],
  },

  {
    title: "more from YouTube",
    isBlock: true,
    blockItems: [
      {
        icon: <YouTubePremiumIcon />,
        link: "https://www.youtube.com/premium",
        title: "YouTube Premium",
      },
      {
        icon: <YouTubeStudioIcon />,
        link: "https://studio.youtube.com",
        title: "YouTube Studio",
      },
      {
        icon: <YouTubeMusicIcon />,
        link: "https://music.youtube.com",
        title: "YouTube Music",
      },
      {
        icon: <YouTubeKidsIcon />,
        link: "https://www.youtubekids.com",
        title: "YouTube Kids",
      },
    ],
  },

  {
    isBlock: true,
    blockItems: [
      {
        icon: <SettingIcon />,
        link: "https://www.youtube.com/account",
        title: "Setting",
      },
      {
        icon: <ReportHistoryIcon />,
        link: "https://www.youtube.com/reporthistory",
        title: "Report history",
      },
      {
        icon: <HelpIcon />,
        link: "/help",
        title: "Help",
      },
      {
        icon: <SendFeedbackIcon />,
        link: "/feedback",
        title: "Send Feedback",
      },
    ],
  },
];
