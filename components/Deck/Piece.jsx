import React from "react";
import css from "./deck.scss";
function noop(item) {
  return item;
}

export default function(props) {
  const { picture, piece, styles = {} } = props;
  const {
    connectDragSource = noop,
    connectDragPreview = noop,
    isDragging = false
  } = props;
  let _styles = {
    ...styles,
    backgroundImage: `url(${picture})`,
    width: piece.size,
    height: piece.size,
    border: `2px solid ${isDragging ? "white" : "#444"}`,
    backgroundPosition: `-${piece.x}px -${piece.y}px`
  };
  const text = piece.matched ? <span>✔</span> : <span>{piece.score}</span>;
  let content = (
    <span className={css["piece"]} style={_styles} key={piece.id}>
      {text}
    </span>
  );
  content = connectDragSource(content);
  content = connectDragPreview(content);
  return content;
}
