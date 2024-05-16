import { useState } from "react";
import InputComponent from "../inputComponent/InputComponent";

const AnswerQuizComp = () => {

  const [answerValue, setAnswerValue] = useState('')

  return (
    <div>
      <div className="quiz_answer_input_container">
        <InputComponent
          widthProp={window.innerWidth > 430 ? "538px" : "280px"}
          heightProp={'44px'}
          type={"text"}
          autoComplete={""}
          placeholder={"Enter the correct answer"}
          value={answerValue}
          isError={false}
          onChange={(e)=>setAnswerValue(e.target.value)}
        />

        <div className="post_quiz_answer_text">
            <p>Post</p>
        </div>
      </div>
    </div>
  );
};

export default AnswerQuizComp;
