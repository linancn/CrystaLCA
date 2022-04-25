import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import homepage from './en-US/homepage';
import menu from './en-US/menu';
import pages from './en-US/pages';
import pwa from './en-US/pwa';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';
import plan from './en-US/plan';
import project from './en-US/project';
import flow from './en-US/flow';
import options from './en-US/options';
import flowproperty from './en-US/flowproperty';
import process from './en-US/process';
import unitgroup from './en-US/unitgroup';
import category from './en-US/category';
import location from './en-US/location';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.copyright.produced': 'Developed by CrystaLCA R&D Team',
  'app.preview.down.block': 'Download this page to your local project',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
  ...homepage,
  ...plan,
  ...project,
  ...flow,
  ...options,
  ...flowproperty,
  ...process,
  ...unitgroup,
  ...category,
  ...location,
};
