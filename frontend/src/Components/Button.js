
const Button = ({text, cssClass, onClick, color}) => {

    return (
        <button className={cssClass} onClick={onClick} style={{ backgroundColor: color}}>{text}</button>
    )
}

export default Button