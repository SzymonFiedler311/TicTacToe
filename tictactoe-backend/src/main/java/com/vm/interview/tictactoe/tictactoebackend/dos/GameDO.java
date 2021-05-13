package com.vm.interview.tictactoe.tictactoebackend.dos;

import com.vm.interview.tictactoe.tictactoebackend.enums.GameStatus;
import com.vm.interview.tictactoe.tictactoebackend.enums.Player;
import org.springframework.stereotype.Component;

/**
 * Class representing current game.
 */
@Component
public class GameDO {
    private GameStatus gameStatus;
    private Player lastPlayer;

    public GameStatus getGameStatus() {
        return gameStatus;
    }

    public void setGameStatus(GameStatus gameStatus) {
        this.gameStatus = gameStatus;
    }

    public Player getLastPlayer() {
        return lastPlayer;
    }

    public void setLastPlayer(Player lastPlayer) {
        this.lastPlayer = lastPlayer;
    }
}
