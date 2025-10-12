import {useState} from "react";
import teams from "./teams";
import "../App.css"



function MatchManager() {
    console.log(teams) 
    const [match , setMatch] = useState([]);
    const [teamsArray, setTeamsArray] = useState(teams);
    const [round, setRound] = useState(0);
    function startMatch() {
        for( let i = 0 ; i < teams.length; i += 2 ) {
            const team1 = teams[i]
            const team2 = teams[i + 1]
            console.log(teams[i].name + " VS " + teams[i + 1].name )
            if (teams[i].strenght > teams[i + 1].strenght) {
                console.log(teams[i].strenght + " winner " )
            }
        }
    }
    startMatch()
    return(
        <>
        <header class = "status">
        <div>
            <button>Назад</button>
        </div>

        <div>  
            <span>Status:</span>
        </div>

        <div>
            <button> Вперед </button>
        </div>
        </header>

            <section class = "section">{
                teams.map((onematch, i) =>(
                    <div class = "team">
                        <div>{onematch.name}</div>
                        <div>{onematch.description}</div>
                        <div>{onematch.strenght}</div>
                    </div>
                    
                )
                )
            }</section>
            <footer>
                <div class = "start">
                    <button> Start </button>
                </div>
            </footer>
        </>
    )
} 

export default MatchManager