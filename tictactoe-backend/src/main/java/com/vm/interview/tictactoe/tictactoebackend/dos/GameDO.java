package com.vm.interview.tictactoe.tictactoebackend.dos;

import com.vm.interview.tictactoe.tictactoebackend.enums.GameStatus;
import com.vm.interview.tictactoe.tictactoebackend.enums.Player;
import org.springframework.stereotype.Component;

/**
 * Class representing current game.
 */
@Component
public class GameDO {
    private GameStatus gameStatus = GameStatus.IN_PROGRESS;
    private Player currentPlayer = Player.X;

    public GameStatus getGameStatus() {
        return gameStatus;
    }

    public void setGameStatus(GameStatus gameStatus) {
        this.gameStatus = gameStatus;
    }

    public Player getCurrentPlayer() {
        return currentPlayer;
    }

    public void setCurrentPlayer(Player currentPlayer) {
        this.currentPlayer = currentPlayer;
    }
}
