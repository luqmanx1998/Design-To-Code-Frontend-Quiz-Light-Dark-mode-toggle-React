function SubmitButton({isSubmitted, selectedAns, dispatch, correctAns, questionIndex, numOfQuestions}) {


    if(!isSubmitted)
        return <button className="btn btn-submit" onClick={() => 
        dispatch({type: 'submit', payload: correctAns})}
        disabled={selectedAns === null}>
            Submit Answer
        </button>

    if(isSubmitted && questionIndex < numOfQuestions - 1)
        return <button className="btn btn-submit" onClick={() =>
            dispatch({type: 'nextQuestion', payload: selectedAns})
        }
        disabled={selectedAns === null}>
            Next Question
        </button>

    if(isSubmitted && questionIndex === numOfQuestions - 1)
        return <button className="btn btn-submit" onClick={() => dispatch({type: 'finish'})
        }
        disabled={selectedAns === null}>
            Finish
        </button>
}

export default SubmitButton;