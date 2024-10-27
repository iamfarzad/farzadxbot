// src/types/index.ts

export type TweetStatus = 'draft' | 'scheduled' | 'posted' | 'failed';
export type TweetType = 'single' | 'thread';
export type MediaType = 'image' | 'video' | 'gif';

export interface TweetEngagement {
  likes: number;
  retweets: number;
  replies: number;
  impressions?: number;
  clickRate?: number;
}

export interface MediaAsset {
  url: string;
  type: MediaType;
  altText?: string;
  size?: number;
}

export interface Tweet {
  id: string;
  content: string;
  scheduledTime?: Date;
  status: TweetStatus;
  mediaUrls?: string[];
  media?: MediaAsset[];
  type: TweetType;
  engagement?: TweetEngagement;
  threadIds?: string[];  // For linked tweets in a thread
  metadata?: {
    source: 'ai' | 'template' | 'manual';
    template?: string;
    tags?: string[];
    category?: string;
  };
  analytics?: {
    bestPerformingTime?: Date;
    audienceReach?: number;
    sentimentScore?: number;
  };
}

export interface BotStats {
  tweetsPosted: number;
  engagement: number;
  followers: number;
  following: number;
  dailyLimit: number;
  remainingCalls: number;
  performance?: {
    weeklyGrowth: number;
    engagementRate: number;
    averageLikes: number;
    bestPerformingHours: string[];
    topHashtags: string[];
  };
  limits?: {
    apiCallsRemaining: number;
    resetTime: Date;
    dailyTweetsUsed: number;
  };
  history?: {
    dailyTweets: number[];
    weeklyEngagement: number[];
    followerGrowth: number[];
  };
}

export interface ContentFilters {
  bannedWords: string[];
  sensitiveTopics: string[];
  languagePreferences: string[];
  sentimentThresholds: {
    minimum: number;
    maximum: number;
  };
}

export interface SchedulingPreferences {
  startTime: string;
  endTime: string;
  timezone: string;
  preferredDays?: string[];
  blackoutPeriods?: {
    start: Date;
    end: Date;
    reason?: string;
  }[];
  postingFrequency?: {
    minimum: number;  // minutes between posts
    maximum: number;
  };
}

export interface AISettings {
  temperature: number;
  maxTokens: number;
  presencePenalty: number;
  frequencyPenalty: number;
  topP: number;
  stopSequences?: string[];
}

export interface BotSettings {
  dailyTweetLimit: number;
  enableNotifications: boolean;
  autoReply: boolean;
  contentFilters: ContentFilters;
  aiSettings: AISettings;
  schedulingPreferences: SchedulingPreferences;
  engagement: {
    autoLike: boolean;
    autoRetweet: boolean;
    autoFollow: boolean;
    followBackEnabled: boolean;
    unfollowAfterDays?: number;
  };
  safety: {
    rateLimit: number;
    maxThreadLength: number;
    minTimeBetweenPosts: number;
    emergencyStopEnabled: boolean;
    backupFrequency: 'daily' | 'weekly' | 'monthly';
  };
  notifications: {
    email: boolean;
    desktop: boolean;
    telegram?: string;
    discord?: string;
    notifyOn: {
      errors: boolean;
      limits: boolean;
      engagement: boolean;
      newFollowers: boolean;
    };
  };
}

export interface BotAnalytics {
  performance: {
    engagementRate: number;
    followerGrowth: number;
    impressions: number;
    clickThroughRate: number;
  };
  timing: {
    bestPostingTimes: string[];
    worstPostingTimes: string[];
    audienceActiveHours: string[];
  };
  content: {
    topPerformingTweets: Tweet[];
    commonHashtags: string[];
    effectiveKeywords: string[];
    contentCategories: {
      category: string;
      performance: number;
    }[];
  };
  audience: {
    demographics?: {
      locations: string[];
      interests: string[];
      activeHours: string[];
    };
    engagement: {
      mostEngagedFollowers: string[];
      replyRate: number;
      retweetRate: number;
    };
  };
}

export interface EmergencyControls {
  stopBot: () => Promise<void>;
  deletePendingTweets: () => Promise<void>;
  resetSettings: () => Promise<void>;
  backupData: () => Promise<string>;
  restoreFromBackup: (backupId: string) => Promise<void>;
}

// Additional utility types
export type DateRange = {
  start: Date;
  end: Date;
};

export type AnalyticsPeriod = '24h' | '7d' | '30d' | '90d' | 'custom';

export interface PerformanceMetrics {
  period: AnalyticsPeriod;
  dateRange?: DateRange;
  metrics: {
    [key: string]: number | string;
  };
}