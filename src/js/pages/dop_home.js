import React from 'react'
import { View, Image, StyleSheet, TextInput, _Image } from 'react-native'
import { BottomNavigation, Text } from '@ui-kitten/components'
import KeyboardAvoidingView from '@core/components/base/keyboardAvoidingView'
import { tailwind } from '@tailwind'
import Page from '@core/components/abstract/page'
import { connect } from 'react-redux'
import { BASEURL, PORT } from '@core/generated/config'
import style from '../style'
import Form from '@core/components/base/form'
import ImageOverlay from '@core/components/base/imageOverlay'
import Routes from '@core/generated/routes'
import Button from '../../core/components/base/form/elements/button'
import Helpers from '@core/helpers'
import TaskCollection from '@collections/task1'
import { ScrollView } from 'react-native-gesture-handler'
import {
  BottomNavigationSimpleUsageShowcase,
  MainMenu
} from './bottom_navigation'

export class AuthSignin extends Page {
  // смотрим класс Page какие пропсы он передает
  constructor(_props) {
    super(_props)

    this.state = {
      // описываем состояние каждого элемента на странице авторизации
      elements: [
        {
          elementType: Form.BaseElementTypes.Submit,
          title: 'Отправить',
          style: tailwind('mt-auto'),
          status: 'control',
          size: 'giant',
          onPress: this.onSubmit
        }
      ]
    }
  }

  componentDidMount() {
    this.tasks = new TaskCollection({
      onLoad: () => {
        this.setState({ tasksLoaded: true })
      }
    })
  }

  onSubmit = ({ data }) => {}

  render() {
    Helpers.log('tasks', this.tasks)
    return this._render(
      <>
        <KeyboardAvoidingView>
          <ImageOverlay style={tailwind('flex ')}>
            <View
              style={{
                ...tailwind('justify-center items-center'),
                ...style.signupViewHome
              }}>
              <Text style={tailwind('mt-2')} category="s1" status="control">
                ещеkhkhgkjhgjlhgjlhgjhgjhgjlh
              </Text>
            </View>
            <Form
              url={`${BASEURL}:${PORT}/user/home`}
              wrapperProps={{ style: tailwind('flex px-4') }}
              elements={this.state.elements} // отображение блока элементов
            />

            <MainMenu></MainMenu>
          </ImageOverlay>
        </KeyboardAvoidingView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
    backgroundColor: 'white'
  }
})

export default connect(
  Page.mapStateToProps,
  Page.mapDispatchToProps
)(AuthSignin)
