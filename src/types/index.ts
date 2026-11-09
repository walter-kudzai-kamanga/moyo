export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location: string;
  story: string;
  imageUrl: string;
  tags?: string[];
}

export interface TimelineMilestone {
  id: string;
  yearOrDate: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  highlight?: string;
}

export interface ReasonItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  romanticNote: string;
}

export interface OpenWhenEnvelope {
  id: string;
  title: string;
  tagline: string;
  mood: string;
  icon: string;
  color: string;
  letter: string;
  quote: string;
  suggestedAction?: string;
}

export interface BucketListItem {
  id: string;
  title: string;
  category: 'adventure' | 'cozy' | 'travel' | 'milestone';
  completed: boolean;
  notes?: string;
}

export interface TravelDestination {
  id: string;
  name: string;
  country: string;
  tagline: string;
  description: string;
  imageUrl: string;
  dreamActivity: string;
}

export interface AppreciationItem {
  id: string;
  category: 'notice' | 'appreciate' | 'never_forget';
  title: string;
  detail: string;
  icon: string;
}

export interface VoiceTrack {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  speechText: string;
}

export interface UserPersonalization {
  herName: string;
  herNickname: string;
  hisName: string;
  anniversaryDate: string;
  nextDate: string;
  nextDateTitle: string;
}
