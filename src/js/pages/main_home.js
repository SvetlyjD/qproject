import React from 'react'
import { View, Image, StyleSheet, TextInput, _Image } from 'react-native'
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
import Collection from '@core/components/abstract/collection'
import TaskCollection from '@collections/task'
import { ScrollView } from 'react-native-gesture-handler'

export class AuthSignin extends Page {
  // смотрим класс Page какие пропсы он передает
  constructor(_props) {
    super(_props)

    this.state = {
      // описываем состояние каждого элемента на странице авторизации
      elements: [
        {
          elementType: Form.BaseElementTypes.Input,
          label: '',
          status: 'control',
          placeholder: 'наименование темы'
        }
      ],
      elements2: [
        {
          elementType: Form.BaseElementTypes.Submit,
          title: 'Отправить',
          style: tailwind('mt-auto'),
          status: 'control',
          size: 'giant',
          onPress: this.onSubmit
        }
      ],
      imagesLink: [
        'https://cdn.trend.az/2016/07/21/pokemon_210716_01.jpg',
        'https://autogear.ru/misc/i/gallery/14342/1365801.jpg',
        'https://www.youloveit.ru/uploads/gallery/main/162/vaporeon.png',
        'https://pokemon-go.name/wp-content/uploads/2019/07/027-pokemon-sandshrew.png',
        'https://static.wikia.nocookie.net/pokemon/images/e/e2/133Eevee.png/revision/latest/smart/width/250/height/250?cb=20130818174825&path-prefix=ru'
      ]
    }
  }

  onSubmit = ({ data }) => {}

  render() {
    return this._render(
      <KeyboardAvoidingView>
        <ImageOverlay style={tailwind('flex ')}>
          <View
            style={{
              ...tailwind('justify-center items-center'),
              ...style.signupViewHome
            }}>
            <Text style={tailwind('mt-2')} category="s1" status="control">
              Майн хоме
            </Text>
          </View>
          <Form
            url={`${BASEURL}:${PORT}/user/home`}
            wrapperProps={{ style: tailwind('flex px-4') }}
            elements={this.state.elements} // отображение блока элементов
          />
          <View
            style={{
              ...tailwind('justify-center ml-4'),
              ...style.signupViewHome
            }}>
            <Button
              element={{
                style: tailwind(
                  'h-12 w-30 bg-blue text-xl rounded-lg mt-5 mb-5'
                ),
                title: this.state.selectTitle || 'Тема',
                onPress: () => {
                  // при нажатии всплывает модальное окно

                  this.props.setSelect({
                    list: [
                      { title: 'Общая', value: 'dublicate' },
                      { title: 'Приватная', value: 'inwork' }
                    ],
                    onChange: value =>
                      this.setState({ selectTitle: value.title })
                  })
                  Helpers.log(this.state.selectTitle)
                }
              }}
            />
          </View>
          <View>
            <TextInput
              style={{
                ...tailwind('justify-center mx-4 rounded-2xl border-2'),
                ...style.mainTextInput
              }}
              multiline={true}
              numberOfLines={4}
              onChangeText={text => this.setState({ textData: text })}
              value={this.state.text}
            />
          </View>

          <View style={{ ...tailwind('flex-row') }}>
            <View
              style={tailwind(
                'flex-row h-20 w-20 bg-blue text-xl rounded-lg ml-4 mt-4 mb-2'
              )}>
              <Button
                element={{
                  style: tailwind('h-20 w-20 bg-blue text-xl  rounded-lg'),
                  title: '+',
                  onPress: () => {
                    this.props.setPopupMenu({
                      groups: [
                        {
                          title: 'Прикрепить фото',
                          subTitle: 'Выберите откуда вы хотите прикрепить фото',
                          list: [
                            {
                              title: 'Выбрать из галереи',
                              onPress: () => {
                                this.props.setImageViewer({
                                  images: this.state.imagesLink,
                                  id: 0
                                })
                              }
                            },
                            {
                              title: 'Сделать фото',
                              onPress: () => false
                            }
                          ]
                        }
                      ]
                    })
                  }
                }}
              />
            </View>
            <ScrollView horizontal={true}>
              {/* <View style={tailwind('flex-row ml-2 mt-2 mb-2')}>
                {this.state.imagesLink.map((item, index) => (
                  <View style={tailwind('flex ml-2 mt-2 mb-2')}>
                    <Image
                      source={{ uri: item }}
                      style={{ width: 80, height: 80 }}></Image>
                    <View
                      data={index}
                      style={{
                        ...tailwind('absolute mt-0 mb-2 w-5 h-5 bg-blue'),
                        ...style.mainImageClose
                      }}>
                      <Text
                        onPress={() =>
                          this.setState({
                            imagesLink: this.state.imagesLink.filter(
                              (item, index1) => index1 != index
                            )
                          })
                        }
                        style={style.textClose}>
                        X
                      </Text>
                    </View>
                  </View>
                ))}
              </View> */}
              <Collection></Collection>
            </ScrollView>
          </View>
          <View style={{ ...tailwind('h-full') }}>
            <Form
              url={`${BASEURL}:${PORT}/user/home`}
              wrapperProps={{ style: tailwind('flex px-4') }}
              elements={this.state.elements2} // отображение блока элементов
            />
          </View>
        </ImageOverlay>
      </KeyboardAvoidingView>
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
