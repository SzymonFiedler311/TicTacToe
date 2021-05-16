import {TictactoeComponent} from './tictactoe.component';

describe('TictactoeComponent', () => {
  let component: TictactoeComponent;
  let gameFacade: { setPoint: jasmine.Spy; getCurrentPlayer: jasmine.Spy; resetGame: jasmine.Spy; };
  let statusFacade: { getStatus: jasmine.Spy; };

  beforeEach(async () => {
    let matDialog = {};
    component = new TictactoeComponent(gameFacade as any, statusFacade as any, matDialog as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
