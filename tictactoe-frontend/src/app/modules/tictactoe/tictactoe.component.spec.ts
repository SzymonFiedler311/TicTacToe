import {TictactoeComponent} from './tictactoe.component';
import {Observable, of} from "rxjs";
import {PointModel} from "../../models/point.model";

describe('TictactoeComponent', () => {
  let component: TictactoeComponent;
  let gameFacade: { setPoint: jasmine.Spy; getCurrentPlayer: jasmine.Spy; resetGame: jasmine.Spy; tempPoint: PointModel; player$: Observable<string> };
  let statusFacade: { getStatus: jasmine.Spy; status$: Observable<string>};
  let matDialog: { open: jasmine.Spy; };
  let refSpy: { afterClosed: jasmine.Spy; };

  beforeEach(async () => {
    matDialog = jasmine.createSpyObj('MatDialog', ['open']);
    refSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    gameFacade = jasmine.createSpyObj('GameFacade', ['resetGame', 'setPoint', 'tempPoint', 'player$', 'getCurrentPlayer']);
    statusFacade = jasmine.createSpyObj('StatusFacade', ['status$', 'getStatus']);
    component = new TictactoeComponent(gameFacade as any, statusFacade as any, matDialog as any);
    gameFacade.player$ = of('player');
    statusFacade.status$ = of('status');
    statusFacade.getStatus.and.returnValue(of(statusFacade.status$))
    gameFacade.getCurrentPlayer.and.returnValue(of(gameFacade.player$))
    component.ngOnInit();
  });

  afterEach(async () => {
    component.ngOnDestroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create dialog for status WON', () => {
    gameFacade.resetGame.and.returnValue(of(void 0));
    matDialog.open.and.returnValue(refSpy);
    refSpy.afterClosed.and.returnValue(of(void 0));
    component.createDialog('WON');
    expect(refSpy.afterClosed).toHaveBeenCalled();
    expect(matDialog.open).toHaveBeenCalled();
    expect(gameFacade.resetGame).toHaveBeenCalled();
  });

  it('should create dialog for status draw', () => {
    gameFacade.resetGame.and.returnValue(of(void 0));
    matDialog.open.and.returnValue(refSpy);
    refSpy.afterClosed.and.returnValue(of(void 0));
    component.createDialog('DRAW');
    expect(refSpy.afterClosed).toHaveBeenCalled();
    expect(matDialog.open).toHaveBeenCalled();
    expect(gameFacade.resetGame).toHaveBeenCalled();
  });

  it('should set point', () => {
    gameFacade.setPoint.and.returnValue(of(void 0));
    gameFacade.tempPoint = {
      coordinates: 0
    };
    component.setPoint();
    expect(gameFacade.setPoint).toHaveBeenCalled();
    expect(gameFacade.tempPoint.coordinates).toEqual(-1);
  });
});
