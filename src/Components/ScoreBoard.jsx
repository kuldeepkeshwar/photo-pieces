import React from "react";
import "../styles/score-board.css";

import { GAME_RESULT } from "./../constants";

export default ({ location, history }) => {
  const levels = location.state.levels;
  const total = levels.reduce(function(t, item) {
    return item.score + t;
  }, 0);
  const lastLevel = levels[levels.length - 1];
  const won = lastLevel.result === GAME_RESULT.WON;
  return (
    <div className="score-board">
      <div className="score-card">
        <div className="label">Total</div>
        <div className="score">{total}</div>
        <div className="label">Last Level</div>
        <div className="score">{lastLevel.score}</div>
        <div className="score">{won ? "😁🏆🥇💯" : "💔😔"}</div>
      </div>
      {won && (
        <div
          className="btn"
          onClick={e => {
            history.push("/new-game", { levels });
          }}
        >
          <div>Next Level</div>
        </div>
      )}
      <div
        className="btn"
        onClick={e => {
          history.push("/new-game");
        }}
      >
        <div>Play Again</div>
      </div>
    </div>
  );
};
