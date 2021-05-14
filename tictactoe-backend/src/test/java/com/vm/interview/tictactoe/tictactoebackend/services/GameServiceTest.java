package com.vm.interview.tictactoe.tictactoebackend.services;

import com.vm.interview.tictactoe.tictactoebackend.dos.BoardDO;
import com.vm.interview.tictactoe.tictactoebackend.dos.GameDO;
import com.vm.interview.tictactoe.tictactoebackend.dos.PointDO;
import com.vm.interview.tictactoe.tictactoebackend.enums.GameStatus;
import com.vm.interview.tictactoe.tictactoebackend.enums.Player;
import com.vm.interview.tictactoe.tictactoebackend.validators.GameValidator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GameServiceTest {

    @Spy
    private BoardDO boardDO;
    @Spy
    private GameDO gameDO;
    @Mock
    private StatusService statusService;
    @Mock
    private GameValidator gameValidator;
    @InjectMocks
    private GameService gameService;

    @Test
    void shouldSetPoint() {
        //given
        PointDO pointDO = new PointDO();
        pointDO.setCoordinates(2);
        //when
        gameService.setPoint(pointDO);
        //then
        assertEquals(Player.X, gameService.getBoard().get(2), "Player on second position should be placed.");
    }

    @Test
    void shouldChangeCurrentPlayer() {
        //given
        PointDO pointDO = new PointDO();
        pointDO.setCoordinates(2);
        //when
        gameService.setPoint(pointDO);
        //then
        assertEquals(Player.O, gameService.getCurrentPlayer(), "Player should be changed after move.");
    }

    @Test
    void shouldChangeGameStatus() {
        //given
        PointDO pointDO = new PointDO();
        pointDO.setCoordinates(2);
        when(statusService.getStatus()).thenReturn(GameStatus.DRAW);
        //when
        gameService.setPoint(pointDO);
        //then
        verify(gameDO).setGameStatus(GameStatus.DRAW);
    }

    @Test
    void shouldClearBoard() {
        //given
        PointDO pointDO = new PointDO();
        pointDO.setCoordinates(2);
        gameService.setPoint(pointDO);
        assertEquals(Player.X, gameService.getBoard().get(2), "Player should be placed.");
        //when
        gameService.clearBoard();
        //then
        assertNull(gameService.getBoard().get(2), "Player should be cleared.");
    }
}