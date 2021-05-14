package com.vm.interview.tictactoe.tictactoebackend.controllers;

import com.vm.interview.tictactoe.tictactoebackend.dos.PointDO;
import com.vm.interview.tictactoe.tictactoebackend.enums.Player;
import com.vm.interview.tictactoe.tictactoebackend.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GameController {

    private final GameService gameService;

    @Autowired
    GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping
    @RequestMapping(path = "/setPoint")
    public void setPoint(@RequestBody PointDO point) {
        gameService.setPoint(point);
    }

    @GetMapping
    @RequestMapping(path = "/getPlayer")
    public Player getCurrentPlayer() {
        return gameService.getCurrentPlayer();
    }

    @PostMapping
    @RequestMapping(path = "/clearBoard")
    public void clearBoard() {
        gameService.clearBoard();
    }

    @GetMapping
    @RequestMapping(path = "/getBoard")
    public List<Player> getBoard() {
        return gameService.getBoard();
    }
}
