import 'jsdom-global/register';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import jsdom from 'jsdom';
import renderer from 'react-test-renderer';
import App from '../App';
import { MainLayout } from '../components/layout/main';
import { AppRoute, HomeRoute } from '../App';
const { JSDOM } = jsdom;
const { document } = new JSDOM(
  '<!doctype html><html><body><div id="root"></div></body></html>'
).window;
configure({
  adapter: new Adapter(),
  testURL: 'http://localhost'
});
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.document = document;
global.window = document.defaultView;
describe('<Application />', () => {
  const history = {
    push: jest.fn()
  };

  it('renders layout without crashing', () => {
    const app = shallow(<MainLayout />);
    expect(app.html()).toEqual(
      '<div class="main-layout"><div class="header">Trả lời ngay nhận ngay việc làm</div><div class="content"></div><div class="footer">© All right reserved by Infection</div></div>'
    );
  });

  it('renders route without crashing', () => {
    const app = shallow(
      <MemoryRouter>
        <HomeRoute />
      </MemoryRouter>
    );
    expect(app.html()).toEqual(
      '<div class="main-layout"><div class="header">Trả lời ngay nhận ngay việc làm</div><div class="content"></div><div class="footer">© All right reserved by Infection</div></div>'
    );
  });
});
