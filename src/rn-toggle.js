import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

const Toggle = ({
  isActive = false,
  toggle = () => null,
  width = 50,
  circleColor = '#FFFFFF',
  borderColor = '#EEEEEE',
  activeColor = '#333333',
  inactiveColor = '#DDDDDD',
  duration = 100,
}) => {
  const activeColorRGB = hexToRGB(activeColor);
  const inactiveColorRGB = hexToRGB(inactiveColor);
  const padding = width / 15;

  const bgValue = useRef(new Animated.Value(0)).current;
  const bgColor = bgValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      `rgb(${inactiveColorRGB[0]},${inactiveColorRGB[1]},${inactiveColorRGB[2]})`,
      `rgb(${activeColorRGB[0]},${activeColorRGB[1]},${activeColorRGB[2]})`,
    ],
  });

  const translateXValue = useRef(new Animated.Value(0)).current;
  const translateX = translateXValue.interpolate({
    inputRange: [0, 1],
    outputRange: [padding, width / 2 + padding],
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(bgValue, {
        toValue: isActive ? 1 : 0,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(translateXValue, {
        toValue: isActive ? 1 : 0,
        duration: duration,
        useNativeDriver: false,
        easing: Easing.cubic,
      }),
    ]).start();
  }, [isActive]);

  return (
    <TouchableOpacity
      onPress={toggle}
      style={{ padding: 40 }}
      activeOpacity={1}
    >
      <Animated.View
        style={{
          borderRadius: width / 2,
          borderColor: borderColor,
          backgroundColor: bgColor,
          borderWidth: StyleSheet.hairlineWidth,
          width: width,
          height: width / 2,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={{
            borderRadius: width / 2 - padding * 2,
            backgroundColor: circleColor,
            width: width / 2 - padding * 2,
            height: width / 2 - padding * 2,
            transform: [{ translateX }],
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const hexToRGB = (h) => {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length == 4) {
    r = parseInt(h[1] + h[1], 16);
    g = parseInt(h[2] + h[2], 16);
    b = parseInt(h[3] + h[3], 16);

    // 6 digits
  } else if (h.length == 7) {
    r = parseInt(h[1] + h[2], 16);
    g = parseInt(h[3] + h[4], 16);
    b = parseInt(h[5] + h[6], 16);
  }

  return [r, g, b];
};

export default Toggle;
