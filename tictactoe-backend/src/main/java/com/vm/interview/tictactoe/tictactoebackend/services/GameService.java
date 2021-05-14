package com.vm.interview.tictactoe.tictactoebackend.services;

import com.vm.interview.tictactoe.tictactoebackend.dos.BoardDO;
import com.vm.interview.tictactoe.tictactoebackend.dos.GameDO;
import com.vm.interview.tictactoe.tictactoebackend.dos.PointDO;
import com.vm.interview.tictactoe.tictactoebackend.enums.Player;
import com.vm.interview.tictactoe.tictactoebackend.validators.GameValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * Class responsible for logic behind game.
 */
@Service
public class GameService {

    private final BoardDO boardDO;
    private final GameDO gameDO;
    private final StatusService statusService;
    private final GameValidator gameValidator;

    @Autowired
    public GameService(BoardDO boardDO, GameDO gameDO, StatusService statusService, GameValidator gameValidator) {
        this.boardDO = boardDO;
        this.gameDO = gameDO;
        this.statusService = statusService;
        this.gameValidator = gameValidator;
    }

    /**
     * Sets current player mark under specified point.
     *
     * @param pointDO on which we want to have a mark
     */
    public void setPoint(PointDO pointDO) {
        gameValidator.validateStatus();
        gameValidator.validatePoint(pointDO);
        boardDO.getBoard().set(pointDO.getCoordinates(), gameDO.getCurrentPlayer());
        gameDO.setCurrentPlayer(gameDO.getCurrentPlayer() == Player.X ? Player.O : Player.X);
        gameDO.setGameStatus(statusService.getStatus());
    }

    /**
     * Gives back player that has current turn.
     *
     * @return current player
     */
    public Player getCurrentPlayer() {
        return gameDO.getCurrentPlayer();
    }

    /**
     * Clears the board.
     */
    public void clearBoard() {
        boardDO.setBoard(Arrays.asList(new Player[9]));
    }

    /**
     * Gives back current board with users markers.
     *
     * @return current board
     */
    public List<Player> getBoard() {
        return boardDO.getBoard();
    }

}
