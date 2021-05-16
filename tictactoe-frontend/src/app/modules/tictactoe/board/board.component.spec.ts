import {BoardComponent} from './board.component';
import {PointModel} from "../../../models/point.model";
import {Observable, of} from "rxjs";

describe('BoardComponent', () => {
  let component: BoardComponent;
  let gameApi: { tempPoint: PointModel; player$: Observable<string>; board$: Observable<string[]>; getBoard: jasmine.Spy; getCurrentPlayer: jasmine.Spy;  };

  beforeEach(async () => {
    gameApi = jasmine.createSpyObj('GameApi', ['player$', 'board$', 'tempPoint', 'getBoard', 'getCurrentPlayer']);
    gameApi.player$ = of('X');
    gameApi.board$ = of(['']);
    component = new BoardComponent(gameApi as any);
    gameApi.getBoard.and.returnValue(of(gameApi.board$))
    gameApi.getCurrentPlayer.and.returnValue(of(gameApi.player$))
    component.board = ['', '', '', ''];
    component.ngOnInit();
  });

  afterEach(async () => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set temporary point', () => {
    component.setTempPoint(2);
    expect(component.board[2]).toEqual('X');
    expect(gameApi.tempPoint.coordinates).toEqual(2);
  });

  it('should not set temporary point when there is already a value there', () => {
    component.board = ['', '', 'O', ''];
    component.setTempPoint(2);
    expect(component.board[2]).toEqual('O');
  });

  it('should clear previous selection', () => {
    component.setTempPoint(2);
    expect(component.board[2]).toEqual('X');
    component.setTempPoint(3);
    expect(component.board[2]).toEqual('');
    expect(component.board[3]).toEqual('X');
  });

  it('should not clear previous selection because the new one points to the same', () => {
    component.setTempPoint(2);
    component.setTempPoint(2);
    expect(component.board[2]).toEqual('X');
  });
});
