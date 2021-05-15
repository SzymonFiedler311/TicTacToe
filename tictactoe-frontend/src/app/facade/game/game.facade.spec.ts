import { GameFacade } from './game.facade';
import {StatusApi} from "../../api/status/status.api";
import {of} from "rxjs";
import {GameApi} from "../../api/game/game.api";
import {PointModel} from "../../models/point.model";

describe('GameFacade', () => {
  let facade: GameFacade;
  let statusFacade: { getStatus: jasmine.Spy };
  let gameApi: { setPoint: jasmine.Spy; getCurrentPlayer: jasmine.Spy; clearBoard: jasmine.Spy; getBoard: jasmine.Spy; };

  beforeEach(() => {
    statusFacade = jasmine.createSpyObj('StatusApi', ['getStatus']);
    gameApi = jasmine.createSpyObj('GameApi', ['setPoint', 'getCurrentPlayer', 'clearBoard', 'getBoard']);
    facade = new GameFacade(gameApi as any, statusFacade as any);
  });

  it('should be defined', () => {
    expect(facade).toBeDefined();
  });

  it('should get current player', (() => {
    const expectedPlayer: string = "X";
    gameApi.getCurrentPlayer.and.returnValue(of(expectedPlayer));
    facade.getCurrentPlayer();
    expect(facade.player).toEqual(expectedPlayer, 'expected player does not match');
    expect(gameApi.getCurrentPlayer.calls.count()).toBe(1, 'one call');
  }));

  it('should get board', (() => {
    const expectedBoard: string[] = ["X", "O"];
    gameApi.getBoard.and.returnValue(of(expectedBoard));
    facade.getBoard();
    expect(facade.board).toEqual(expectedBoard, 'expected board does not match');
    expect(gameApi.getBoard.calls.count()).toBe(1, 'one call');
  }));

  it('should clear board', (() => {
    gameApi.clearBoard.and.returnValue(of(void 0));
    facade.clearBoard();
    expect(gameApi.clearBoard.calls.count()).toBe(1, 'one call');
  }));

  it('should set point', (() => {
    const point: PointModel = {
      coordinates: 3
    };
    const expectedPlayer: string = "X";
    gameApi.getCurrentPlayer.and.returnValue(of(expectedPlayer));
    gameApi.setPoint.and.returnValue(of(void 0));
    facade.setPoint(point);
    expect(facade.player).toEqual(expectedPlayer, 'expected player does not match');
    expect(statusFacade.getStatus.calls.count()).toBe(1, 'one call');
    expect(gameApi.getCurrentPlayer.calls.count()).toBe(1, 'one call');
  }));
});
