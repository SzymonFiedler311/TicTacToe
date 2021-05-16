import {TestBed} from '@angular/core/testing';

import {HttpErrorService} from './http-error.service';

describe('HttpErrorService', () => {
  let service: HttpErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snackbar', () => {
    let snackSpy: {open: jasmine.Spy;};
    snackSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    service.onErrorCaught(snackSpy as any, "message");
    expect(snackSpy.open.calls.count()).toBe(1, 'one call');
  });
});
