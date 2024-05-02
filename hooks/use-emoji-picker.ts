import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import IEmojiPickerProps, { EmojiClickData } from "emoji-picker-react";

export default function useEmojiPicker(
  handleEmojiPick: (emoji: string) => void
) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    handleEmojiPick(emojiData.emoji);
  };

  const toggleEmojiPicker: React.MouseEventHandler = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  useOnClickOutside(pickerRef, () => {
    setIsOpen(false);
  });

  return {
    pickerRef,
    isOpen,
    toggleEmojiPicker,
    handleEmojiClick,
  };
}
