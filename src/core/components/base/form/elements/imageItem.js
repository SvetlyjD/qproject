import React from 'react'
import { Button } from '@ui-kitten/components'
import { setAlert, setImageViewer } from '@core/generated/actions'
import { Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import tailwind from 'tailwind-rn'
import Helpers from '@core/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
// import { TouchableOpacity } from 'react-native-gesture-handler'

const mapDispatchToProps = dispatch => {
  return {
    setAlertAction: props => dispatch(setAlert(props)),
    setImageViewerAction: props => dispatch(setImageViewer(props)),
  }
}

const mapStateToProps = state => {
  return {}
}

export class ImageItem extends React.Component {
  onPressSetImage = (item) => {
    this.props.setImageViewerAction({
      images: [
        item.url,
      ],
    })
  }

  onButtonPress = () => {
    let c = this.props.item.id
    this.props.setAlertAction({
      title: 'Удалить комментарий?',
      buttons: [
        {
          text: 'Да',
          onPress: () => {
            this.props.updateData(this.props.item.id)
          }
        },
        {
          text: 'Нет',
          style: tailwind('text-red')
        }
      ]
    })
  }

  render() {
    const { item } = this.props;
   
    return (
      <TouchableOpacity
      onPress={() => this.onPressSetImage(item)}
      style={tailwind('w-28 h-28')}
    >
        <Image source={{ uri: item.url }}  style={tailwind('w-24 h-24')} />
        <Button
          // appearance="ghost"
          style={tailwind('absolute left-14 top-0 w-5 h-5 z-30')}
          onPress={this.onButtonPress}>
          <FontAwesomeIcon
            style={tailwind('text-white')}
            icon={faTimes}
            size={20}
          />
        </Button>
      </TouchableOpacity>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageItem)
