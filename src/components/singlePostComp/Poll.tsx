import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { useDispatch } from "react-redux";
import { useUserHook } from "../../hooks/useUserHook";
import { setModalVisible } from "../../Redux/loginModalSlicer";

interface PollProps {
  id: number;
  title: string;
  sum: number;
}

interface PollPropsMain {
  pollAnswers: PollProps[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<unknown, unknown>>;
  data: number;
}

const Poll: React.FC<PollPropsMain> = ({ pollAnswers, data, refetch }) => {
  const { user } = useUserHook()
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
      await axios.get(
        `${import.meta.env.VITE_POLL_ANSWERING}${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setActiveIndex(data)
  }, [data])


  const setActivePollItem = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex(null); // Unset if the same item is clicked again
    } else {
      setActiveIndex(index); // Set the clicked item as active
    }
  };

  const pollHanlderFuncs = (id: number, index: number) => {
    if (user.name && user.userID) {
      sendPollAnswer(id)
      setActivePollItem(index)
    } else {
      dispatch(setModalVisible(true))
    }
  }

  return (
    <>
      <div className="poll_container">
        {pollAnswers?.map((poll: PollProps, index: number) => {
          return (
            <div
              key={index}
              onClick={() => pollHanlderFuncs(poll.id, index)}
              className="poll_item"
            >
              <span className="poll_item_bg vote_txt"
                style={{
                  width: poll.sum !== 0 ? `calc(${Math.round((100 / answersSum) * poll.sum)}% - 10px)` : '68px',
                  backgroundColor:
                    poll.id === activeIndex || activeIndex === index
                      ? "var(--Secondary-400)"
                      : "var(--Primary-600)",
                }}
              >
                <p className="poll_item_text votes_count_txt">
                  {poll.sum === 0 ? 'vote' : poll.sum}  {poll.sum !== 0 ? 'votes' : null}
                </p>
              </span>
              <p className="poll_item_text poll_item_name"> {poll.title} </p>
            </div>
          );
        })}
      </div>

    </>
  )
};

export default Poll;
