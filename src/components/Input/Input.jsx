import { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

export default function Input({
  isPassword,
  leftIcon,
  placeHolder,
  OptionOneRightIcon,
  OptionTwoRightIcon
}) {
  const [hidePassword, setHidePassword] = useState(isPassword);
  return (
    <View style={styles.InputContainer}>
      {leftIcon && <Image source={leftIcon} style={styles.Icon} />}

      <TextInput
        secureTextEntry={hidePassword}
        style={styles.Input(leftIcon ? true : false)}
        placeholder={placeHolder}
        keyboardType=""
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
