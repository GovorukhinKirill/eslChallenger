import {useState} from "react";
import teams from "./teams";
import "../App.css"



function MatchManager() {
    let winnersArray = []
    console.log(teams) 
    const [match , setMatch] = useState([]);
    const [teamsArray, setTeamsArray] = useState(teams);
    const [round, setRound] = useState(0);
    let countresult = 0
    function simulateRandomMatch(TeamA , TeamB) {
        return Math.random() > 0.5 ?TeamA : TeamB
    }
    function startMatch() {
        let countteam = 0
        countresult = countresult + 1
        if(countteam ){
            for( let i = 0 ; i < teams.length; i += 2 ) {
             countteam = countteam + 1
            const team1 = teams[i];
            const team2 = teams[i + 1];
            console.log(teams[i].name + " VS " + teams[i + 1].name )
            if (teams[i].strenght > teams[i + 1].strenght) {
                console.log(teams[i].name + " winner " )

                if (document.querySelector(`#${teams[i].name}`)){
                    console.log(document.querySelector(`.${teams[i].name}`))
                    document.querySelector(`.${teams[i].name}`).classList.add("green")
                    winnersArray.push(teams[i])
                    console.log(winnersArray)
                }

                if (document.querySelector(`#${teams[i + 1].name}`)){
                    console.log(document.querySelector(`.${teams[i + 1].name}`))
                    document.querySelector(`.${teams[i + 1].name}`).classList.add("red")
                }
                 
            }
            else if (teams[i].strenght < teams[i + 1].strenght) {
                console.log(teams[i + 1].name + "winner")
                //document.querySelector(teams[i + 1].name).classList = " green ";
                 if (document.querySelector(`#${teams[i].name}`)){
                    console.log(document.querySelector(`.${teams[i].name}`))
                    document.querySelector(`.${teams[i].name}`).classList.add("red")
                }

                if (document.querySelector(`#${teams[i + 1].name}`)){
                    console.log(document.querySelector(`.${teams[i + 1].name}`))
                    document.querySelector(`.${teams[i + 1].name}`).classList.add("green")
                    winnersArray.push(teams[i+1])
                    console.log(winnersArray)
                }
            }
            else if (teams[i].strenght == teams[i + 1].strenght)
            {
                console.log("начинается 2 матч между" + teams[i].name + teams[i+1].name )
            }
            else {
                console.log('Error')

            }
            console.log(countteam)

            if(countteam<5){
                document.querySelector(".tournamenttable .left").innerHTML += `
                <div>${teams[i].name}</div>
                <div>${teams[i + 1].name}</div>
            `
            }
            else{
                document.querySelector(".tournamenttable .right" ).innerHTML += `
                <div>${teams[i].name}</div>
                <div>${teams[i + 1].name}</div>
            `
            }
        
        }
        }
        // else if (countresult == 2){
        //     for( let i = 0 ; i < teams.length; i += 2 ) {
        //      countteam = countteam + 1
        //     const team1 = teams[i];
        //     const team2 = teams[i + 1];
        //     console.log(teams[i].name + " VS " + teams[i + 1].name )
        //     if (teams[i].strenght > teams[i + 1].strenght) {
        //         console.log(teams[i].name + " winner " )

        //         if (document.querySelector(`#${teams[i].name}`)){
        //             console.log(document.querySelector(`.${teams[i].name}`))
        //             document.querySelector(`.${teams[i].name}`).classList.add("green")
        //             winnersArray.push(teams[i+1])
        //         }

        //         if (document.querySelector(`#${teams[i + 1].name}`)){
        //             console.log(document.querySelector(`.${teams[i + 1].name}`))
        //             document.querySelector(`.${teams[i + 1].name}`).classList.add("red")
        //         }
                 
        //     }
        //     else if (teams[i].strenght < teams[i + 1].strenght) {
        //         console.log(teams[i + 1].name + "winner")
        //         //document.querySelector(teams[i + 1].name).classList = " green ";
        //          if (document.querySelector(`#${teams[i].name}`)){
        //             console.log(document.querySelector(`.${teams[i].name}`))
        //             document.querySelector(`.${teams[i].name}`).classList.add("red")
        //         }

        //         if (document.querySelector(`#${teams[i + 1].name}`)){
        //             console.log(document.querySelector(`.${teams[i + 1].name}`))
        //             document.querySelector(`.${teams[i + 1].name}`).classList.add("green")
        //             winnersArray.push(teams[i+1])
        //         }

        //     }
        //     else if (teams[i].strenght == teams[i + 1].strenght)
        //     {
        //         console.log("начинается 2 матч между" + teams[i].name + teams[i+1].name )
        //     }
        //     else {
        //         console.log('Error')

        //     }
        //     console.log(countteam)

        //     if(countteam<5){
        //         document.querySelector(".tournamenttable .left").innerHTML += `
        //         <div>${teams[i].name}</div>
        //         <div>${teams[i + 1].name}</div>
        //     `
        //     }
        //     else{
        //         document.querySelector(".tournamenttable .right" ).innerHTML += `
        //         <div>${teams[i].name}</div>
        //         <div>${teams[i + 1].name}</div>
        //     `
        //     }
        
        // }
        // }
        console.log(winnersArray)

    }
    
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
            <section className = "tournamenttable">
                <div className="left"></div>
                <div className="right"></div>
            </section>
            <footer>
                <div className = "start">
                    <button onClick={startMatch}> Start </button>
                </div>
            </footer>
        </>
    )
} 

export default MatchManager