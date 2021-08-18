import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { tailwind } from '@tailwind';
import Helpers from '@core/helpers';
import Form from '@core/components/base/form';
import { Button, Text, useTheme } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import Animated from '@core/components/abstract/animated';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { setAlert } from '@core/generated/actions'

function AlertRender({ alert, closing, close, setAlert }) {
  const [value, setValue] = React.useState('');
  const [date, setDate] = React.useState(moment.isMoment(alert?.datepicker?.defaultValue) ? new Date(alert?.datepicker?.defaultValue) : new Date());
  const [show, setShow] = React.useState(false);
  const [formRef, setFormRef] = React.useState();
  const [dateChanged, setDateChanged] = React.useState(moment.isMoment(alert?.datepicker?.defaultValue));
  const theme = useTheme();
  const bg = theme['background-basic-color-1'];
  const border = theme['border-basic-color-5'];

  function _onChangeText(_value) {
    alert.input?.onChangeText(_value);
    setValue(_value);
  }

  function _onPressOverlay() {
    const onPressOverlay = alert.onPressOverlay;
    close(() => {
      setAlert(false);
      if (onPressOverlay && typeof onPressOverlay === 'function') {
        onPressOverlay();
        alert.input?.onChangeText(value);
      }
    });
  }

  function _onPress(button) {
    const onPress = button.onPress;
    close(() => {
      setAlert(false);
      if (onPress && typeof onPress === 'function') {
        onPress();
        alert.input?.onChangeText(value);
      }
    });
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    alert.datepicker.onChange(moment(currentDate).toISOString());
    formRef.update({ date: selectedDate })
    setShow(false);
    setDate(currentDate);
    setDateChanged(true);
  };

  return (
    <Animatable.View
      animation={closing ? 'fadeOut' : 'fadeIn'}
      duration={Animated.DURATION}
      style={tailwind(
        'absolute left-0 w-full h-full bg-halfBlack z-50 justify-center items-center',
      )}
    >
      <Button
        appearance="ghost"
        style={tailwind('absolute left-0 top-0 w-full h-full z-10')}
        onPress={_onPressOverlay}
      >
        <View
          style={tailwind('absolute bg-black w-full h-full opacity-80 z-10')}
        />
        <View
          style={tailwind('absolute bg-white w-full h-full opacity-10 z-20')}
        />
      </Button>

      <Animatable.View
        animation={closing ? 'bounceOut' : 'bounceIn'}
        duration={Animated.DURATION}
        style={Helpers.setClasses([
          tailwind('justify-end p-2.5 z-20 relative'),
        ])}
      >
        <View
          style={Helpers.setClasses([
            tailwind('w-80 rounded-lg overflow-hidden relative'),
            { backgroundColor: bg },
          ])}
        >
          <View
            style={Helpers.setClasses([
              tailwind('border-b border-solid p-4 relative z-20'),
              { backgroundColor: bg, borderColor: border },
            ])}
          >
            {alert.title ? (
              <Text style={tailwind('text-xl text-center')}>{alert.title}</Text>
            ) : (
              false
            )}
            {alert.subTitle ? (
              <Text style={tailwind('text-sm text-center mt-2')}>
                {alert.subTitle}
              </Text>
            ) : (
              false
            )}
          </View>
          {alert.input ? (
            <View
              style={Helpers.setClasses([
                tailwind('border-b border-solid p-4 relative z-20'),
                { backgroundColor: bg, borderColor: border },
              ])}
            >
              <Form
                elements={[{
                  elementType: Form.BaseElementTypes.Input,
                  name: 'inputvalue',
                  ...alert.input,
                  onChangeValue: _onChangeText
                }]}
              />
            </View>
          ) : (
            false
          )}

          {alert.datepicker && show ? (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
              minimumDate={new Date()}
            />
          ) : (
            false
          )}

          {alert.datepicker ? (
            <TouchableOpacity
              style={tailwind('relative')}
              onPress={() => setShow(true)}
            >
              <View
                style={Helpers.setClasses([
                  tailwind('border-b border-solid p-4 relative z-10'),
                  { backgroundColor: bg, borderColor: border },
                ])}
              >
                <Form
                  formRef={setFormRef}
                  elements={[{
                    elementType: Form.BaseElementTypes.Input,
                    name: 'date',
                    defaultValue: dateChanged
                      ? moment(date).format('DD.MM.YYYY')
                      : ''
                  }]}
                />
              </View>
              <View style={tailwind('absolute z-20 w-full h-full')} />
            </TouchableOpacity>
          ) : (
            false
          )}

          <View style={tailwind('relative z-20')}>
            {alert.buttons.map((button, key) => {
              return (
                <View
                  key={key}
                  style={Helpers.setClasses(
                    [
                      tailwind('w-full border-solid'),
                      { backgroundColor: bg, borderColor: border },
                    ],
                    [[tailwind('border-b'), key !== alert.buttons.length - 1]],
                  )}
                >
                  <Button
                    disabled={
                      button.disabledFunc &&
                        typeof button.disabledFunc === 'function'
                        ? button.disabledFunc()
                        : false
                    }
                    appearance="ghost"
                    onPress={() => _onPress(button)}
                    style={Helpers.setClasses([tailwind('p-4 w-full')])}
                  >
                    {() => (
                      <Text style={Helpers.setClasses([button.style])}>
                        {button.text}
                      </Text>
                    )}
                  </Button>
                </View>
              );
            })}
          </View>
        </View>
      </Animatable.View>
    </Animatable.View>
  );
}

export class Alert extends Animated {
  render() {
    return (
      <AlertRender
        alert={this.props.alert}
        closing={this.state.closing}
        close={this.close}
        setAlert={this.props.setAlert}
      />
    );
  }
}

export default connect(
  (state) => ({
    alert: state.alert,
  }),
  (dispatch) => ({
    setAlert(alert) {
      dispatch(setAlert(alert));
    },
  }),
)(Alert);
