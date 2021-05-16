import {GameFacade} from './game.facade';
import {StatusApi} from "../../api/status/status.api";
import {of} from "rxjs";
import {GameApi} from "../../api/game/game.api";

describe('GameFacade', () => {
  let facade: GameFacade;
  let statusFacade: { getStatus: jasmine.Spy };
  let gameApi: { setPoint: jasmine.Spy; getCurrentPlayer: jasmine.Spy; resetGame: jasmine.Spy; getBoard: jasmine.Spy; };

  beforeEach(() => {
    statusFacade = jasmine.createSpyObj('StatusApi', ['getStatus']);
    gameApi = jasmine.createSpyObj('GameApi', ['setPoint', 'getCurrentPlayer', 'resetGame', 'getBoard']);
    facade = new GameFacade(gameApi as any, statusFacade as any);
  });

  it('should be defined', () => {
    expect(facade).toBeDefined();
  });

  it('should get current player', (() => {
    const expectedPlayer: string = "O";
    gameApi.getCurrentPlayer.and.returnValue(of(expectedPlayer));
    facade.getCurrentPlayer();
    facade.player$.subscribe(player =>
      expect(player).toEqual(expectedPlayer, 'expected player does not match'));
    expect(gameApi.getCurrentPlayer.calls.count()).toBe(1, 'one call');
  }));

  it('should get board', (() => {
    const expectedBoard: string[] = ["X", "O"];
    gameApi.getBoard.and.returnValue(of(expectedBoard));
    facade.getBoard();
    facade.board$.subscribe(board =>
      expect(board).toEqual(expectedBoard, 'expected board does not match'));
    expect(gameApi.getBoard.calls.count()).toBe(1, 'one call');
  }));

  it('should reset game', (() => {
    const expectedPlayer: string = "X";
    const expectedBoard: string[] = ["X", "O"];
    gameApi.getBoard.and.returnValue(of(expectedBoard));
    gameApi.resetGame.and.returnValue(of(void 0));
    gameApi.getCurrentPlayer.and.returnValue(of(expectedPlayer));
    facade.resetGame();
    facade.player$.subscribe(player =>
      expect(player).toEqual(expectedPlayer, 'expected player does not match'));
    facade.board$.subscribe(board =>
      expect(board).toEqual(expectedBoard, 'expected board does not match'));
    expect(gameApi.getBoard.calls.count()).toBe(1, 'one call');
    expect(gameApi.getCurrentPlayer.calls.count()).toBe(1, 'one call');
    expect(gameApi.resetGame.calls.count()).toBe(1, 'one call');
  }));

  it('should set point', (() => {
    facade.tempPoint = {
      coordinates: 3
    };
    const expectedPlayer: string = "O";
    gameApi.setPoint.and.returnValue(of(void 0));
    gameApi.getCurrentPlayer.and.returnValue(of(expectedPlayer));
    statusFacade.getStatus.and.returnValue(of('status'));
    facade.setPoint();
    facade.player$.subscribe(player =>
      expect(player).toEqual(expectedPlayer, 'expected player does not match')
    );
  }));
});
