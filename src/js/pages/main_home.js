import React from 'react'
import { View, Image } from 'react-native'
import { Text } from '@ui-kitten/components'
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

export class AuthSignin extends Page {
  // смотрим класс Page какие пропсы он передает
  constructor(_props) {
    super(_props)

    this.state = {
      // описываем состояние каждого элемента на странице авторизации
      elements: [
        {
          validation: Form.Validation.email,
          elementType: Form.BaseElementTypes.Input,
          label: 'Тема',
          status: 'control',
          placeholder: 'наименование темы',
          
        },
        {
          elementType: Form.BaseElementTypes.password,
          validation: Form.Validation.password,
          elementType: Form.BaseElementTypes.Password,
          textStyle: tailwind('pr-12'),
          status: 'control',
          name: 'password',
          style: tailwind('mt-4')
        },
        {
          elementType: Form.BaseElementTypes.Button,
          title: 'Забыли пароль?',
          style: tailwind('px-0 ml-auto mb-4'),
          appearance: 'ghost',
          status: 'control',
          onPress: () => this.go() // restore отсутствует, такого пути не существует
        },
        {
          elementType: Form.BaseElementTypes.Submit,
          title: 'Войти',
          style: tailwind('mt-auto'),
          status: 'control',
          size: 'giant',
          onPress: this.onSubmit
        },
        {
          elementType: Form.BaseElementTypes.Button,
          title: 'У меня еще нет аккаунта',
          style: tailwind('mx-4 my-3'),
          status: 'control',
          appearance: 'ghost',
          onPress: () => this.go(Routes.auth.signup) // при нажатии на элемент переход на signup -
          // нет такого поля в Routes.auth
        }
      ]
    }
  }

  onSubmit = ({ data }) => {}

  render() {
    return this._render(
      <KeyboardAvoidingView>
        <ImageOverlay style={tailwind('flex bg-blue')}>
          <View
            style={{
              ...tailwind('justify-center items-center'), // почему spread?
              ...style.signupView // почему spread?
            }}>
            <Text style={tailwind('mt-2')} category="s1" status="control">
              Майн хоме
            </Text>
          </View>
          <Form
            url={`${BASEURL}:${PORT}/user/signin`}
            wrapperProps={{ style: tailwind('flex px-4') }}
            elements={this.state.elements} // отображение блока элементов
          />
        
        </ImageOverlay>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(
  Page.mapStateToProps,
  Page.mapDispatchToProps
)(AuthSignin)
