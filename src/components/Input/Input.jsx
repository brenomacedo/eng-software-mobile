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
  containerHeight
}) {
  const [hidePassword, setHidePassword] = useState(isPassword);
  return (
    <View style={styles.InputContainer(containerWidth, containerHeight)}>
      {leftIcon && <Image source={leftIcon} style={styles.Icon} />}

      <Text style={styles.label}>{labelText ? labelText : ''}</Text>
      <TextInput
        secureTextEntry={hidePassword}
        style={styles.Input(leftIcon ? true : false, containerHeight)}
        placeholder={placeHolder}
        keyboardType="default"
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.ButtonIcon}
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
