import { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';

import styles from './styles';

export default function Input({
  isPassword,
  leftIcon,
  placeHolder,
  OptionOneRightIcon,
  OptionTwoRightIcon,
  labelText,
  containerWidth,
  containerHeight,
  setValue,
  value,
  marginBottom,
  marginTop,
  onBlur,
  multiline,
  numberOfLines,
  style = {},
  textInputStyle = {}
}) {
  const [hidePassword, setHidePassword] = useState(isPassword);
  return (
    <View
      style={[
        styles.InputContainer(
          containerWidth,
          containerHeight,
          marginBottom,
          marginTop
        ),
        style
      ]}
    >
      {leftIcon && (
        <Image
          source={leftIcon}
          style={styles.Icon(labelText ? true : false)}
        />
      )}

      {labelText && (
        <Text style={styles.label}>{labelText ? labelText : ''}</Text>
      )}
      <TextInput
        onBlur={onBlur || (() => {})}
        secureTextEntry={hidePassword}
        style={[
          styles.Input(leftIcon ? true : false, containerHeight),
          textInputStyle
        ]}
        placeholder={placeHolder}
        keyboardType="default"
        defaultValue={value}
        onChangeText={setValue}
        {...{ multiline, numberOfLines }}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.ButtonIcon(labelText ? true : false)}
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Image
            source={hidePassword ? OptionOneRightIcon : OptionTwoRightIcon}
            style={styles.ButtonIconImage}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
