import { generateMessage } from "@/utils/helpers";
import { Server } from "socket.io";
import { SimpleIntervalJob, Task, ToadScheduler } from "toad-scheduler";

type Props = {
  socket: Server;
};

const DELAY_SECONDS = 10;

export const ChatBot = ({ socket }: Props) => {
  const scheduler = new ToadScheduler();

  const start = () => {
    const task = new Task("emit bot message", () => {
      const botMessage = generateMessage();
      socket.emit("new-message", botMessage);
    });

    const job = new SimpleIntervalJob({ seconds: DELAY_SECONDS }, task);
    scheduler.addSimpleIntervalJob(job);
  };

  return { start };
};
