import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

interface PollProps {
  id: number;
  title: string;
  sum: number;
}

interface PollPropsMain {
  pollAnswers: any[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  data: {
    post: {
      myPoll: number;
    };
  };
}

const Poll: React.FC<PollPropsMain> = ({ pollAnswers, data, refetch }) => {
  const [answersSum, setAnswersSum] = useState(0);

  useEffect(() => {
    // Calculate the total sum of poll answers
    const totalSum = pollAnswers.reduce((acc, poll) => acc + poll.sum, 0);
    setAnswersSum(totalSum);
  }, [pollAnswers]);

  useEffect(()=>{
    console.log(answersSum);
    
  },[answersSum])

  const sendPollAnswer = async (id: number) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `https://api.pinky.ge/api/pollAnswering/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return pollAnswers?.map((poll: PollProps) => {
    return (
      <div
        key={poll.id}
        onClick={() => sendPollAnswer(poll.id)}
        className="poll_item"
      >
        <span
          className="poll_item_bg"
          style={{
            width: `${Math.round(100 / answersSum * poll.sum)}%`,
            backgroundColor:
              poll.id === data?.post?.myPoll
                ? "var(--purple)"
                : "var(--poll-item)",
          }}
        />
        <p className="poll_item_text"> {poll.title} </p>
        <p className="poll_item_text">{Math.round(100 / answersSum * poll.sum)}%</p>
      </div>
    );
  });
};

export default Poll;
