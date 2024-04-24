import React, { useEffect, useState } from "react";
import { useDarkModeHook } from "../../hooks/useDarkModeHook";

interface DateFormaterProps {
  date: string;
}

const DateFormater: React.FC<DateFormaterProps> = ({ date }) => {
  const { isDark } = useDarkModeHook();

  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTimeAgo = () => {
      const seconds = Math.floor(
        (new Date().getTime() - new Date(date).getTime()) / 1000
      );

      let interval;
      interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        setTimeAgo(`${interval} years ago`);
        return;
      }

      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        setTimeAgo(`${interval} months ago`);
        return;
      }

      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        setTimeAgo(`${interval} days ago`);
        return;
      }

      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        setTimeAgo(`${interval} hours ago`);
        return;
      }

      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        setTimeAgo(`${interval} minutes ago`);
        return;
      }

      setTimeAgo(`Just now`);
    };

    updateTimeAgo();

    const intervalId = setInterval(updateTimeAgo, 60000);

    return () => clearInterval(intervalId);
  }, [date]);
  return (
    <p className={isDark ? "elapsed_time dark" : "elapsed_time"}>{timeAgo}</p>
  );
};

export default DateFormater;
