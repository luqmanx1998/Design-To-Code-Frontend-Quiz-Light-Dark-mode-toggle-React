function Title({ quizzes, index }) {
    if (!quizzes || !quizzes.length) {
        return <div>Loading quizzes...</div>;
    }

    const {title} = quizzes[index];

    return <div className="title">
        <div className="title-left">
            <img src={quizzes[index].icon} alt={`${title} icon`}></img>
            <h1>{title}</h1>
        </div>
    </div>


}

export default Title;