"use client";

import dynamic from "next/dynamic";
import useEmojiPicker from "@/hooks/use-emoji-picker";
// import Picker from "emoji-picker-react";
import { HiOutlineEmojiHappy } from "react-icons/hi";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const EmojiPickerButton = ({
  onEmojiPick: handleEmojiPick,
}: {
  onEmojiPick: (emoji: string) => void;
}) => {
  const { pickerRef, toggleEmojiPicker, isOpen, handleEmojiClick } =
    useEmojiPicker(handleEmojiPick);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleEmojiPicker}
        className="p-1 rounded  hover:bg-gray-400/50"
      >
        <HiOutlineEmojiHappy className=" w-5 h-5 my-auto" />
      </button>
      {isOpen && (
        <div ref={pickerRef} className="absolute bottom-8 right-0 ">
          <Picker onEmojiClick={handleEmojiClick} skinTonesDisabled />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerButton;
