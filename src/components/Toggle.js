function Toggle({handleChange, isChecked}) {
    return <div className="toggle-container">
        <img src={isChecked ? "assets/images/icon-sun-light.svg" : "assets/images/icon-sun-dark.svg"} alt="sun-icon"/>
        <input 
        type="checkbox"
        id="check"
        className="toggle"
        onChange={handleChange}
        checked={isChecked}/>
        <label htmlFor="check">
            <div className="toggle-label">&nbsp;</div>
        </label>
        <img src={isChecked ? "assets/images/icon-moon-light.svg" : "assets/images/icon-moon-dark.svg"} alt="moon-icon"/>
    </div>
}

export default Toggle;