import InputComponent from "../inputComponent/InputComponent";

const AnswerQuizComp = () => {
  return (
    <div>
      <div className="quiz_answer_input_container">
        <InputComponent
          widthProp="538px"
          heightProp={'44px'}
          type={"text"}
          autoComplete={""}
          placeholder={"Enter the correct answer"}
          value={""}
          isError={false}
        />

        <div className="post_quiz_answer_text">
            <p>Post</p>
        </div>
      </div>
    </div>
  );
};

export default AnswerQuizComp;
