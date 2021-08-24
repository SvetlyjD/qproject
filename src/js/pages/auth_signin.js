import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import KeyboardAvoidingView from '@core/components/base/keyboardAvoidingView';
import { tailwind } from '@tailwind';
import Page from '@core/components/abstract/page'
import { connect } from 'react-redux';
import { BASEURL, PORT } from '@core/generated/config';
import style from '../style';
import Form from '@core/components/base/form';
import ImageOverlay from '@core/components/base/imageOverlay'
import Routes from '@core/generated/routes'
import Button from '../../core/components/base/form/elements/button';

export class AuthSignin extends Page {
  constructor(_props) {
    super(_props);

    this.state = {
      elements: [
        {
          validation: Form.Validation.email,
          elementType: Form.BaseElementTypes.Input,
          label: 'E-mail',
          status: 'control',
          placeholder: 'mail@mail.ru',
          name: 'email',
        },
        {
          elementType: Form.BaseElementTypes.password,
          validation: Form.Validation.password,
          elementType: Form.BaseElementTypes.Password,
          textStyle: tailwind('pr-12'),
          status: 'control',
          name: 'password',
          style: tailwind('mt-4'),
        },
        {
          elementType: Form.BaseElementTypes.Button,
          title: 'Забыли пароль?',
          style: tailwind('px-0 ml-auto mb-4'),
          appearance: "ghost",
          status: "control",
          onPress: () => this.go(Routes.auth.restore)
        },
        {
          elementType: Form.BaseElementTypes.Submit,
          title: 'Войти',
          style: tailwind('mt-auto'),
          status: "control",
          size: "giant",
          onPress: this.onSubmit
        },
        {
          elementType: Form.BaseElementTypes.Button,
          title: 'У меня еще нет аккаунта',
          style: tailwind('mx-4 my-3'),
          status: "control",
          appearance: "ghost",
          onPress: () => this.go(Routes.auth.signup)
        },
      ]
    };
  }

  onSubmit = ({ data }) => {
  }

  render() {
    return this._render(
      <KeyboardAvoidingView>
        <ImageOverlay style={tailwind('flex-1')}>
          <View
            style={{
              ...tailwind('justify-center items-center'),
              ...style.signupView,
            }}
          >
            <Text style={tailwind('mt-4')} category="s1" status="control">
              Авторизация
            </Text>
          </View>
          <Form
            url={`${BASEURL}:${PORT}/user/signin`}
            wrapperProps={{ style: tailwind('flex-1 mt-8 px-4') }}
            elements={this.state.elements}
          />
          <Button element={{
            title: "alert",
            onPress: () => {
              this.props.setAlert({
                title: 'Удалить комментарий?',
                buttons: [
                  {
                    text: 'Да',
                    onPress: async () => {
                    },
                  },
                  {
                    text: 'Нет',
                    style: tailwind('text-red'),
                  },
                ],
              });
            }
          }} />

          <Button element={{
            title: "select",
            onPress: () => {
              this.props.setSelect({
                list: [
                  { title: 'Дубликат', value: 'dublicate' },
                  { title: 'В работе', value: 'inwork' },
                ],
                onChange: (value) => false,
              });
            }
          }} />

          <Button element={{
            title: "popup",
            onPress: () => {
              this.props.setPopupMenu({
                title: 'Выберите действие:',
                groups: [
                  {
                    list: [
                      { title: 'Сохранить', onPress: () => false },
                      { title: 'Вернуться к редактированию' },
                      { title: 'Отменить изменения', onPress: () => false },
                    ],
                  },
                ],
              });
            }
          }} />

          <Button element={{
            title: "Галлерея",
            onPress: () => {
              this.props.setImageViewer({ images: ['https://crm.q-digital.org/assets/gentelella/public/images/logo.png', 'https://crm.q-digital.org/assets/gentelella/public/images/logo.png'], id: 0 })
            }
          }} />
        </ImageOverlay>
      </KeyboardAvoidingView>,
    );
  }
}

export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(AuthSignin);