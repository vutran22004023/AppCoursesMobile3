import { Appearance, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { setThemes } from '@/redux/Slide/themeSlice';

type Props = {
  setTheme: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  theme: string | null | undefined;
  setThemeSwitch: React.Dispatch<React.SetStateAction<string>>;
  themeSwitch: string;
};

const Switch = ({ setTheme, theme, setThemeSwitch, themeSwitch }: Props) => {
  const colorScheme = Appearance.getColorScheme();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const SWITCH_CONTAINER_WIDTH = width * 0.8;
  const SWITCH_WIDTH = SWITCH_CONTAINER_WIDTH / 3;

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  useEffect(() => {
    if (themeSwitch === 'system') {
      translateX.value = withSpring(SWITCH_WIDTH * 0);
    } else if (themeSwitch === 'light') {
      translateX.value = withSpring(SWITCH_WIDTH * 1);
    } else if (themeSwitch === 'dark') {
      translateX.value = withSpring(SWITCH_WIDTH * 2);
    }
  }, [SWITCH_WIDTH, themeSwitch, translateX]);

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: theme === 'dark' ? withTiming('black') : withTiming('#F0F0F0'),
    };
  });

  const textColorAnimation = useAnimatedStyle(() => {
    return {
      color: theme === 'dark' ? withTiming('white') : withTiming('black'),
    };
  });

  const backgroundColorSlideAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: theme === 'dark' ? withTiming('#22272B') : withTiming('white'),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: SWITCH_CONTAINER_WIDTH,
        },
        backgroundColorAnimation,
      ]}>
      <Animated.View
        style={[
          styles.slideContainer,
          {
            width: SWITCH_WIDTH,
          },
          translateAnimation,
        ]}>
        <Animated.View
          style={[
            styles.slide,
            {
              width: (width * 0.7) / 3,
            },
            backgroundColorSlideAnimation,
          ]}
        />
      </Animated.View>
      <Pressable
        style={styles.button}
        onPress={() => {
          setThemeSwitch('system');
          if (colorScheme) {
            setTheme(colorScheme);
            dispatch(setThemes(colorScheme));
          }
        }}>
        <Animated.Text style={[styles.textButton, textColorAnimation]}>Hệ thống</Animated.Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          const light = async () => {
            setThemeSwitch('light');
            setTheme('light');
            dispatch(setThemes('light'));
          };
          light();
        }}>
        <Animated.Text style={[styles.textButton, textColorAnimation]}>Sáng</Animated.Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          const dark = async () => {
            setThemeSwitch('dark');
            setTheme('dark');
            dispatch(setThemes('dark'));
          };
          dark();
        }}>
        <Animated.Text style={[styles.textButton, textColorAnimation]}>Tối</Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 40,
    overflow: 'hidden',
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textButton: {
    color: 'black',
    fontWeight: '500',
  },
  slideContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    padding: 23,
    borderRadius: 100,
    backgroundColor: 'white',
  },
});
