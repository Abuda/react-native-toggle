import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Text,
  View,
} from 'react-native';

const Toggle = ({
  containerStyle = {},
  textStyle = {},
  isActive = false,
  text = null,
  toggle = () => null,
  disabled = false,
  vertical = false,
  width = 50,
  cursorColor = '#FFFFFF',
  borderColor = '#EEEEEE',
  activeColor = '#4CD862',
  inactiveColor = '#DDDDDD',
  duration = 150,
}) => {
  const activeColorRGB = disabled
    ? hexToRGB(LightenDarkenColor(activeColor, 40))
    : hexToRGB(activeColor);
  const inactiveColorRGB = disabled
    ? hexToRGB(LightenDarkenColor(inactiveColor, 40))
    : hexToRGB(inactiveColor);
  const padding = width / 15;
  const additionalWidth = text === null ? 0 : text.length * 6;

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
    outputRange: [padding, width / 2 + padding + additionalWidth],
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
        useNativeDriver: true,
        easing: Easing.cubic,
      }),
    ]).start();
  }, [isActive]);

  return (
    <TouchableOpacity
      onPress={disabled ? null : toggle}
      activeOpacity={1}
      style={{
        ...containerStyle,
        transform: [{ rotate: vertical ? '270deg' : '0deg' }],
      }}
    >
      <Animated.View
        style={{
          borderRadius: width / 2,
          borderColor: borderColor,
          backgroundColor: bgColor,
          borderWidth: 1,
          width: text ? width + additionalWidth : width,
          height: width / 2,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {text !== null && (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                ...textStyle,
                transform: [{ rotate: vertical ? '180deg' : '0deg' }],
                fontSize: 12,
              }}
            >
              {text}
            </Text>
          </View>
        )}
        <Animated.View
          style={{
            borderRadius: width / 2 - padding * 2,
            backgroundColor: cursorColor,
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

const LightenDarkenColor = (col, amt) => {
  var usePound = false;

  if (col[0] == '#') {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};

export default Toggle;
