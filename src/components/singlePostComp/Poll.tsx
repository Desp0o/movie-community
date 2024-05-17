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
  const [isVoted, setVoted] = useState(data.post.myPoll === 0 ? false : true)

    useEffect(()=>{
        console.log(isVoted);
        
    },[isVoted])


  useEffect(() => {
    // Calculate the total sum of poll answers
    const totalSum = pollAnswers.reduce((acc, poll) => acc + poll.sum, 0);

        setAnswersSum(totalSum);


  }, [pollAnswers]);

  useEffect(() => {
    console.log(answersSum);
  }, [answersSum]);

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


  const [activeIndex, setActiveIndex] = useState<number | null>(data?.post?.myPoll);

  const setActivePollItem = (index: number) => {
    if (index === activeIndex) {
        setActiveIndex(null); // Unset if the same item is clicked again
      } else {
        setActiveIndex(index); // Set the clicked item as active
      }
  };

  return (
    <>
    
    {pollAnswers?.map((poll: PollProps, index: number) => {
    return (
      <div
        key={poll.id}
        onClick={() => (sendPollAnswer(poll.id), setActivePollItem(index))}
        className="poll_item" 
      >
        <span
          className="poll_item_bg"
          style={{
            width: poll.sum === 0 ? '10px' : `${Math.round((100 / answersSum) * poll.sum)}%`,
            backgroundColor:
              poll.id === activeIndex || activeIndex === index
                ? "var(--purple)"
                : "var(--poll-item)",
          }}
        />
        <p className="poll_item_text"> {poll.title} </p>
        <p className="poll_item_text">
          {Math.round((100 / answersSum) * poll.sum)}%
        </p>
      </div>
    );
  })}

  <p>{answersSum}</p>
    </>
  )
};

export default Poll;
