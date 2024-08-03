import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUserHook } from "../../hooks/useUserHook";
import { setModalVisible } from "../../Redux/loginModalSlicer";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";

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
  refetchCallback: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<unknown, unknown>>;
}

const Poll: React.FC<PollPropsMain> = ({ pollAnswers, myPoll, refetchCallback }) => {
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

  useEffect(()=>{
    setPollStates((prev) => ({ 
      ...prev, 
      pollAnswersArray: pollAnswers,
      prevActiveAnswerID: myPoll,
      activePollId: myPoll,
    }));
  },[pollAnswers])


  const sendPollAnswer = async (id: number) => {
    refetchCallback
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
    //ვეძებთ აიდის მეშვებოით აქტიურ ინდექს არაიში
    const index = pollStates.pollAnswersArray.findIndex(element => element.id === pollStates.prevActiveAnswerID);

    //თუ ინდექსი არ მოიძებნდა და აიდი არ გვაქვს აქტიური რო არ დაისეტოს
    if (index >= 0) {
      setPollStates((prev) => ({ ...prev, prevActiveAnswerIndex: index, activeIndex: index }))
    }

  }, [pollStates.prevActiveAnswerID])



  const pollHandlerFuncs = (id: number, index: number) => {

    //if user is auth can vote
    if (user.isAuthenticated) {
      sendPollAnswer(id);

      //copied array
      const updatedAnswers = [...pollStates.pollAnswersArray];

      // თუ წინა ინდექი უდრის ნალს დაისეტოს ინდეხი, თუ არადა ნალი
      if (pollStates.prevActiveAnswerIndex === null) {
        setPollStates((prev) => ({ ...prev, prevActiveAnswerIndex: index }))
      } else {
        setPollStates((prev) => ({ ...prev, prevActiveAnswerIndex: null }))
      }

      //თუ აქტირუია პოლის პასუხი
      if (index === pollStates.activeIndex || id === pollStates.activePollId) {
        setPollStates((prev) => ({ ...prev, activePollId: null, activeIndex: null, prevActiveAnswerID: id }))
        updatedAnswers[index].sum -= 1;
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

      // განვაახლოთ სტეიტები პასუხები
      setPollStates((prev) => ({ ...prev, pollAnswersArray: updatedAnswers }));
    } else {
      //else show login modal
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
