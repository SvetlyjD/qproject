import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { tailwind } from '@tailwind';
import Helpers from '@core/helpers';
import { Button, Text, useTheme } from '@ui-kitten/components';
import Icon from '@core/components/base/icon';
import * as Animatable from 'react-native-animatable';
import Animated from '@core/components/abstract/animated';
import { connect } from 'react-redux';
import { setPopupMenu } from '@core/generated/actions'

function RenderPopupMenu({
  onPressOverlay,
  closing,
  _groups,
  close,
  setPopupMenu,
}) {
  const theme = useTheme();
  const bg = theme['background-basic-color-1'];
  const border = theme['border-basic-color-5'];
  function _onPressOverlay() {
    close(() => {
      setPopupMenu(false);
      if (onPressOverlay && typeof onPressOverlay === 'function') {
        onPressOverlay();
      }
    });
  }

  function _onPress(button) {
    const onPress = button.onPress;
    close(() => {
      setPopupMenu(false);
      if (onPress && typeof onPress === 'function') {
        onPress();
      }
    });
  }

  return (
    <Animatable.View
      animation={closing ? 'fadeOut' : 'fadeIn'}
      duration={Animated.DURATION}
      style={tailwind(
        'absolute left-0 w-full h-full bg-halfBlack z-50 justify-end',
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
      <SafeAreaView style={tailwind('z-20')}>
        <Animatable.View
          animation={closing ? 'fadeOutDown' : 'fadeInUp'}
          duration={Animated.DURATION}
          style={tailwind('justify-end p-2.5 z-10 relative')}
        >
          {!!(_groups && _groups.length) && _groups.map((group, key) => (
            <View
              key={key}
              style={Helpers.setClasses([
                tailwind(
                  'w-full mt-2.5 opacity-90 rounded-lg overflow-hidden',
                ),
                { backgroundColor: bg, borderColor: border },
              ])}
            >
              {!!(group.title || group.subTitle) && <View
                style={Helpers.setClasses([
                  tailwind('py-5 opacity-90'),
                  { backgroundColor: bg },
                ])}
              >
                {!!group.title && <Text style={tailwind('text-xl text-center')}>
                  {group.title}
                </Text>}
                {!!group.subTitle && <Text style={tailwind('text-sm text-center mt-2')}>
                  {group.subTitle}
                </Text>}
              </View>}
              {!!(group.list && group.list.length) && group.list.map((button, buttonKey) => (
                <View
                  key={buttonKey}
                  style={Helpers.setClasses(
                    [
                      tailwind('border-t border-solid'),
                      { backgroundColor: bg, borderColor: border },
                    ],
                    [
                      [
                        tailwind('border-t-0'),
                        !(group.title || group.subTitle) && buttonKey === 0,
                      ],
                    ],
                  )}
                >
                  <Button
                    buttonKey={buttonKey}
                    appearance="ghost"
                    style={Helpers.setClasses([
                      tailwind('p-4 flex-row items-center justify-center'),
                      button.style,
                    ])}
                    onPress={() => _onPress(button)}
                  >
                    {() => (
                      <View style={tailwind('flex-row items-center')}>
                        {!!button.icon &&
                          <View style={tailwind('mr-3 items-end h-5')}>
                            <Icon
                              name={button.icon}
                              style={tailwind('text-blue')}
                              size={20}
                            />
                          </View>}
                        <View>
                          <Text style={tailwind('text-blue text-lg')}>
                            {button.title}
                          </Text>
                        </View>
                      </View>
                    )}
                  </Button>
                </View>
              ))}
            </View>
          ))}
        </Animatable.View>
      </SafeAreaView>
    </Animatable.View>
  );
}

export class PopupMenu extends Animated {
  setPopupMenu = (popupMenu) => {
    const { setIsOpen, setPopupMenu } = this.props;
    (setIsOpen || setPopupMenu)(popupMenu)
  }

  getPopupMenu = () => {
    const { isOpen, popupMenu } = this.props;
    return isOpen !== undefined ? isOpen : popupMenu
  }

  render() {
    const { closing } = this.state;

    const { groups, onPressOverlay } = this.getPopupMenu();
    let _groups = [
      ...groups,
      {
        list: [
          {
            title: 'Отмена',
            style: tailwind('justify-center'),
          },
        ],
      },
    ];

    return (
      <RenderPopupMenu
        onPressOverlay={onPressOverlay}
        setPopupMenu={this.setPopupMenu}
        close={this.close}
        closing={closing}
        _groups={_groups}
      />
    );
  }
}

export default connect(
  (state) => ({
    popupMenu: state.popupMenu,
  }),
  (dispatch) => ({
    setPopupMenu(popupMenu) {
      dispatch(setPopupMenu(popupMenu));
    },
  }),
)(PopupMenu);
