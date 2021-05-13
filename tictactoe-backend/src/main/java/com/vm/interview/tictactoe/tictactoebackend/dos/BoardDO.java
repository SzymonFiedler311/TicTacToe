package com.vm.interview.tictactoe.tictactoebackend.dos;

import com.vm.interview.tictactoe.tictactoebackend.enums.Player;

/**
 * Class representing Tic tac toe board.
 */
public class BoardDO {
    private final Player[][] board= new Player[3][3];

    public Player[][] getBoard() {
        return board;
    }
}
