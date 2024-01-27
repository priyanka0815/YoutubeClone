import {
  ArrowRight,
  FashionAndBeautyIcon,
  GamingIcon,
  HelpIcon,
  HistoryIcon,
  HomeIcon,
  LearningIcon,
  LiveIcon,
  MoviesIcon,
  MusicIcon,
  NewsIcon,
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
} from './Icons';

import ApnaCollege from '../assets/images/apnacollege.jpg';
import ArshGoyal from '../assets/images/arshgoyal.jpg';
import CodeWithHarry from '../assets/images/codewithharry.jpg';
import GateSmashers from '../assets/images/gatesmashers.jpg';
import GreatStack from '../assets/images/greatstack.jpg';
import MrWebdesigner from '../assets/images/mr.webdesigner.jpg';

export const sideBarLinks = [
  {
    icon: <HomeIcon />,
    title: 'Home',
    link: '/',
  },
  {
    icon: <ShortsIcon />,
    title: 'Shorts',
    link: '/shorts',
  },
  {
    icon: <SubscriptionIcon />,
    title: 'Subscription',
    link: '/subscription',
  },
  {
    icon: <YouIcon />,
    title: 'You',
    link: '/you',
  },
];

export const TopCategories = [
  'All',
  'Bigg Boss',
  'Music',
  'Gate Exam',
  'Live',
  'News',
  'Filmi',
  'Tmkoc',
  'Shorts',
  'Trending',
  'Movies',
  'Bollywood',
  'Hollywood',
  'Pavitra Rista',
];

export const menuBar = [
  {
    icon: <HomeIcon />,
    link: '/',
    title: 'Home',
  },

  {
    icon: <ShortsIcon />,
    link: '/shorts',
    title: 'Shorts',
  },

  {
    icon: <SubscriptionIcon />,
    link: '/feed/subscription',
    title: 'Subscriptions',
  },

  {
    title: (
      <>
        You <ArrowRight />
      </>
    ),
    link: '/feed/you',
    isBlock: true,
    blockItems: [
      {
        icon: <YourChannelIcon />,
        link: '/channel/...',
        title: 'Your Channel',
      },
      {
        icon: <HistoryIcon />,
        link: '/feed/history',
        title: 'History',
      },
      {
        icon: <YourVideosIcon />,
        link: '/channel/.../videos',
        title: 'Your Videos',
      },
      {
        icon: <WatchLaterIcon />,
        link: '/playlist?list=WL',
        title: 'Watch later',
      },
    ],

    blockInfo: {
      maxItems: 4,
      collapse: {
        title: 'Show More',
        icon: '',
      },
      expand: {
        title: 'Show fewer',
        icon: '',
      },
    },
  },

  {
    title: 'Subscriptions',
    isBlock: true,
    blockItems: [
      {
        icon: <img src={ApnaCollege} alt="" />,
        link: '/@ApnaCollegeOfficial',
        title: 'Apna College',
      },
      {
        icon: <img src={ArshGoyal} alt="" />,
        link: '/@ArshGoyal',
        title: 'Arsh Goyal',
      },
      {
        icon: <img src={CodeWithHarry} alt="" />,
        link: '/@CodeWithHarry',
        title: 'CodeWithHarry',
      },
      {
        icon: <img src={GateSmashers} alt="" />,
        link: '/@GateSmashers',
        title: 'Gate Smashers',
      },
      {
        icon: <img src={GreatStack} alt="" />,
        link: '/@GreatStackDev',
        title: 'GreatStack',
      },
      {
        icon: <img src={MrWebdesigner} alt="" />,
        link: '/@MrWebDesignerAnas',
        title: 'Mr. Web Designer',
      },
    ],
  },

  {
    title: 'explore',
    isBlock: true,
    blockItems: [
      {
        icon: <TrendingIcon />,
        link: '/feed/trending',
        title: 'Trending',
      },
      {
        icon: <ShoppingIcon />,
        link: '/channel/...',
        title: 'Shopping',
      },
      {
        icon: <MusicIcon />,
        link: '/channel/...',
        title: 'Music',
      },
      {
        icon: <MoviesIcon />,
        link: '/feed/sorefront',
        title: 'Movies',
      },
      {
        icon: <LiveIcon />,
        link: '/channel/...',
        title: 'Live',
      },
      {
        icon: <GamingIcon />,
        link: '/gaming',
        title: 'Gaming',
      },
      {
        icon: <NewsIcon />,
        link: '/channel/...',
        title: 'News',
      },
      {
        icon: <SportsIcon />,
        link: '/channel/...',
        title: 'Sports',
      },
      {
        icon: <LearningIcon />,
        link: '/channel/...',
        title: 'Learning',
      },
      {
        icon: <FashionAndBeautyIcon />,
        link: '/channel/...',
        title: 'Fashion & Beauty',
      },
      {
        icon: <PodcastsIcon />,
        link: '/podcasts',
        title: 'Podcasts',
      },
    ],
  },

  {
    title: 'more from YouTube',
    isBlock: true,
    blockItems: [
      {
        icon: <YouTubePremiumIcon />,
        link: '/premium',
        title: 'YouTube Premium',
      },
      {
        icon: <YouTubeStudioIcon />,
        link: 'https://studio.youtube.com',
        title: 'YouTube Studio',
      },
      {
        icon: <YouTubeMusicIcon />,
        link: 'https://music.youtube.com',
        title: 'YouTube Music',
      },
      {
        icon: <YouTubeKidsIcon />,
        link: 'https://www.youtubekids.com',
        title: 'YouTube Kids',
      },
    ],
  },

  {
    isBlock: true,
    blockItems: [
      {
        icon: <SettingIcon />,
        link: '/account',
        title: 'Setting',
      },
      {
        icon: <ReportHistoryIcon />,
        link: '/reporthistory',
        title: 'Report history',
      },
      {
        icon: <HelpIcon />,
        link: '/help',
        title: 'Help',
      },
      {
        icon: <SendFeedbackIcon />,
        link: '/feedback',
        title: 'Send Feedback',
      },
    ],
  },
];
