import React, { useEffect, useState } from "react";
import InputComponent from "../inputComponent/InputComponent";
import axios from "axios";
import limitedIMG from "../../assets/limited.webp"
import { movieDataBase } from "../createPostFeed/functions/fetchDB";

interface AnswerQuizCompProps {
  id: number;
}

interface fetchedDataBaseProps {
  id: number;
  eng: string;
  poster: string;
}

const AnswerQuizComp: React.FC<AnswerQuizCompProps> = ({ id }) => {
  const { requestMovieDB } = movieDataBase()
  const [answerValue, setAnswerValue] = useState("");
  const [fetchedMovieDb, setFetchedMovieDb] = useState([])
  const [stopFunc, setStopFunc] = useState(false)
  const [newMovie, setNewMovie] = useState('') //ფილმების ბაზის ფეჩინგის შესამომწებლად

  useEffect(() => {
    if (answerValue.length > 0 && !stopFunc) {
      //დაიმპორტებული ფუქნცია
      requestMovieDB(setFetchedMovieDb, answerValue)
    }

  }, [answerValue, stopFunc])


  useEffect(() => {
    if (answerValue !== newMovie) {
      setStopFunc(false)
    }

    if (answerValue.length < 1) {
      setAnswerValue('')
      setNewMovie('')
      setStopFunc(true)
    }
  }, [answerValue])

  //ფილმების ბაზიდან ფილმების არჩევა და მოქმედებები
  const chooseMovieName = (movieName: string) => {
    setAnswerValue(movieName)
    setFetchedMovieDb([])
    setStopFunc(true)
    setNewMovie(movieName)
  }

  useEffect(() => {
    if (answerValue.length === 0) {
      setFetchedMovieDb([])
    }
  }, [answerValue])

  const sendAnswer = async () => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.post(`${import.meta.env.VITE_SEND_ANSWER}${id}`, { answer: answerValue }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response);

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="quiz_answer_input_container">
      <InputComponent
        nameProp="correctAnswerquiz"
        widthProp={window.innerWidth > 430 ? "538px" : "280px"}
        heightProp={"44px"}
        type={"text"}
        placeholder={"Enter the correct answer"}
        value={answerValue}
        isError={false}
        onChange={(e) => setAnswerValue(e.target.value)}
      />

      <div className="post_quiz_answer_text" onClick={sendAnswer}>
        <p>Post</p>
      {
        fetchedMovieDb.length !== 0 ?
          <div className="move_db_dropdown answering">
            {fetchedMovieDb?.map((movie: fetchedDataBaseProps) => {
              return (
                <div className="dropdown_item" key={movie.id} onClick={() => chooseMovieName(movie.eng)}>
                  <img src={limitedIMG} alt="/" className="movie_dropdown_image" />
                  <p>{movie.eng}</p>
                </div>
              )
            })}
          </div>
          : <></>
      }
      </div>

    </div>
  );
};

export default AnswerQuizComp;
