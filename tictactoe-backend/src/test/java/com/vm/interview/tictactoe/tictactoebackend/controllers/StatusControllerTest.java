package com.vm.interview.tictactoe.tictactoebackend.controllers;

import com.vm.interview.tictactoe.tictactoebackend.services.StatusService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class StatusControllerTest {

    @Mock
    private StatusService statusService;
    @InjectMocks
    private StatusController statusController;

    @Test
    void shouldGetGameStatus() {
        //when
        statusController.getStatus();
        //then
        verify(statusService).getStatus();
    }


}
