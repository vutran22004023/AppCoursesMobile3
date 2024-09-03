import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
interface TrendingItemProps {
  activeItem: any;
  item: any;
}

interface Post {
  id: number;
  image: string;
}

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <View>
      {play ? (
        <Text style={{ color: 'white' }}>Playing</Text>
      ) : (
        <TouchableOpacity onPress={() => setPlay(true)}>
          <ImageBackground
            source={{ uri: item.image }}
            style={{
              width: screenWidth,
              height: 200,
              borderRadius: 20,
              marginVertical: 20,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const Trending: React.FC<{ posts: any[] }> = ({ posts }) => {
  const flatlistRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === carouselData.length - 1) {
        flatlistRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatlistRef.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  const carouselData: Post[] = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    image: 'https://images2.thanhnien.vn/528068263637045248/2024/1/25/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg',
  }));

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ marginHorizontal: 10 }}>
        <Image
          source={{ uri: item.image }}
          style={{
            width: screenWidth - 25, // Adjust width to account for margins
            height: 200,
            borderRadius: 20,
          }}
          resizeMode='cover'
        />
      </View>
    );
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.floor(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const renderDotIndicators = () => {
    return carouselData.map((dot, index) => (
      <Animatable.View
      key={index}
      animation={activeIndex === index ? 'bounceIn' : undefined}
      duration={300}
      style={{
        backgroundColor: activeIndex === index ? 'orange' : 'black', // Adjust colors as needed
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 6,
      }}
    />
    ));
  };

  return (
    <View>
      <FlatList
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({});
