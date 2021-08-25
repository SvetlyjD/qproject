require('node-env-file')('.env');
var fs = require('fs');
var dirConf = './src/core/generated'
var dirNavigator = './src/core/generated'
var dirPages = './src/js/pages';
const { DEFAULTROUTE } = process.env;

let pages = {};
let navigatorPages = [];
let innerText = '';

fs.readdir(dirPages, {}, (err, files) => {
  if (err) console.log('err', err)
  else {
    files.forEach((filename) => {
      let [name] = filename.split('.')
      let [section, component] = name.split('_')

      if (!pages[section])
        pages[section] = {};

      let path = `${section}/${component}`
      if (path === DEFAULTROUTE) {
        path = ''
      }

      pages[section][component] = `"/${path}"`

      navigatorPages.push(`{
        path: "/${path}",
        exact: true,
        component: require("@pages/${filename}").default
      }`)
    })

    innerText += '{'

    Object.keys(pages).forEach(section => {
      let sectionInnerText = '';
      Object.keys(pages[section]).forEach(component => {
        sectionInnerText += `${component}: ${pages[section][component]},`
      })
      innerText += `${section}: {${sectionInnerText}},`
    })

    innerText += '}'
  }

  fs.writeFileSync(dirConf + '/routes.js', `
export const routes = ${innerText};
export default routes;
    `);

  fs.writeFileSync(dirNavigator + '/navigator.js', `
import React from 'react'
import { NativeRouter, Route } from 'react-router-native';
export const Navigator = ({ onHistorySet = () => { } }) => <NativeRouter>
<Route render={({ history }) => {
  onHistorySet(history);
  return <></>
}} />
{[${navigatorPages}].map((item, key) => <Route {...item} key={key} />)}
</NativeRouter>;
export default Navigator;
      `);
})
