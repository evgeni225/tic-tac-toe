export const Item = ({ id, item, clickHandler }) => {
    return (
        <div onClick={() => clickHandler(id)} className="board__item">{item}</div>
    )
}