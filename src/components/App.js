import { use, useEffect, useReducer, useState } from "react"
import Header from "./Header";
import Title from "./Title";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Question from "./Question";
import FinishScreen from "./FinishScreen";
import Toggle from "./Toggle";

const initialState = {
  quizzes: [],
  status: 'loading',
  index: 0,
  questionIndex: 0,
  selectedAns: null,
  isSubmitted: false,
  points: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        quizzes: action.payload,
        status: 'ready',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
        index: action.payload
      }
    case 'selectAns':
      return {
        ...state,
        selectedAns: action.payload
      }
    case 'submit':
      return {
        ...state,
        isSubmitted: true,
        points: state.selectedAns === action.payload ? state.points + 1 : state.points
      }
    case 'nextQuestion':
      return {
        ...state,
        isSubmitted: false,
        questionIndex: state.questionIndex + 1,
        selectedAns: null
      }  
    case 'finish':
      return {
        ...initialState,
        quizzes: state.quizzes,
        points: state.points,
        index: state.index,
        status: 'finish'
      }
    case 'restart':
      return {
        ...initialState,
        quizzes: state.quizzes,
        status: 'ready'
      }
    
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ quizzes, status, index, questionIndex, selectedAns, isSubmitted, points }, dispatch] = useReducer(reducer, initialState);
  const [isDark, setIsDark] = useState(() => {
    return JSON.parse(localStorage.getItem("theme")) ?? false;
  });

  useEffect(function() {
    localStorage.setItem("theme", JSON.stringify(isDark));
  },[isDark])

  const numOfQuestions = quizzes.length > 0 ? quizzes[index].questions.length : 0;

  useEffect(function() {

    async function fetchData() {
      try {
        const res = await fetch("data.json")
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        console.log(data);
        dispatch({type: "dataReceived", payload: data.quizzes})

      } catch (err) {
        console.error(err.message);
      }
    }

    fetchData();
  }, [])

  if (status === "loading") {
    return <div className="loading"><h1>Loading quizzes...</h1></div>;
  }

  return <div className="app" data-theme={isDark ? "dark" : "light"}>

    <Header>
      {status === 'active' && <Title quizzes={quizzes} index={index} />}  
      {status === 'finish' && <Title quizzes={quizzes} index={index} />}
      <Toggle handleChange={() => 
        setIsDark(!isDark)}
        isChecked={isDark}/>
    </Header>
    <Main>
      {status === 'ready' && <StartScreen quizzes={quizzes} dispatch={dispatch} />}

      {status === 'active' && (
      <>
        <div>
          <Question quizzes={quizzes} questionIndex={questionIndex} index={index} selectedAns={selectedAns} dispatch={dispatch} isSubmitted={isSubmitted} points={points} />
        </div>
      </>)}
      {status === 'finish' && (
          <FinishScreen points={points} quizzes={quizzes} index={index}
          dispatch={dispatch} numOfQuestions={numOfQuestions}/>
        )}
    </Main>
  </div>
}
