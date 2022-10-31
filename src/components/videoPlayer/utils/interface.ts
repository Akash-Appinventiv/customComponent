import { StyleProp, ViewStyle } from "react-native";

export interface progressProps {
  currentTime: number;
  playableDuration: number;
  seekableDuration: number;
}

export interface OnLoadData {
  canPlayFastForward: boolean;
  canPlayReverse: boolean;
  canPlaySlowForward: boolean;
  canPlaySlowReverse: boolean;
  canStepBackward: boolean;
  canStepForward: boolean;
  currentPosition: number;
  currentTime: number;
  duration: number;
  naturalSize: {
    height: number;
    width: number;
    orientation: 'portrait' | 'landscape';
  };
  videoTracks: Array<{
    bitrate: number;
    codecs: string;
    width: number;
    height: number;
    trackId: string;
  }>;
  audioTracks: Array<{
    index: number;
    title: string;
    language: string;
    type: string;
  }>;
  textTracks: Array<{
    index: number;
    title: string;
    language: string;
    type: string;
  }>;
}

export interface PlayerProps {
  useDefaultControls?: boolean;
  source:
    | {
        uri?: string | undefined;
        headers?: {[key: string]: string} | undefined;
        type?: string | undefined;
      }
    | number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  seekTime?: number;
  duration: number; // in seconds
}
