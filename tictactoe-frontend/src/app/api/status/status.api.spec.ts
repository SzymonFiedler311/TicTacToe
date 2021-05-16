import {StatusApi} from './status.api';
import {of} from "rxjs";

describe('StatusApi', () => {
  let api: StatusApi;
  let httpClientSpy: { get: jasmine.Spy; patch: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    api = new StatusApi(httpClientSpy as any);
  });

  it('should be defined', () => {
    expect(api).toBeDefined();
  });

  it('should get status', (() => {
    const expectedStatus: string = "DRAW";
    httpClientSpy.get.and.returnValue(of(expectedStatus));
    api.getStatus()
      .subscribe(async status => expect(status)
        .toEqual(expectedStatus, 'expected status does not match'), fail);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  }));
});
