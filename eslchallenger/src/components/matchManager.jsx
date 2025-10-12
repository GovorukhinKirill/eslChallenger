import {useState} from "react";
import teams from "./teams";
import "../App.css"



function MatchManager() {
    console.log(teams) 
    const [match , setMatch] = useState([]);
    const [teamsArray, setTeamsArray] = useState(teams);
    const [round, setRound] = useState(0);
    function simulateRandomMatch(TeamA , TeamB) {
        return Math.random() > 0.5 ?TeamA : TeamB
    }
    function startMatch() {
        for( let i = 0 ; i < teams.length; i += 2 ) {
            const team1 = teams[i];
            const team2 = teams[i + 1];
            console.log(teams[i].name + " VS " + teams[i + 1].name )
            if (teams[i].strenght > teams[i + 1].strenght) {
                console.log(teams[i].name + " winner " )
                //document.querySelector(teams[i].name).className += " green ";
            }
            else if (teams[i].strenght < teams[i + 1].strenght) {
                console.log(teams[i + 1].name + "winner")
                //document.querySelector(teams[i + 1].name).classList = " green ";
            }
            else if (teams[i].strenght == teams[i + 1].strenght)
            {
                console.log("начинается 2 матч между" + teams[i].name + teams[i+1].name )
            }
            else {
                console.log('Error')
            }
        }
    }
    startMatch()
    return(
        <>
        <header className = "status">
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

            <section className = "section">{
                teams.map((onematch, i) =>(
                    <div className = {"team " + onematch.name} id={onematch.name}>
                        <div>{onematch.name}</div>
                        <div>{onematch.description}</div>
                        <div>{onematch.strenght}</div>
                    </div>
                    
                )
                )
            }</section>
            <footer>
                <div className = "start">
                    <button> Start </button>
                </div>
            </footer>
        </>
    )
} 

export default MatchManager