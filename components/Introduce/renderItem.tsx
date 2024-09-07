import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { OnboardingData } from './data';
import { useScreenDimensions } from '@/hooks/useScreenDimensions';
import LottieView from 'lottie-react-native';
interface Props {
  item: OnboardingData;
}
const RenderItem = ({ item }: Props) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useScreenDimensions();
  return (
    <View
      style={[
        styles.itemContainer,
        {
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: item.backgroundColor,
        },
      ]}>
      <LottieView
        source={{ uri: `${item.image}` }}
        autoPlay
        style={{ width: '100%', height: 300, borderRadius: 20 }}
      />
      <Text style={[styles.textItem, { color: item.textColor }]}>{item.text}</Text>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
  },
  textItem: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginHorizontal: 20
  },
});
