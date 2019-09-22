import React, { Component } from "react";
import "./App.css";
import { deflateRaw } from "zlib";

class App extends Component {
  state = {
    turn: "X",
    gameEnded: false,
    winner: null,
    totalMoves: 0,
    result: "",
    board: Array(9).fill("")
  };

  newGame = () => {
    window.location.reload(false);
  };

  clicked = async event => {
    if (this.state.gameEnded) return;
    let anything = event.target;
    if (this.state.board[anything.dataset.square] === "") {
      this.state.board[anything.dataset.square] = this.state.turn;
      anything.innerText = this.state.turn;
      await this.setState({
        turn: this.state.turn === "X" ? "O" : "X",
        board: this.state.board,
        totalMoves: this.state.totalMoves + 1
      });
    }

    console.log(this.state.board);
    const winner = await this.getWinner();
    if (winner) {
      await this.setState({
        gameEnded: true,
        winner: winner,
        result:
          winner === "X"
            ? "First Player wins!!"
            : winner === "O"
            ? "Second Player wins!!"
            : "It is a draw!!"
      });

      console.log(
        this.state.gameEnded +
          "   " +
          this.state.winner +
          "   " +
          this.state.totalMoves
      );
    }
  };

  getWinner = () => {
    let toWin = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    let board = this.state.board;
    let moves = this.state.totalMoves;
    let winner = this.state.winner;

    if (moves < 9) {
      toWin.forEach(array => {
        if (!winner) {
          if (
            board[array[0]] === board[array[1]] &&
            board[array[1]] === board[array[2]]
          ) {
            winner = board[array[0]];
          }
        }
      });
    }

    if (moves === 9 && !winner) winner = "draw";

    return winner;
  };
  render() {
    return (
      <div id="game">
        <div id="header">Best Tic Tac Toe Game!!!</div>
        <div id="result">{this.state.result}</div>
        <div id="board" onClick={event => this.clicked(event)}>
          <div className="square" data-square="0"></div>
          <div className="square" data-square="1"></div>
          <div className="square" data-square="2"></div>
          <div className="square" data-square="3"></div>
          <div className="square" data-square="4"></div>
          <div className="square" data-square="5"></div>
          <div className="square" data-square="6"></div>
          <div className="square" data-square="7"></div>
          <div className="square" data-square="8"></div>
        </div>
        <div>
          <button className="newGame" onClick={() => this.newGame()}>
            New Game
          </button>
        </div>
      </div>
    );
  }
}

export default App;
