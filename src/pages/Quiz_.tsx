import { QUIZ } from "../assets/newSvg/QUIZ"
import "./Quiz_.css"
import ButtonFilled from "../components/buttonFIlled/ButtonFilled"
import ButtonOutlined from "../components/buttonFIlled/ButtonOutlined"
import matrix from "../assets/matrix.webp"
import bacToFuture from "../assets/bacToFuture.webp"
import et from "../assets/e.t.webp"
import QUIZ_card from "../components/QUIZ_card/QUIZ_card"
import Footer from "../components/footer/Footer"
import PageLayout from "../components/pageLayout/PageLayout"


const Quiz_ = () => {
  return (
    <>
      <PageLayout>
        <div className="Quiz_">

          <div className="Quiz_inner">
            <div className="quiz_add_rules">

              {/* title */}
              <div className="quiz_add_rules_title">
                <p>Create a </p>
                {QUIZ}
              </div>

              {/* text */}
              <p className="quiz_add_rules_text">
                Welcome to the ... Quiz Creator! Here are the only rules you need to follow:<br /><br />

                All questions must be about movies.<br />
                Each question should have four possible answers, but only one of them is the right one.<br />
                Feel free to add photos to your questions, or skip them entirely. It’s your call!<br /><br />

                Get creative and have fun crafting your ultimate movie quiz!
              </p>

              {/* buttons */}
              <div className="Quiz_btns">
                <ButtonFilled text={"Get started!"} link={"/pages/CreateQuiz"} />
                <ButtonOutlined text={"Check out Quizzes"} link={""} />
              </div>
            </div>

            <div className="guess_info_cards">

              <div className="gc1">
                <QUIZ_card image={matrix} txt1={"Who is the main character"} txt2={"IN THIS MOVIE"} />
              </div>

              <div className="gc2">
                <QUIZ_card image={bacToFuture} txt1={"Can you name"} txt2={"THIS 80’S MOVIE"} />
              </div>

              <div className="gc3">
                <QUIZ_card image={et} txt1={"Can you name this movie"} txt2={"FROM ONE SCREENSHOT"} />
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
      <Footer />
    </>



  )
}

export default Quiz_