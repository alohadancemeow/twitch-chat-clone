"use client";

import React from "react";
import { MessageModel } from "@/utils/models";

import ChatMessage from "./ChatMessage";
import ChatPausedAlert from "./ChatPausedAlert";
import SendMessageForm from "./SendMessageForm";

import useChatMessages from "@/hooks/use-chat-messages";
import useChatLiveModeScrolling from "@/hooks/use-chat-live-mode-scrolling";

const Chat = () => {
  const { messages, send } = useChatMessages();
  const { chatMessagesBoxRef, isLiveModeEnabled, scrollNewMessages } =
    useChatLiveModeScrolling<HTMLDivElement>(messages);

  return (
    <div className="relative w-full max-w-[550px] px-4 py-3 rounded-lg bg-slate-900 opacity-80">
      <ChatMessagesBox ref={chatMessagesBoxRef} messages={messages} />
      {!isLiveModeEnabled && (
        <ChatPausedAlert
          onClick={scrollNewMessages}
          className="absolute inset-x-0 bottom-28 mx-auto"
        />
      )}
      <SendMessageForm onSend={send} className="mt-4" />
    </div>
  );
};

const ChatMessagesBox = React.forwardRef<
  HTMLDivElement,
  { messages: MessageModel[] }
>(({ messages }, ref) => {
  const MessageList = messages.map((message) => (
    <ChatMessage key={message.id} className="mb-1" message={message} />
  ));

  return (
    <div ref={ref} className="h-[70vh] overflow-auto">
      {MessageList}
    </div>
  );
});

export default Chat;
