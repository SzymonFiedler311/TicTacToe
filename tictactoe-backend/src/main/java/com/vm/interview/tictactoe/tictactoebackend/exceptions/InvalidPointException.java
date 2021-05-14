package com.vm.interview.tictactoe.tictactoebackend.exceptions;

/**
 * Thrown when move is made but game is already finished.
 */
public class InvalidPointException extends RuntimeException {

    public InvalidPointException(String msg) {
        super(msg);
    }
}
