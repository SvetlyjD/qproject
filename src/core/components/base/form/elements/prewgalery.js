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
            c:null
          }
        }

  render() {
// this.setState({c:async() => await Helpers.Store.get('del')})
    Helpers.log(this.state.c);
    return (
      <ScrollView horizontal={true}>
        <View style={tailwind('flex flex-row ml-2 mt-2 mb-2')}>
          {this.props.element.elem.map(item => (
            <ImageItem item={item} />
          ))}
        </View>
      </ScrollView>
    )
  }
}

export default PrevGalery
