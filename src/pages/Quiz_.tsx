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
import { useLanguage } from "../hooks/useLanguage"
import DOMPurify from 'dompurify';


const Quiz_ = () => {

  const { selectedLanguage } = useLanguage()
  const sanitizedHTML = DOMPurify.sanitize(selectedLanguage.quiz_.rules);

  return (
    <>
      <PageLayout>
        <div className="Quiz_">

          <div className="Quiz_inner">
            <div className="quiz_add_rules">

              {/* title */}
              <div className="quiz_add_rules_title">
                <p>{selectedLanguage.quiz_.title} </p>
                {QUIZ}
              </div>

              {/* text */}
              <p className="quiz_add_rules_text" dangerouslySetInnerHTML={{__html: sanitizedHTML}}></p>

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