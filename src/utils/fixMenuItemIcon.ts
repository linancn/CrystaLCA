// import React from 'react';
import type { MenuDataItem } from '@ant-design/pro-layout';
// import * as allIcons from '@ant-design/icons';

// FIX从接口获取菜单时icon为string类型
// const fixMenuItemIcon = (menus: MenuDataItem[], iconType='Outlined'): MenuDataItem[] => {
const fixMenuItemIcon = (menus: MenuDataItem[]): MenuDataItem[] => {
  // menus.forEach((item) => {
  //   const {icon, children} = item;
  //   if (typeof icon === 'string') {
  //     const fixIconName = icon.slice(0,1).toLocaleUpperCase()+icon.slice(1) + iconType;
  //     item.icon = React.createElement(allIcons[fixIconName] || allIcons[icon]);
  //   }
  //   children && children.length>0 ? item.children = fixMenuItemIcon(children) : null;
  // });
  return menus;
};

export default fixMenuItemIcon;
