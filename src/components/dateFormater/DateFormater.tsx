import React, { useEffect, useState } from "react";

interface DateFormaterProps {
  date: string;
}

const DateFormater: React.FC<DateFormaterProps> = ({ date }) => {

  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTimeAgo = () => {
      const seconds = Math.floor(
        (new Date().getTime() - new Date(date).getTime()) / 1000
      );

      let interval;
      interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        setTimeAgo(`${interval} year ago`);
        return;
      }

      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        setTimeAgo(`${interval} month ago`);
        return;
      }

      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        setTimeAgo(`${interval} day ago`);
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
    <p className="elapsed_time">{timeAgo}</p>
  );
};

export default DateFormater;
