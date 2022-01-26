import React from 'react';
import { View, Text } from 'react-native';
import Page from '@core/components/abstract/page'
import { tailwind } from '@tailwind';
import Routes from '@core/generated/routes';
import { connect } from 'react-redux';
import Helpers from '@core/helpers';

export class LaunchScreen extends Page {
  componentDidMount() {
    this.authProccess()  // перед монтированием выполняет метод  authProccess
  }

  authProccess = () => {
    Helpers.historyReplace(Routes.auth.signin, this.props.history);   //historyReplace = (path, history)
    // - функция, принимающая два параметра  1 параметр - Routes.auth.signin - путь Routes.auth.signin;
    // - "/auth/signin - переходит по данному пути",
    // второй параметр - history - хОТКУДА  ОН БЕРЕТСЯ - данные с авторизации?
  };

  render() {       // здесь просто рендер ланчскрина
    return (
      <View style={tailwind('justify-center items-center flex-1')}>
        <Text style={tailwind('mb-4')}>LaunchScreen</Text>
      </View>
    )
  }
}

export default connect(Page.mapStateToProps, Page.mapDispatchToProps)(LaunchScreen);