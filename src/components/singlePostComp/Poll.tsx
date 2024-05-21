import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { setRefetch } from "../../Redux/RefetchSlicer";
import { useRefetchHook } from "../../hooks/useRefetchHook";
import { useDispatch } from "react-redux";

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
  data: number;
}

const Poll: React.FC<PollPropsMain> = ({ pollAnswers, data, refetch }) => {
  const { requestRefetch } = useRefetchHook()
  const dispatch = useDispatch()
  const [answersSum, setAnswersSum] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(data);



  useEffect(() => {
    // Calculate the total sum of poll answers
    const totalSum = pollAnswers.reduce((acc, poll) => acc + poll.sum, 0);
    setAnswersSum(totalSum);
  }, [pollAnswers]);


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
      dispatch(setRefetch(!requestRefetch))
      console.log(requestRefetch + " refetching");
      
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    setActiveIndex(data)
  },[data])


  const setActivePollItem = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex(null); // Unset if the same item is clicked again
    } else {
      setActiveIndex(index); // Set the clicked item as active
    }
  };

  return (
    <>
      <div className="poll_container">
      {pollAnswers?.map((poll: PollProps, index: number) => {
        return (
          <div
            key={index}
            onClick={() => (sendPollAnswer(poll.id), setActivePollItem(index))}
            className="poll_item"
          >
            <span className="poll_item_bg"
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
              {answersSum > 0 ? Math.round((100 / answersSum) * poll.sum) : 0}%
            </p>
          </div>
        );
      })}
      </div>

      <p className="poll_answer_sum_txt">{answersSum} votes</p>
    </>
  )
};

export default Poll;
