import {StatusFacade} from './status.facade';
import {StatusApi} from "../../api/status/status.api";
import {of} from "rxjs";

describe('StatusFacade', () => {
  let facade: StatusFacade;
  let statusApi: { getStatus: jasmine.Spy };

  beforeEach(() => {
    statusApi = jasmine.createSpyObj('StatusApi', ['getStatus']);
    facade = new StatusFacade(statusApi as any);
  });

  it('should be defined', () => {
    expect(facade).toBeDefined();
  });

  it('should get status', (() => {
    const expectedStatus: string = "DRAW";
    statusApi.getStatus.and.returnValue(of(expectedStatus));
    facade.getStatus();
    expect(facade.status).toEqual(expectedStatus, 'expected status does not match');
    expect(statusApi.getStatus.calls.count()).toBe(1, 'one call');
  }));
});
