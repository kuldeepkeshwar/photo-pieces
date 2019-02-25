import React from "react";
import { Button, Link } from "../Components/Buttons";
import "../styles/score-board.scss";
import { GAME_RESULT } from "../utils/constants";
import { calculateTotalScore } from "../utils/utils";
import ReactGA from "../utils/ga";

export default ({ location, history }) => {
  const { levels = [] } = location.state || {};
  const total = calculateTotalScore(levels);
  const lastLevel = levels[levels.length - 1] || {};
  const won = lastLevel.result ? lastLevel.result === GAME_RESULT.WON : false;
  ReactGA.event({
    category: "Level",
    action: "" + levels.length,
    label: "" + lastLevel.score
  });
  return (
    <div className="score-board">
      <div className="score-card-container">
        <ScoreCard
          total={total}
          levels={levels.length}
          lastLevel={lastLevel}
          won={won}
        />
        {!won && (
          <Link onClick={e => history.replace("/history")}>View History</Link>
        )}
      </div>
      {won ? (
        <div>
          <Button onClick={e => history.replace("/new-game", { levels })}>
            Next Level
          </Button>
          <Link
            onClick={e => {
              ReactGA.event({
                category: "Navigation",
                action: "New Game",
                label: "ScoreBoard"
              });
              history.replace("/new-game");
            }}
          >
            New Game
          </Link>
        </div>
      ) : (
        <Button
          onClick={e => {
            ReactGA.event({
              category: "Navigation",
              action: "New Game",
              label: "ScoreBoard"
            });
            history.replace("/new-game");
          }}
        >
          Play Again
        </Button>
      )}
    </div>
  );
};

function ScoreCard({ total, lastLevel, levels, won }) {
  return (
    <div className="score-card">
      <div className="score-card-inner">
        <div className="label">Total</div>
        <div className="score">{total}</div>
      </div>
      <div className="score-card-inner">
        <div className="label">
          Level <span>{levels}</span>
        </div>
        <div className="score">{lastLevel.score}</div>
      </div>
      <div className="score-result">{won ? "🏆 💯" : "💔 😔"}</div>
    </div>
  );
}