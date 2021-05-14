package com.vm.interview.tictactoe.tictactoebackend.exceptions;

/**
 * Thrown when move is made but game is already finished.
 */
public class InvalidGameStateException extends RuntimeException {

    public InvalidGameStateException(String msg) {
        super(msg);
    }
}
