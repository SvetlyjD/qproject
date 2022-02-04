import React, { useState } from 'react'
import Routes from '@core/generated/routes'
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { connect } from 'react-redux'
import Page from '@core/components/abstract/page'


export class MainMenu extends React.Component {
  constructor(_props) {
    super(_props)

    this.state = {
      index: 0
    }
  }
  render() {
    return (
      <BottomNavigation
      selectedIndex={this.state.index}          
      onSelect={index => {
        this.setState({selectedIndex:index})   
        !index
            ? this.props.go(Routes.main.home)
            : this.props.go(Routes.dop.home)
          // this.setState({ index: !this.state.index })
        }}>
        <BottomNavigationTab title="Главная" />
        <BottomNavigationTab title="Еще" />
      </BottomNavigation>
    )
  }
}
export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(MainMenu)
