import './Button.styles.scss'

type ButtonProps = {
    label: string
    onClick: () => void
}

export const Button = ({ label, onClick }: ButtonProps) => {
    return (
        <button className="Button" onClick={onClick}>
            {label}
        </button>
    )
}
