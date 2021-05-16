import {BoardComponent} from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let gameApi: { setPoint: jasmine.Spy; getCurrentPlayer: jasmine.Spy; resetGame: jasmine.Spy; getBoard: jasmine.Spy; };

  beforeEach(async () => {
    component = new BoardComponent(gameApi as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
