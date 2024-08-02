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

interface PollState {
  answersSum: number;
  activePollId: number | null;
  activeIndex: number | null;
  prevActiveAnswerIndex: number | null;
  prevActiveAnswerID: number | null;
  pollAnswersArray: PollProps[];
}

interface PollPropsMain {
  pollAnswers: PollProps[];
  myPoll: number;
}

const Poll: React.FC<PollPropsMain> = ({ pollAnswers, myPoll }) => {
  const { user } = useUserHook()
  const dispatch = useDispatch()

  const [pollStates, setPollStates] = useState<PollState>({
    answersSum: 0,
    activePollId: myPoll,
    activeIndex: null,
    prevActiveAnswerIndex: null,
    prevActiveAnswerID: myPoll,
    pollAnswersArray: pollAnswers
  })

  useEffect(() => {
    // Calculate the total sum of poll answers
    const totalSum = pollStates.pollAnswersArray.reduce((acc, poll) => acc + poll.sum, 0);
    setPollStates((prev) => ({ ...prev, answersSum: totalSum }));
  }, [pollStates.pollAnswersArray]);


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

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const index = pollStates.pollAnswersArray.findIndex(element => element.id === pollStates.prevActiveAnswerID);
    setPollStates((prev) => ({ ...prev, prevActiveAnswerIndex: index }))

    console.log(pollStates.prevActiveAnswerIndex + " წინა");

  }, [pollStates.prevActiveAnswerID])

  const pollHandlerFuncs = (id: number, index: number) => {
    if (user.isAuthenticated) {
      sendPollAnswer(id);

      // Copy array to avoid direct mutation
      const updatedAnswers = [...pollStates.pollAnswersArray];

      if (index === pollStates.activeIndex || id === pollStates.activePollId) {
        updatedAnswers[index].sum -= 1;
        setPollStates((prev) => ({ ...prev, activePollId: null, activeIndex: null, prevActiveAnswerIndex: null }))

      } else {
        updatedAnswers[index].sum += 1;
        if (pollStates.prevActiveAnswerIndex !== null && pollStates.prevActiveAnswerID !== null) {
          updatedAnswers[pollStates.prevActiveAnswerIndex].sum -= 1;
        }
        setPollStates((prev) => ({
          ...prev,
          activePollId: updatedAnswers[index].id,
          activeIndex: index,
          prevActiveAnswerID: id
        }))
      }

      setPollStates((prev) => ({ ...prev, pollAnswersArray: updatedAnswers }));
    } else {
      dispatch(setModalVisible(true));
    }
  };

  return (
    <>
      <div className="poll_container">
        {pollStates.pollAnswersArray?.map((poll: PollProps, index: number) => {
          return (
            <div
              key={index}
              onClick={() => pollHandlerFuncs(poll.id, index)}
              className="poll_item"
            >
              <span className="poll_item_bg vote_txt"
                style={{
                  width: poll.sum !== 0 ? `calc(${Math.round((100 / pollStates.answersSum) * poll.sum)}% - 10px)` : '68px',
                  backgroundColor:
                    poll.id === pollStates.activePollId || index === pollStates.activeIndex
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
