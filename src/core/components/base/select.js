import React from 'react';
import { View, Text } from 'react-native';
import { tailwind } from '@tailwind';
import Helpers from '@core/helpers';
import { Button } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import Animated from '@core/components/abstract/animated';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import { connect } from 'react-redux';
import Themed from '@core/components/base/themed';
import { setSelect } from '@core/generated/actions'

const TAILWINDPX = 4,
  STEPHEIGHT = 40,
  STATES = {
    none: 'none',
    start: 'start',
  },
  CLASSES = {
    scroll: `h-${(STEPHEIGHT / TAILWINDPX) * 4 + TAILWINDPX * 2}`,
    innerScroll: `pt-${(STEPHEIGHT / TAILWINDPX) * 2} pb-${(STEPHEIGHT / TAILWINDPX) * 2
      }`,
    item: `h-${STEPHEIGHT / TAILWINDPX}`,
  };

export class Select extends Animated {
  STEP = 0;
  scroll = false;
  timerScroll = false;

  static defaultProps = {
    select: {
      defaultValue: '',
      list: [],
    },
    setSelect: () => false,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      active: this.getSelect(props).defaultValue || 0,
      state: STATES.none,
    };
    if (this.getSelect(props).defaultValue) {
      this.STEP = props.select.defaultValue;
    }
  }

  setSelect = (select) => {
    const { setIsOpen, setSelect } = this.props;
    (setIsOpen || setSelect)(select)
  }

  getSelect = (props) => {
    const { isOpen, select } = props;
    return isOpen !== undefined ? isOpen : select
  }

  componentDidMount() {
    const { active } = this.state;
    if (active) {
      setTimeout(
        () =>
          this.scroll.scrollTo({ y: this.STEP * STEPHEIGHT, animated: false }),
        0,
      );
    }
  }

  getStep = (y) => Math.round(y / STEPHEIGHT);

  setStep = (y, cb = () => { }) => {
    this.STEP = this.getStep(y);
    this.setState({ active: this.STEP }, cb);
  };

  handleScroll = () => {
    if (this.state.STATE === STATES.none) {
      this.scroll.scrollTo({ y: this.STEP * STEPHEIGHT });
    }
  };

  onScroll = ({
    nativeEvent: {
      contentOffset: { y },
    },
  }) => {
    this.setStep(y);
    clearTimeout(this.timerScroll);
    this.timerScroll = setTimeout(this.handleScroll, 100);
  };

  onScrollBeginDrag = () => {
    this.setState({ STATE: STATES.start });
  };

  onScrollEndDrag = ({
    nativeEvent: {
      contentOffset: { y },
    },
  }) => {
    this.setState({ STATE: STATES.none });
    this.onScroll({ nativeEvent: { contentOffset: { y } } });
  };

  closeModal = () => {
    this.close(() => {
      this.setSelect(false);
    });
  };

  applyModal = () => {
    const { active } = this.state;
    const select = this.getSelect(this.props);
    if (select && select.onChange && typeof select.onChange === 'function') {
      select.onChange(select.list[active], active);
    }
    this.closeModal();
  };

  onPressOverlay = () => {
    this.closeModal();
  };

  render() {
    const { active, closing } = this.state;
    const select = this.getSelect(this.props);

    return (
      <Themed
        children={({ theme }) => {
          const bg = theme['background-basic-color-1'];
          const text = theme['text-basic-color'];

          return (
            <Animatable.View
              animation={closing ? 'fadeOut' : 'fadeIn'}
              duration={Animated.DURATION}
              style={tailwind(
                'absolute left-0 w-full h-full bg-halfBlack z-50 justify-end p-2',
              )}
            >
              <Button
                appearance="ghost"
                style={tailwind('absolute left-0 top-0 w-full h-full z-10')}
                onPress={this.onPressOverlay}
              >
                <View
                  style={tailwind(
                    'absolute bg-black w-full h-full opacity-80 z-10',
                  )}
                />
                <View
                  style={tailwind(
                    'absolute bg-white w-full h-full opacity-10 z-20',
                  )}
                />
              </Button>

              <Animatable.View
                animation={closing ? 'fadeOutDown' : 'fadeInUp'}
                duration={Animated.DURATION}
                style={Helpers.setClasses([
                  tailwind(
                    'justify-end p-2.5 z-10 w-full relative  rounded-xl',
                  ),
                  { backgroundColor: bg },
                ])}
              >
                <View style={tailwind('flex-row justify-between items-center')}>
                  <Button
                    appearance="ghost"
                    onPress={this.closeModal}
                    style={tailwind('px-0 py-2')}
                  >
                    Отмена
                  </Button>
                  <Button
                    appearance="ghost"
                    onPress={this.applyModal}
                    style={tailwind('px-0 py-2')}
                  >
                    Применить
                  </Button>
                </View>
                <View style={tailwind('w-full py-4')}>
                  <View
                    style={Helpers.setClasses([
                      tailwind('w-full relative overflow-hidden'),
                      tailwind(CLASSES.scroll),
                    ])}
                  >
                    <InvertibleScrollView
                      onScroll={this.onScroll}
                      ref={(ref) => (this.scroll = ref)}
                      onScrollBeginDrag={this.onScrollBeginDrag}
                      onScrollEndDrag={this.onScrollEndDrag}
                    >
                      <View style={tailwind(CLASSES.innerScroll)}>
                        {select?.list.map((item, key) => (
                          <View
                            key={key}
                            style={Helpers.setClasses(
                              [
                                tailwind(
                                  'w-full items-center justify-center opacity-20',
                                ),
                                tailwind(CLASSES.item),
                              ],
                              [
                                [tailwind('opacity-100'), active === key],
                                [
                                  tailwind('opacity-40'),
                                  key - 1 === active || key + 1 === active,
                                ],
                                [
                                  { transform: [{ rotateX: '30deg' }] },
                                  key - 1 === active,
                                ],
                                [
                                  { transform: [{ rotateX: '-30deg' }] },
                                  key + 1 === active,
                                ],
                                [
                                  { transform: [{ rotateX: '60deg' }] },
                                  !(key - 1 === active) &&
                                  !(key + 1 === active) &&
                                  key < active,
                                ],
                                [
                                  { transform: [{ rotateX: '-60deg' }] },
                                  !(key - 1 === active) &&
                                  !(key + 1 === active) &&
                                  key > active,
                                ],
                              ],
                            )}
                          >
                            <Text
                              style={Helpers.setClasses([
                                tailwind('text-center w-full'),
                                { color: text },
                              ])}
                            >
                              {item.title}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </InvertibleScrollView>
                  </View>
                </View>
              </Animatable.View>
            </Animatable.View>
          );
        }}
      />
    );
  }
}

export default connect(
  (state) => ({
    select: state.select,
  }),
  (dispatch) => ({
    setSelect(select) {
      dispatch(setSelect(select));
    },
  }),
)(Select);
