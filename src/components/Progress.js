function Progress({questionIndex}) {
    return (
    <div className="progress">
        <progress max={10} value={questionIndex}/>
    </div>
    )
}

export default Progress;