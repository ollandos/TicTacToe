  import React from 'react';
  import ReactDOM from 'react-dom';
  import Game from './TicTacToe';


document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Game />,
    document.getElementById('container')
  );
});
