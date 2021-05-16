package com.vm.interview.tictactoe.tictactoebackend.controllers;

import com.vm.interview.tictactoe.tictactoebackend.enums.GameStatus;
import com.vm.interview.tictactoe.tictactoebackend.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tictactoe")
public class StatusController {

    private final StatusService statusService;

    @Autowired
    StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @GetMapping
    @RequestMapping(path = "/getStatus")
    public GameStatus getStatus() {
        return statusService.getStatus();
    }
}
