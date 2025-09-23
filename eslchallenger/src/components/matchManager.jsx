import {useState} from "react";
import teams from "./teams";
import "../App.css"

function MatchManager() {
    console.log(teams) 
    const [match , setMatch] = useState([]);
    const [teamsArray, setTeamsArray] = useState(teams);
    const [round, setRound] = useState(0);
    return(
        <>
            <section>{
                teams.map((onematch, i) =>(
                    <div>
                        <div>{onematch.name}</div>
                        <div>{onematch.description}</div>
                        <div>{onematch.strenght}</div>
                    </div>
                    
                )
                )
            }</section>
        </>
    )
} 

export default MatchManager