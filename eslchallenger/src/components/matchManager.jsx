import { useState, useEffect } from "react";
import teams from "./teams";
import "../App.css";

function MatchManager() {
  // Состояния
  const [currentRound, setCurrentRound] = useState(0);
  const [matches, setMatches] = useState([]);
  const [winners, setWinners] = useState([]);
  const [isTournamentComplete, setIsTournamentComplete] = useState(false);
  const [tournamentStage, setTournamentStage] = useState("waiting");
  
  // Константы для этапов турнира
  const TOURNAMENT_STAGES = {
    WAITING: "waiting",
    ROUND_OF_16: "1/8 финала",
    QUARTERFINALS: "1/4 финала",
    SEMIFINALS: "1/2 финала",
    FINAL: "финал",
    COMPLETE: "завершен"
  };
  const Tooltip = ({children,content,position="top"}) => {
    const [status, setStatus] = useState(false)
    return(
        <div>
            <div
            
            onMouseEnter={()=> setStatus(true)}
            onMouseLeave={()=> setStatus(false)}
            >
          {children }
            </div>

            {status && (
                <div>{content}</div>
            )}
        </div>
    )
  }
  // Функция для симуляции матча
  const simulateMatch = (teamA, teamB) => {
    const randomFactor = Math.random() * 0.3 - 0.15; // Случайность от -15% до +15%
    const teamAStrength = teamA.strength * (1 + randomFactor);
    const teamBStrength = teamB.strength * (1 - randomFactor);
    
    if (teamAStrength > teamBStrength) {
      return { winner: teamA, loser: teamB };
    } else {
      return { winner: teamB, loser: teamA };
    }
  };
  
  // Генерация пар для матчей
  const generateMatches = (teamsArray) => {
    const shuffledTeams = [...teamsArray].sort(() => Math.random() - 0.5);
    const matchesArray = [];
    
    for (let i = 0; i < shuffledTeams.length; i += 2) {
      matchesArray.push({
        team1: shuffledTeams[i],
        team2: shuffledTeams[i + 1],
        winner: null,
        loser: null,
        completed: false
      });
    }
    
    return matchesArray;
  };
  
  // Проведение следующего раунда
  const playNextRound = () => {
    if (isTournamentComplete) return;
    
    let currentMatches, nextStage;
    
    switch(currentRound) {
      case 0: // Начало турнира
        currentMatches = generateMatches(teams);
        setMatches(currentMatches);
        setTournamentStage(TOURNAMENT_STAGES.ROUND_OF_16);
        setCurrentRound(1);
        break;
        
      case 1: // 1/8 -> 1/4
        const round16Winners = simulateRound(matches);
        setWinners(round16Winners);
        const quarterMatches = generateMatches(round16Winners);
        setMatches(quarterMatches);
        setTournamentStage(TOURNAMENT_STAGES.QUARTERFINALS);
        setCurrentRound(2);
        break;
        
      case 2: // 1/4 -> 1/2
        const quarterWinners = simulateRound(matches);
        setWinners(quarterWinners);
        const semiMatches = generateMatches(quarterWinners);
        setMatches(semiMatches);
        setTournamentStage(TOURNAMENT_STAGES.SEMIFINALS);
        setCurrentRound(3);
        break;
        
      case 3: // 1/2 -> финал
        const semiWinners = simulateRound(matches);
        setWinners(semiWinners);
        const finalMatch = [{
          team1: semiWinners[0],
          team2: semiWinners[1],
          winner: null,
          loser: null,
          completed: false
        }];
        setMatches(finalMatch);
        setTournamentStage(TOURNAMENT_STAGES.FINAL);
        setCurrentRound(4);
        break;
        
      case 4: // Финал -> завершение
        const finalWinner = simulateRound(matches);
        setWinners(finalWinner);
        setTournamentStage(TOURNAMENT_STAGES.COMPLETE);
        setIsTournamentComplete(true);
        break;
    }
  };
  
  // Симуляция текущего раунда
  const simulateRound = (matchesArray) => {
    const updatedMatches = [...matchesArray];
    const roundWinners = [];
    
    updatedMatches.forEach((match, index) => {
      const result = simulateMatch(match.team1, match.team2);
      updatedMatches[index] = {
        ...match,
        winner: result.winner,
        loser: result.loser,
        completed: true
      };
      roundWinners.push(result.winner);
    });
    
    setMatches(updatedMatches);
    return roundWinners;
  };
  
  // Сброс турнира
  const resetTournament = () => {
    setCurrentRound(0);
    setMatches([]);
    setWinners([]);
    setIsTournamentComplete(false);
    setTournamentStage(TOURNAMENT_STAGES.WAITING);
  };
  
  // Получение текста для кнопки
  const getButtonText = () => {
    if (isTournamentComplete) return "Турнир завершен!";
    if (currentRound === 0) return "Начать турнир";
    return `Следующий раунд (${tournamentStage})`;
  };
  
  // Определение победителя турнира
  const getTournamentWinner = () => {
    if (isTournamentComplete && winners.length === 1) {
      return winners[0];
    }
    return null;
  };
  
  // Рендеринг матчей
  const renderMatches = () => {
    if (matches.length === 0) {
      return <div className="no-matches">Матчи не начались</div>;
    }
    
    return matches.map((match, index) => (
      <div 
        key={index} 
        className={`match-card ${match.completed ? 'completed' : 'upcoming'}`}
      >
        <div className="teams-container">
          <div className={`team ${match.winner?.id === match.team1.id ? 'winner' : ''} ${match.loser?.id === match.team1.id ? 'loser' : ''}`}>
            <span className="team-name">{match.team1.name}</span>
            <span className="team-strength">Сила: {match.team1.strenght}</span>
          </div>
          
          <div className="vs-divider">VS</div>
          
          <div className={`team ${match.winner?.id === match.team2.id ? 'winner' : ''} ${match.loser?.id === match.team2.id ? 'loser' : ''}`}>
            <span className="team-name">{match.team2.name}</span>
            <span className="team-strength">Сила: {match.team2.strenght}</span>
          </div>
        </div>
        
        {match.completed && match.winner && (
          <div className="match-result">
            <span className="winner-text">
              Победитель: {match.winner.name}
            </span>
          </div>
        )}
      </div>
    ));
  };
  
  const tournamentWinner = getTournamentWinner();
  
  return (
    <div className="match-manager">
      {/* Заголовок */}
      <header className="tournament-header">
        <h1>Турнир по Counter Strike 2</h1>
        <div className="tournament-status">
          <span className="status-label">Статус:</span>
          <span className={`status-value ${tournamentStage === TOURNAMENT_STAGES.COMPLETE ? 'complete' : ''}`}>
            {tournamentStage}
          </span>
        </div>
      </header>
      
      <main className="tournament-content">
        {/* Левая панель - все команды */}
        <section className="all-teams-section">
          <h2>Все команды ({teams.length})</h2>
          <div className="teams-grid">
            {teams.map((team) => (
              <div key={team.id} className="team-card">
              <Tooltip content = {
                <div className = "tooltip-content">
                <p className="team-description">{team.description}</p>
                <p className="team-roster">{team["Team roster"]}</p>
                <p className="team-country">{team.country}</p>
                </div>

                }
                position="top"></Tooltip>
                <h3 className="team-title">{team.name}</h3>
                
                <div className="team-stats">
                  <span className="stat-label">Сила:</span>
                  <span className="stat-value">{team.strenght}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Центральная панель - текущие матчи */}
        <section className="current-matches-section">
          <h2>Текущий раунд: {tournamentStage}</h2>
          <div className="matches-container">
            {renderMatches()}
          </div>
          
          {/* Победитель турнира */}
          {tournamentWinner && (
            <div className="tournament-champion">
              <div className="champion-card">
                <div className="trophy">🏆</div>
                <h3>Чемпион турнира!</h3>
                <h2>{tournamentWinner.name}</h2>
                <p>{tournamentWinner.description}</p>
                <div className="champion-stats">
                  Сила команды: {tournamentWinner.strenght}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      
      {/* Футер с управлением */}
      <footer className="tournament-controls">
        <button 
          className="btn btn-reset"
          onClick={resetTournament}
          disabled={currentRound === 0}
        >
          Начать заново
        </button>
        
        <div className="tournament-stage">
        <span className="stage-label">Текущий этап:</span>
          <span className="stage-value">{tournamentStage}</span>
        </div>
        
        <button 
          className={`btn btn-next ${isTournamentComplete ? 'disabled' : ''}`}
          onClick={playNextRound}
          disabled={isTournamentComplete}
        >
          {getButtonText()}
        </button>
      </footer>
    </div>
  );
}

export default MatchManager;