export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  tags: string[];
  img: string;
  description: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  likes: number[];
}

export type RootStackParamList = {
  Home: undefined;
  Swipe: undefined;
  Search: undefined;
  Friends: undefined;
  Profile: undefined;
};
