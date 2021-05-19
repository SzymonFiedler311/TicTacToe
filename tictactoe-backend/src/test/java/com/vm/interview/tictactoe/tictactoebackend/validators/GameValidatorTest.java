package com.vm.interview.tictactoe.tictactoebackend.validators;

import com.vm.interview.tictactoe.tictactoebackend.dos.BoardDO;
import com.vm.interview.tictactoe.tictactoebackend.dos.GameDO;
import com.vm.interview.tictactoe.tictactoebackend.dos.PointDO;
import com.vm.interview.tictactoe.tictactoebackend.enums.GameStatus;
import com.vm.interview.tictactoe.tictactoebackend.enums.Player;
import com.vm.interview.tictactoe.tictactoebackend.exceptions.InvalidGameStateException;
import com.vm.interview.tictactoe.tictactoebackend.exceptions.InvalidPointException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GameValidatorTest {

    @Mock
    private BoardDO boardDO;
    @Spy
    private GameDO gameDO;
    @InjectMocks
    private GameValidator gameValidator;

    @Test
    void shouldThrowExceptionWhenPointIsTooBig() {
        //given
        PointDO pointDO = new PointDO();
        pointDO.setCoordinates(9);
        //when
        assertThrows(InvalidPointException.class, () -> gameValidator.validatePoint(pointDO));
    }


    @Test
    void shouldThrowExceptionWhenPointAlreadyContainsValue() {
        //given
        PointDO pointDO = new PointDO();
        pointDO.setCoordinates(2);
        List<Player> playerList = Arrays.asList(new Player[9]);
        when(boardDO.getBoard()).thenReturn(playerList);
        playerList.set(2, Player.X);
        //when
        assertThrows(InvalidPointException.class, () -> gameValidator.validatePoint(pointDO));
    }

    @Test
    void shouldThrowExceptionWhenPointIsTooSmall() {
        //given
        PointDO pointDO = new PointDO();
        pointDO.setCoordinates(-2);
        //when
        assertThrows(InvalidPointException.class, () -> gameValidator.validatePoint(pointDO));
    }

    @Test
    void shouldNotThrowExceptionWhenPointIsOk() {
        //given
        when(boardDO.getBoard()).thenReturn(Arrays.asList(new Player[9]));
        PointDO pointDO = new PointDO();
        pointDO.setCoordinates(3);
        //when
        assertDoesNotThrow(() -> gameValidator.validatePoint(pointDO));
    }

    @Test
    void shouldThrowExceptionWhenGameIsFinished() {
        //given
        when(gameDO.getGameStatus()).thenReturn(GameStatus.DRAW);
        //when
        assertThrows(InvalidGameStateException.class, () -> gameValidator.validateStatus());
    }

    @Test
    void shouldNotThrowExceptionWhenGameIsInProgress() {
        //when
        assertDoesNotThrow(() -> gameValidator.validateStatus());
    }

}
