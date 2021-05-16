package com.vm.interview.tictactoe.tictactoebackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when move is made but game is already finished.
 */
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class InvalidPointException extends RuntimeException {

    public InvalidPointException(String msg) {
        super(msg);
    }
}
