import React from 'react';
import { Modal, View } from 'react-native';
import { connect } from 'react-redux';
import { setImageViewer } from '@core/generated/actions';
import ImageViewerLib from 'react-native-image-zoom-viewer';
import { Text, Button } from '@ui-kitten/components';
import { tailwind } from '@tailwind';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export class ImageViewer extends React.Component {
  onCancel = () => {
    this.props.setImageViewer(false);
  };

  renderHeader = (index) => {
    const { imageViewer } = this.props;

    return (
      <View style={tailwind('absolute w-full h-8 items-center z-50')}>
        <View
          style={tailwind('bg-halfBlack px-4 py-2 rounded-full opacity-70')}
        >
          <Text category="label">
            {index + 1}/{imageViewer.images.length}
          </Text>
        </View>
        <Button
          appearance="ghost"
          style={tailwind('absolute right-0 top-0 w-10 h-10 z-10 p-0')}
          onPress={this.onCancel}
        >
          <FontAwesomeIcon
            style={tailwind('text-white')}
            icon={faTimes}
            size={20}
          />
        </Button>
      </View>
    );
  };

  render() {
    const { imageViewer } = this.props;
    return (
      <Modal visible={Boolean(imageViewer)} transparent={true}>
        <View style={tailwind('w-full h-full')}>
          {imageViewer ? (
            <ImageViewerLib
              // enableSwipeDown
              saveToLocalByLongPress={false}
              imageUrls={imageViewer.images.map((url) => ({ url }))}
              onCancel={this.onCancel}
              index={imageViewer.id}
              renderIndicator={() => false}
              renderHeader={this.renderHeader}
            />
          ) : (
            false
          )}
        </View>
      </Modal>
    );
  }
}

export default connect(
  (state) => ({
    imageViewer: state.imageViewer,
  }),
  (dispatch) => ({
    setImageViewer(imageViewer) {
      dispatch(setImageViewer(imageViewer));
    },
  }),
)(ImageViewer);
