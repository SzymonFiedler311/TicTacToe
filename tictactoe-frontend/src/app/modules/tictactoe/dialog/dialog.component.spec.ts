import {DialogComponent} from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;

  beforeEach(async () => {
   component = new DialogComponent('');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
