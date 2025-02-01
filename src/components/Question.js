import Progress from "./Progress";
import SubmitButton from "./SubmitButton";

function Question({quizzes, index, questionIndex, selectedAns, dispatch, isSubmitted}) {

    const {question, options, answer} = quizzes[index].questions[questionIndex];
    const choiceArr = ['A', 'B', 'C', 'D'];
    const correctAns = options.indexOf(answer);
    const numOfQuestions = quizzes[index].questions.length;

    return <div className="question-container">
        <div className="question-box">
            <div className="question-wrapper">
                <span className="question-number">Question {questionIndex + 1} of {numOfQuestions}</span>
                <p className="question">{question}</p>
            </div>
            <Progress questionIndex={questionIndex}/>
        </div>
        <div className="question-options">
            {options.map((option, i) => {

                    let optionClass = 'btn btn-option';
                    if (isSubmitted) {
                        if(i === correctAns) {
                            optionClass +=' border-green';
                        }
                        else if(i === selectedAns && i !== correctAns) {
                            optionClass +=' border-red';
                        }
                    } else if (i === selectedAns) {
                        optionClass +=' border-purple';
                    }

                    return (
                        <button className={optionClass} key={option}
                        onClick={() => dispatch({type: 'selectAns', payload: i})}
                        disabled={isSubmitted}>
                            <div className="option-left-side">
                                <span>{choiceArr[i]}</span>
                                <p>{option}</p>
                            </div>

                            {isSubmitted && i === correctAns ? 
                            <img src="assets/images/icon-correct.svg" alt="correct-icon" className="icon-corr"/>  
                            : ""}

                            {isSubmitted && i !== correctAns && i === selectedAns ? 
                            <img src="assets/images/icon-error.svg" alt="wrong-icon" className="icon-wrong"/>  
                            : ""}

                        </button>            
                    )
                    }
                )}
            <SubmitButton 
            isSubmitted={isSubmitted} 
            selectedAns={selectedAns}
            dispatch={dispatch} 
            correctAns={correctAns}
            numOfQuestions={numOfQuestions}
            questionIndex={questionIndex}/>
            
        </div>

    </div>
}

export default Question;