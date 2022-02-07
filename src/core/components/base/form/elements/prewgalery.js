import React from 'react'
import FormElement from '@core/components/abstract/formElement'
import tailwind from 'tailwind-rn'
import Helpers from '@core/helpers'
import { Image, ScrollView, Text, View } from 'react-native'
import { Button } from '@ui-kitten/components'
import style from '@style/'
import ImageItem from './imageItem'

export class PrevGalery extends FormElement {
  constructor(_props) {
    super(_props)

    this.state = {
      images: this.props.element.getActiveImages()
    }
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
    return (
      <ScrollView horizontal={true}>
        <View style={tailwind('flex flex-row ml-2 mt-2 mb-2')}>
          {images.map(item => (
            <ImageItem item={item} updateData={this.updateData} />
          ))}
        </View>
      </ScrollView>
    )
  }
}

export default PrevGalery
