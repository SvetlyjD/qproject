import React from 'react'
import FormElement from '@core/components/abstract/formElement'
import tailwind from 'tailwind-rn'
import { ScrollView, View } from 'react-native'
import ImageItem from './imageItem'
import Button from './button'
import Helpers from '@core/helpers'

export class PrevGalery extends FormElement {
  constructor(_props) {
    super(_props)

    this.state = {
      images: this.props.element.getActiveImages(),
      title: this.props.element.title,
      style: this.props.element.style,
      onPress: this.props.element.onPress
    }
  }

  componentDidMount () {
    this.props.element.onComponentRef?.(this)
  }

  updateData = id => {
    const current = Array.from(this.state.images)
    const filtered = current.filter(item => item.id !== id)
    this.setState({ images: filtered }, () => {
      this.props.element.setActiveImages(filtered)
    })
  }

  render() {
    const images = this.state.images
    Helpers.log("images prewu",images)
    return (
      <View style={tailwind('flex flex-row')}>
        {/* Кнопка "+" */}

        <Button
          element={{
            style: this.props.element.style,
            title: this.state.title,
            onPress: () => {
              this.state.onPress()
            }
          }}
        />
        {/* Превьюхи */}
        <ScrollView horizontal={true}>
          <View style={tailwind('flex flex-row ml-2 mt-2 mb-2')}>
            {images.map(item => (
              <ImageItem item={item} updateData={this.updateData} />
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default PrevGalery
