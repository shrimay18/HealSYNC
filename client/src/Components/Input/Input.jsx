function Input(props) {
    const handleChange = (e) => {
        const value = e.target.value;
        if (props.type === 'number' && (value < props.min || value > props.max)) {
        }
        props.setValue(value);
        console.log(value);
    };

    return (
        <div className={`column ${props.label}`}>
            <label>{props.label}</label>
            <input
                type={props.type}
                value={props.value}
                onChange={handleChange}
                placeholder={`Enter ${props.label}`}
                min={props.min}
                max={props.max}
            />
        </div>
    );
}

export default Input;
