import React from 'react'
import { View, StyleSheet, _Image } from 'react-native'
import { Text } from '@ui-kitten/components'
import KeyboardAvoidingView from '@core/components/base/keyboardAvoidingView'
import { tailwind } from '@tailwind'
import Page from '@core/components/abstract/page'
import { connect } from 'react-redux'
import { BASEURL, PORT } from '@core/generated/config'
import style from '../style'
import Form from '@core/components/base/form'
import ImageOverlay from '@core/components/base/imageOverlay'
import Helpers from '@core/helpers'
import { MainMenu } from './bottom_navigation'

let c = [
  { id: 0, url: 'https://cdn.trend.az/2016/07/21/pokemon_210716_01.jpg' },
  { id: 1, url: 'https://autogear.ru/misc/i/gallery/14342/1365801.jpg' },
  {
    id: 2,
    url: 'https://www.youloveit.ru/uploads/gallery/main/162/vaporeon.png'
  },
  {
    id: 3,
    url: 'https://pokemon-go.name/wp-content/uploads/2019/07/027-pokemon-sandshrew.png'
  },
  {
    id: 4,
    url: 'https://static.wikia.nocookie.net/pokemon/images/e/e2/133Eevee.png/revision/latest/smart/width/250/height/250?cb=20130818174825&path-prefix=ru'
  }
]
let SubmitData = []

export class AuthSignin extends Page {
  // смотрим класс Page какие пропсы он передает
  constructor(_props) {
    super(_props)

    this.state = {
      // описываем состояние каждого элемента на странице авторизации
      imagesGallery: [],
      selectTitle: 'Общая',
      elements: [
        {
          elementType: Form.BaseElementTypes.Input,
          label: '',
          status: 'control',
          placeholder: 'Input',
          onChangeValue: this.onInputChange
        },
        {
          elementType: Form.BaseElementTypes.Input,
          style: tailwind('mt-5'),
          multiline: true,
          textStyle: { minHeight: 64 },
          status: 'control',
          name: 'email',
          placeholder: 'Big Input',
          onChangeValue: this.onBigInputChange
        },
        {
          elementType: Form.BaseElementTypes.Button,
          title: 'Тема',
          style: tailwind('h-12 w-32 bg-blue text-xl rounded-lg mt-5 mb-5'),
          status: 'control',
          onPress: () => {
            this.props.setSelect({
              list: [
                { title: 'Общая', value: 'dublicate' },
                { title: 'Приватная', value: 'inwork' }
              ],
              onChange: value => this.setState({ selectTitle: value.title })
            })
          }
        },
        {
          elementType: Form.BaseElementTypes.PrevGalery,
          getActiveImages: this.getActiveImages,
          setActiveImages: this.setActiveImages,
          onComponentRef: this.onGalleryComponentRef,
          title: '+',
          style: tailwind('h-24 w-24 mt-2 bg-blue text-xl  rounded-lg'),
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
                        this.setImagesGalery()
                      }
                    },
                    {
                      title: 'Сделать фото',
                      onPress: () => this.setActiveImagesGalery()
                    }
                  ]
                }
              ]
            })
          }
        },
        {
          elementType: Form.BaseElementTypes.Button,
          title: 'Отправить',
          style: tailwind('mt-2'),
          status: 'control',
          size: 'giant',
          onPress: this.onSubmit
        }
      ]
    }
  }

  setActiveImages = images => {
    this.setState({ imagesGallery: images })
  }

  setImagesGalery = () => {
    this.setState({ imagesGallery: Array.from(c) })
    this.imageGalleryComponent?.setState({ images: this.getActiveImages() })
  }

  setActiveImagesGalery = () => {
    this.setState({ imagesGallery: [c[0]] })
    this.imageGalleryComponent?.setState({ images: this.getActiveImages() })
  }

  onGalleryComponentRef = component => {
    this.imageGalleryComponent = component
  }

  getActiveImages = () => {
    return this.state.imagesGallery
  }

  onInputChange = value => {
    this.setState({ Input: value })
  }

  onBigInputChange = value => {
    this.setState({ BigInput: value })
  }

  onSubmit = () => {
    SubmitData.push(this.state.Input)
    SubmitData.push(this.state.BigInput)
    SubmitData.push(this.state.selectTitle)
    SubmitData.push(this.state.imagesGallery)
    Helpers.log(SubmitData)
  }

  render() {
    Helpers.log('tasks', this.tasks)
    return this._render(
      <>
        <KeyboardAvoidingView>
          <ImageOverlay style={tailwind('flex ')}>
            <View
              style={{
                ...tailwind(' justify-center items-center'),
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
            <View style={{ ...tailwind('mt-52') }}>
              <MainMenu go={this.go}></MainMenu>
            </View>
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
