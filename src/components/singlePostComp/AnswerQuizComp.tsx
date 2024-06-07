import React, { useEffect, useState } from "react";
import InputComponent from "../inputComponent/InputComponent";
import axios from "axios";
import limitedIMG from "../../assets/limited.webp"
import { movieDataBase } from "../createPostFeed/functions/fetchDB";
import { useUserHook } from "../../hooks/useUserHook";
import { useDispatch } from "react-redux";
import { setModalVisible } from "../../Redux/loginModalSlicer";

interface AnswerQuizCompProps {
  id: number;
}

interface fetchedDataBaseProps {
  id: number;
  eng: string;
  poster: string;
}

const AnswerQuizComp: React.FC<AnswerQuizCompProps> = ({ id }) => {
  const dispatch = useDispatch()
  const { requestMovieDB } = movieDataBase()
  const { user } = useUserHook()
  const [answerValue, setAnswerValue] = useState("");
  const [fetchedMovieDb, setFetchedMovieDb] = useState([])
  const [stopFunc, setStopFunc] = useState(false)
  const [newMovie, setNewMovie] = useState('') //ფილმების ბაზის ფეჩინგის შესამომწებლად

  useEffect(() => {
    if (answerValue.length > 0 && !stopFunc) {
      //დაიმპორტებული ფუქნცია
      requestMovieDB(setFetchedMovieDb, answerValue)
    }

  }, [answerValue, stopFunc, requestMovieDB])


  useEffect(() => {
    if (answerValue !== newMovie) {
      setStopFunc(false)
    }

    if (answerValue.length < 1) {
      setAnswerValue('')
      setNewMovie('')
      setStopFunc(true)
    }
  }, [answerValue, newMovie])

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

    if(user.name && user.userID){
      try {
        await axios.post(`${import.meta.env.VITE_SEND_ANSWER}${id}`, { answer: answerValue }, {
         headers: {
           Authorization: `Bearer ${token}`
         }
       })
       // console.log(response);
 
     } catch (error) {
       console.error(error)
     }
    }else{
      dispatch(setModalVisible(true))
    }
  }

  return (
    <div className="quiz_answer_input_container">
      <InputComponent
        nameProp="correctAnswerquiz"
        widthProp={"100%"}
        heightProp={"40px"}
        type={"text"}
        placeholder={"Enter the correct answer"}
        value={answerValue}
        isError={false}
        onChange={(e) => setAnswerValue(e.target.value)}
      />

      <div className="post_quiz_answer_text">
        <p onClick={sendAnswer}>Post</p>
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
