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
          label: 'E-mail',
          status: 'control',
          placeholder: 'mail@mail.ru',
          name: 'email',
          onChangeValue: this.onEmailChange
        },

        {
          elementType: Form.BaseElementTypes.Confirm_password,
          password: {
            validation: Form.Validation.password,
            elementType: Form.BaseElementTypes.Password,
            textStyle: tailwind('pr-12'),
            name: 'password',
            status: 'control',
            style: tailwind('mt-4')
            // onChangeValue: this.onPasswordChange
          },
          confirm: {
            validation: Form.Validation.confirm_password_front,
            textStyle: tailwind('pr-12'),
            name: 'confirm_password',
            status: 'control',
            style: tailwind('mt-4 mb-4'),
            onChangeValue: this.onPasswordChange
          }
        },
        {
          elementType: Form.BaseElementTypes.Submit,
          title: 'Зарегистрироваться',
          style: tailwind('mt-auto'),
          status: 'control',
          size: 'giant',
          onPress: this.onSubmit
        },
        {
          elementType: Form.BaseElementTypes.Button,
          title: 'У меня есть аккаунт',
          style: tailwind('mx-4 my-3'),
          status: 'control',
          appearance: 'ghost',
          onPress: () => this.go(Routes.auth.signin) // при нажатии на элемент переход на signup -
          // нет такого поля в Routes.auth
        }
      ]
    }
  }

  onEmailChange = value => {
    this.setState({ email: value })
  }

  onPasswordChange = value => {
    this.setState({ password: value })
  }

  onSubmit = async () => {
    const { email, password } = this.state
    Helpers.Store.set('email', email)
    Helpers.Store.set('password', password)
  }

  render() {
    return this._render(
      <KeyboardAvoidingView>
        <ImageOverlay style={tailwind('flex-1')}>
          <View
            style={{
              ...tailwind('justify-center items-center'), // почему spread?
              ...style.signupView // почему spread?
            }}>
            <Text style={tailwind('mt-6')} category="s1" status="control">
              Регистрация
            </Text>
          </View>
          <Form
            url={`${BASEURL}:${PORT}/user/signup`}
            wrapperProps={{ style: tailwind('flex-1 mt-8 px-4') }}
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
