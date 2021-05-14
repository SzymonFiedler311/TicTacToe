package com.vm.interview.tictactoe.tictactoebackend.controllers;

import com.vm.interview.tictactoe.tictactoebackend.dos.PointDO;
import com.vm.interview.tictactoe.tictactoebackend.services.GameService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class GameControllerTest {

    @Mock
    private GameService gameService;
    @InjectMocks
    private GameController gameController;

    @Test
    void shouldSetPoint() {
        //given
        PointDO pointDO = new PointDO();
        pointDO.setCoordinates(2);
        //when
        gameController.setPoint(pointDO);
        //then
        verify(gameService).setPoint(pointDO);
    }

    @Test
    void shouldGetCurrentPlayer() {
        //when
        gameController.getCurrentPlayer();
        //then
        verify(gameService).getCurrentPlayer();
    }

    @Test
    void shouldClearBoard() {
        //when
        gameController.clearBoard();
        //then
        verify(gameService).clearBoard();
    }

    @Test
    void shouldGetBoard() {
        //when
        gameController.getBoard();
        //then
        verify(gameService).getBoard();
    }
}
