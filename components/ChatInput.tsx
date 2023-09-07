import { Edit3, Send } from "lucide-react";
import React, { FC, useState } from "react";
import Spinner from "./Spinner";

interface ChatInputProps {
  isLoading: boolean;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}

const ChatInput: FC<ChatInputProps> = ({
  isLoading,
  setText,
  text,
  handleSubmit,
}) => {
  return (
    <form
      className="border rounded-lg overflow-hidden  focus-within:ring-2 focus-within:ring-blue-500 w-full flex items-center"
      onSubmit={handleSubmit}
    >
      <input
        className="outline-none py-3 px-4 w-full"
        type="text"
        placeholder="Explore local curture"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {isLoading ? (
        <div className="mr-4">
          <Spinner />
        </div>
      ) : (
        <button className="mr-4" type="submit">
          {!!text ? (
            <Send size={20} />
          ) : (
            <Edit3 size={20} className="text-gray-400" />
          )}
        </button>
      )}
    </form>
  );
};

export default ChatInput;
