package com.vm.interview.tictactoe.tictactoebackend.dos;

import com.vm.interview.tictactoe.tictactoebackend.enums.Player;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

/**
 * Class representing Tic tac toe board.
 */
@Component
public class BoardDO {
    private List<Player> board = Arrays.asList(new Player[9]);

    public List<Player> getBoard() {
        return board;
    }

    public void setBoard(List<Player> board) {
         this.board = board;
    }
}
