import React from 'react'
import { View,  StyleSheet, _Image } from 'react-native'
import {  Text } from '@ui-kitten/components'
import KeyboardAvoidingView from '@core/components/base/keyboardAvoidingView'
import { tailwind } from '@tailwind'
import Page from '@core/components/abstract/page'
import { connect } from 'react-redux'
import { BASEURL, PORT } from '@core/generated/config'
import style from '../style'
import Form from '@core/components/base/form'
import ImageOverlay from '@core/components/base/imageOverlay'

import Helpers from '@core/helpers'

import {
 
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
          title: 'Выход',
          style: tailwind('mt-auto'),
          status: 'control',
          size: 'giant',
          onPress: this.onSubmit
        }
      ]
    }
  }


  render() {
    Helpers.log('tasks', this.tasks)
    return this._render(
      <>
        <KeyboardAvoidingView>
          <ImageOverlay style={tailwind('flex ')}>
            <View
              style={{
                ...tailwind('flex mt-2 mb-2 justify-center items-center'),
                
              }}>
              <Text style={tailwind(' mt-2')} category="s1" status="control">
                Еще
              </Text>
            </View>
           <View>
           <Form
              url={`${BASEURL}:${PORT}/user/home`}
              wrapperProps={{ style: tailwind('flex px-4') }}
              elements={this.state.elements} // отображение блока элементов
            />
           </View>
           <View style={{ ...tailwind('h-40') }}></View>
            <MainMenu go={this.go}></MainMenu>
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
