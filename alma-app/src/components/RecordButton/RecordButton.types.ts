import { GestureResponderEvent } from "react-native";

export interface IRecordButtonProps {
  size: number;
  strokeWidth?: number;
  onStart?: (event: GestureResponderEvent) => void;
  onEnd?: (event: GestureResponderEvent) => void;
}
