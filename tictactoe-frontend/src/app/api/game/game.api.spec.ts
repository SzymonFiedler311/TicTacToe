import { GameApi } from './game.api';
import {of} from "rxjs";
import {PointModel} from "../../models/point.model";

describe('GameApi', () => {
  let api: GameApi;
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    api = new GameApi(httpClientSpy as any);
  });

  it('should be defined', () => {
    expect(api).toBeDefined();
  });

  it('should get player', (() => {
    const expectedPlayer: string = 'X';
    httpClientSpy.get.and.returnValue(of(expectedPlayer));
    api.getCurrentPlayer()
      .subscribe(async player => expect(player)
      .toEqual(expectedPlayer, 'expected player does not match'), fail);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  }));

  it('should get board', (() => {
    const expectedBoard: string[] = ["X", "O"];
    httpClientSpy.get.and.returnValue(of(expectedBoard));
    api.getBoard()
      .subscribe(async board => expect(board)
        .toEqual(expectedBoard, 'expected board does not match'), fail);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  }));

  it('should clear board', (() => {
    api.clearBoard();
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  }));

  it('should set point', (() => {
    const point: PointModel = {
      coordinates: 2
    }
    api.setPoint(point);
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  }));

});
