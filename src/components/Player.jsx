import { useState } from "react"

export default function Player({ initialName, symbol,isActive,onChangeName }) {
    const [name,setName]=useState(initialName);
    const [isEditing, setEditing] = useState(false);

    function handleEdit() {
        // setEditing(isEditing?false:true);
        setEditing(editing=>!editing);
        if(isEditing){
        onChangeName(symbol,name)
        }
    }
    function handleChange(e){
        // console.log(e);
        setName(e.target.value);
    }
    let playerName = <span className="player-name">{name}</span>
    if (isEditing) {
        playerName = <input type="text" value={name} required onChange={handleChange}/>;
    }

    return (
        <>
        {console.log(isActive)}
            <li className={isActive?'active':undefined}>
                <span className="player">
                    {playerName}
                    <span className="player-symbol">{symbol}</span>
                </span>
                <button onClick={handleEdit}>{!isEditing ? "Edit" : "Save"}</button>
            </li>
        </>
    )
}