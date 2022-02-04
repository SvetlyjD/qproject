import React, { useState } from 'react'
import Routes from '@core/generated/routes'
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { connect } from 'react-redux'
import Page from '@core/components/abstract/page'
import Helpers from '@core/helpers'
import { TouchableOpacity, TouchableWithoutFeedbackComponent } from 'react-native'

export const MainMenu = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  // render() {
  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={index => {
        index ? this.go(Routes.main.home) :  this.go(Routes.dop.home)
        setSelectedIndex(index)
             }}>
      {/* <TouchableOpacity onPress={() => Helpers.log('1')}> */}
        <BottomNavigationTab title="Главная" />
      {/* </TouchableOpacity> */}
      {/* <TouchableOpacity  onPress={() => Helpers.log('2')}> */}
      <BottomNavigationTab title="Еще" />
      {/* </TouchableOpacity> */}
         </BottomNavigation>
  )
  // }
}

export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(MainMenu)
