import React from 'react';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(squareNumber) {
    return <Square
      key={squareNumber}
      value={this.props.squares[squareNumber]}
      onClick={() => this.props.onClick(squareNumber)}
    />;
  }
  renderRow(i) {
    let squares = [];
    for (let index = 0; index < 3; index++) {
      squares.push(this.renderSquare(index + i * 3));
    }
    return squares
  }
  render() {
    let rows = [];
    for (let rowNumber=0; rowNumber < 3; rowNumber++) {
      rows.push(
          <div key={rowNumber} className="board-row">{this.renderRow(rowNumber)}</div>
      );
    }
    return (
      <div>{rows}</div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
          squares: Array(9).fill(null)
      }],
      xIsNext: true,
      turnNumber: 0
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.turnNumber + 1);
    const current = history[this.state.turnNumber];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
        turnNumber: history.length,
        history: history.concat([{squares: squares}]),
        xIsNext: !this.state.xIsNext
    });
  }
  jumpTo(turn) {
    this.setState({
      turnNumber: turn,
      xIsNext: (turn % 2) ? false : true
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.turnNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((squares, turn) => {
      const desc = turn ?
        'Move #' + turn :
        'Game start';
      const move = turn == this.state.turnNumber ?
        <b><a href="#" onClick={() => this.jumpTo(turn)}>{desc}</a></b> :
        <a href="#" onClick={() => this.jumpTo(turn)}>{desc}</a>;
      const list = (
        <li key={turn}>
          {move}
        </li>
      )
      return list;
    });
    let status;
    if (winner) {
      status = 'Winner ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
