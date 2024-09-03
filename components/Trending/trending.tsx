import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ImageSlider } from '@/components/Trending/data';
import { Image } from 'expo-image';
function Index() {
  const width = Dimensions.get('window').width;
  return (
    <View style={{ flex: 1}}>
      <Carousel
        loop
        width={width}
        height={150}
        autoPlay={true}
        data={ImageSlider}
        scrollAnimationDuration={2000}
        renderItem={({ item, index }) => (
          <View className="items-center justify-center flex-1" key={index} style={{borderRadius: 20}}>
            <Image
                cachePolicy={'memory-disk'}
              source={{ uri: item.image }}
              style={{
                width: width - 50,
                height: width / 2,
                borderRadius: 20,
              }}
            />
          </View>
        )}
      />
    </View>
  );
}

export default Index;
