package com.vm.interview.tictactoe.tictactoebackend.validators;

import com.vm.interview.tictactoe.tictactoebackend.dos.BoardDO;
import com.vm.interview.tictactoe.tictactoebackend.dos.GameDO;
import com.vm.interview.tictactoe.tictactoebackend.dos.PointDO;
import com.vm.interview.tictactoe.tictactoebackend.enums.GameStatus;
import com.vm.interview.tictactoe.tictactoebackend.exceptions.InvalidGameStateException;
import com.vm.interview.tictactoe.tictactoebackend.exceptions.InvalidPointException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Check technical requirements of game.
 */
@Service
public class GameValidator {

    private final BoardDO boardDO;
    private final GameDO gameDO;

    @Autowired
    GameValidator(BoardDO boardDO, GameDO gameDO) {
        this.boardDO = boardDO;
        this.gameDO = gameDO;
    }

    /**
     * Checks if given point is within length of board and is empty.
     *
     * @param pointDO under which player should be placed
     */
    public void validatePoint(PointDO pointDO) {
        if (pointDO.getCoordinates() >= 9) {
            throw new InvalidPointException("Value too high!");
        } else if (pointDO.getCoordinates() < 0) {
            throw new InvalidPointException("Value too low!");
        } else if (boardDO.getBoard().get(pointDO.getCoordinates()) != null) {
            throw new InvalidPointException("There is already value there!");
        }
    }

    /**
     * Check whether game was not already finished.
     */
    public void validateStatus() {
        if (gameDO.getGameStatus() != GameStatus.IN_PROGRESS) {
            throw new InvalidGameStateException("Game was already finished!");
        }
    }
}
