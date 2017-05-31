import { MyTodoPage } from './app.po';

describe('my-todo App', () => {
  let page: MyTodoPage;

  beforeEach(() => {
    page = new MyTodoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
