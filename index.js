/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native'
import App from 'src/js/App'
import { name as appName } from '@configs/app.json'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import React from 'react'
import Reactotron from '@configs/reactotron'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { AppearanceProvider } from 'react-native-appearance'
import Helpers from '@helpers'
import moment from 'moment'
import 'moment/locale/ru'
import { setIsDarkTheme as reduxSetIsDarkTheme } from '@core/generated/actions'
import 'react-native-console-time-polyfill'

const store = createStore(...new Reactotron()) //create redux store

LogBox.ignoreLogs(['tintColor'])
LogBox.ignoreAllLogs(true)
moment.locale('ru')

function select(state, key) {
  return state[key]
}

function subscribe(key, cb) {
  let currentValue
  function handleChange() {
    let previousValue = currentValue
    currentValue = select(store.getState(), key)

    if (previousValue !== currentValue) {
      cb(currentValue)
    }
  }

  store.subscribe(handleChange)
}

let storeGetted

const Wrapper = () => {
  let reduxStore = store.getState()

  if (!storeGetted) {
    Helpers.Store.getAll(['isDarkTheme']).then(async res => {
      storeGetted = true

      if (res.isDarkTheme !== null) {
        store.dispatch(reduxSetIsDarkTheme(JSON.parse(res.isDarkTheme)))
      }
    })
  }

  const [isDarkTheme, setIsDarkTheme] = React.useState(reduxStore.isDarkTheme)
  let theme = isDarkTheme ? 'dark' : 'light'

  subscribe('isDarkTheme', setIsDarkTheme)

  return (
    <React.Fragment>
      <AppearanceProvider>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <Provider store={store}>
            <App />
          </Provider>
        </ApplicationProvider>
      </AppearanceProvider>
    </React.Fragment>
  )
}

AppRegistry.registerComponent(appName, () => Wrapper)
