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
import { onChange } from 'react-native-reanimated'
import { relativeTimeThreshold } from 'moment'
import Log from '@core/helpers/log'

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
          elementType: Form.BaseElementTypes.password,
          validation: Form.Validation.password,
          elementType: Form.BaseElementTypes.Password,
          textStyle: tailwind('pr-12'),
          status: 'control',
          name: 'password',
          style: tailwind('mt-4'),
          onChangeValue: this.onPasswordChange
        },
        {
          elementType: Form.BaseElementTypes.Button,
          title: 'Забыли пароль?',
          style: tailwind('px-0 ml-auto mb-4'),
          appearance: 'ghost',
          status: 'control',
          // onPress: () => Helpers.log('text')
          onPress: () => this.go(Routes.main.home) // restore отсутствует, такого пути не существует
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
          // onPress: () => this.go(Routes.auth.signup) // при нажатии на элемент переход на signup -
          // onPress: async () =>  Helpers.log(await Helpers.Store.get('email'))
          onPress: () => Helpers.log('text')
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
              Авторизация
            </Text>
          </View>
          <Form
            url={`${BASEURL}:${PORT}/user/signin`}
            wrapperProps={{ style: tailwind('flex-1 mt-8 px-4') }}
            elements={this.state.elements} // отображение блока элементов
          />
          <Button
            element={{
              title: 'alert',
              onPress: () => {
                // при нажатии модальное окно
                this.props.setAlert({
                  title: 'Удалить комментарий?',
                  buttons: [
                    {
                      text: 'Да',
                      onPress: async () => {}
                    },
                    {
                      text: 'Нет',
                      style: tailwind('text-red')
                    }
                  ]
                })
              }
            }}
          />

          <Button
            element={{
              title: 'select',
              onPress: () => {
                // при нажатии всплывает модальное окно
                this.props.setSelect({
                  list: [
                    { title: 'Дубликат', value: 'dublicate' },
                    { title: 'В работе', value: 'inwork' }
                  ],
                  onChange: value => false
                })
              }
            }}
          />

          <Button
            element={{
              title: 'popup',
              onPress: () => {
                this.props.setPopupMenu({
                  // всплывающее меню
                  title: 'Выберите действие:',
                  groups: [
                    {
                      list: [
                        { title: 'Сохранить', onPress: () => false },
                        { title: 'Вернуться к редактированию' },
                        { title: 'Отменить изменения', onPress: () => false }
                      ]
                    }
                  ]
                })
              }
            }}
          />

          <Button
            element={{
              title: 'Галлерея',
              onPress: () => {
                // переход в галерею
                this.props.setImageViewer({
                  images: [
                    'https://www.gizmonews.ru/wp-content/uploads/2016/08/charmeleon-850x850.png',
                    'https://crm.q-digital.org/assets/gentelella/public/images/logo.png'
                  ],
                  id: 0
                })
              }
            }}
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
