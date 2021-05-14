package com.vm.interview.tictactoe.tictactoebackend.services;

import com.vm.interview.tictactoe.tictactoebackend.dos.BoardDO;
import com.vm.interview.tictactoe.tictactoebackend.enums.GameStatus;
import com.vm.interview.tictactoe.tictactoebackend.enums.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.function.IntFunction;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class StatusService {

    private final BoardDO boardDO;

    @Autowired
    StatusService(BoardDO boardDO) {
        this.boardDO = boardDO;
    }

    /**
     * Gives back status of the game, which can be WIN, LOST or DRAW depending on the board.
     *
     * @return status of current game
     */
    public GameStatus getStatus() {
        if (isThreeInRow() || isThreeInColumn() || isThreeDiagonally()) {
            return GameStatus.WON;
        } else if (noMoreMoves()) {
            return GameStatus.DRAW;
        } else {
            return GameStatus.IN_PROGRESS;
        }
    }

    private boolean noMoreMoves() {
        return IntStream.range(0, 9).mapToObj(cell -> boardDO.getBoard().get(cell)).filter(Objects::nonNull).count() == 9;
    }

    private boolean isThreeDiagonally() {
        return areAllPlayersEqual(IntStream.range(0, 9).filter(cell -> cell % 4 == 0).mapToObj(cell -> boardDO.getBoard().get(cell)).filter(Objects::nonNull).collect(Collectors.toList())) ||
                areAllPlayersEqual(IntStream.range(2, 7).filter(cell -> cell % 2 == 0).mapToObj(cell -> boardDO.getBoard().get(cell)).filter(Objects::nonNull).collect(Collectors.toList()));

    }

    private boolean isThreeInColumn() {
        return IntStream.range(0, 3)
                .mapToObj(row -> getPlayers(column -> boardDO.getBoard().get(row + (column * 3))))
                .anyMatch(this::areAllPlayersEqual);
    }

    private boolean isThreeInRow() {
        return IntStream.range(0, 3)
                .mapToObj(row -> getPlayers(column -> boardDO.getBoard().get(column + (row * 3))))
                .anyMatch(this::areAllPlayersEqual);
    }

    private boolean areAllPlayersEqual(List<Player> playerList) {
        return playerList.size() == 3 && playerList.stream().distinct().count() == 1;
    }

    private List<Player> getPlayers(IntFunction<Player> playerMapper) {
        return IntStream.range(0, 3).mapToObj(playerMapper).filter(Objects::nonNull).collect(Collectors.toList());
    }

}
