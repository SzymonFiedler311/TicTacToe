package com.vm.interview.tictactoe.tictactoebackend.services;

import com.vm.interview.tictactoe.tictactoebackend.dos.BoardDO;
import com.vm.interview.tictactoe.tictactoebackend.enums.GameStatus;
import com.vm.interview.tictactoe.tictactoebackend.enums.Player;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class StatusServiceTest {

    private StatusService statusService;
    private final BoardDO boardDO = new BoardDO();

    @BeforeEach
    void setUp() {
        boardDO.setBoard(Arrays.asList(new Player[9]));
        statusService = new StatusService(boardDO);
    }

    @Test
    void shouldFindThreeInFirstRow() {
        //given
        generateBoard(0, 1, 2);
        //when
        GameStatus status = statusService.getStatus();
        //then
        assertEquals(GameStatus.WON, status, "Player should have win.");
    }

    private void generateBoard(int i, int i2, int i3) {
        boardDO.getBoard().set(i, Player.X);
        boardDO.getBoard().set(i2, Player.X);
        boardDO.getBoard().set(i3, Player.X);
    }

    @Test
    void shouldFindThreeInSecondRow() {
        //given
        generateBoard(3, 4, 5);
        //when
        GameStatus status = statusService.getStatus();
        //then
        assertEquals(GameStatus.WON, status, "Player should have win.");
    }

    @Test
    void shouldFindThreeInThirdRow() {
        //given
        generateBoard(6, 7, 8);
        //when
        GameStatus status = statusService.getStatus();
        //then
        assertEquals(GameStatus.WON, status, "Player should have win.");
    }

    @Test
    void shouldFindThreeInFirstColumn() {
        //given
        generateBoard(0, 3, 6);
        //when
        GameStatus status = statusService.getStatus();
        //then
        assertEquals(GameStatus.WON, status, "Player should have win.");
    }

    @Test
    void shouldFindThreeInSecondColumn() {
        //given
        generateBoard(1, 4, 7);
        //when
        GameStatus status = statusService.getStatus();
        //then
        assertEquals(GameStatus.WON, status, "Player should have win.");
    }

    @Test
    void shouldFindThreeInThirdColumn() {
        //given
        generateBoard(2, 5, 8);
        //when
        GameStatus status = statusService.getStatus();
        //then
        assertEquals(GameStatus.WON, status, "Player should have win.");
    }

    @Test
    void shouldFindThreeDiagonally() {
        //given
        generateBoard(0, 4, 8);
        //when
        GameStatus status = statusService.getStatus();
        //then
        assertEquals(GameStatus.WON, status, "Player should have win.");
    }

    @Test
    void shouldFindThreeReverseDiagonally() {
        //given
        generateBoard(2, 4, 6);
        //when
        GameStatus status = statusService.getStatus();
        //then
        assertEquals(GameStatus.WON, status, "Player should have win.");
    }

    @Test
    void shouldFindNoMoreMoves() {
        //given
        BoardDO boardDO = new BoardDO();
        boardDO.setBoard(Arrays.asList(Player.X, Player.O, Player.X, Player.X, Player.O, Player.X, Player.O, Player.X, Player.O));
        statusService = new StatusService(boardDO);
        //when
        GameStatus status = statusService.getStatus();
        //then
        assertEquals(GameStatus.DRAW, status, "There should be a draw.");
    }

    @Test
    void shouldFindStatusInProgressWithoutAnyMove() {
        //given
        BoardDO boardDO = new BoardDO();
        boardDO.setBoard(Arrays.asList(new Player[9]));
        statusService = new StatusService(boardDO);
        //when
        GameStatus status = statusService.getStatus();
        //then
        assertEquals(GameStatus.IN_PROGRESS, status, "There should be game in progress.");
    }

    @Test
    void shouldFindStatusInProgressAfterMoves() {
        //given
        BoardDO boardDO = new BoardDO();
        boardDO.setBoard(Arrays.asList(new Player[9]));
        boardDO.getBoard().set(1, Player.X);
        boardDO.getBoard().set(3, Player.O);
        statusService = new StatusService(boardDO);
        //when
        GameStatus status = statusService.getStatus();
        //then
        assertEquals(GameStatus.IN_PROGRESS, status, "There should be game in progress.");
    }
}
