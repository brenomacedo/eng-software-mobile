import { View, Text, Image } from 'react-native';

import styles from './styles';

export default function Input({
  isPassword = false,
  leftIcon = null,
  rightIncon = null
}) {
  return (
    <View style={styles.InputContainer}>
      <Image
        source={PasswordVector}
        style={{
          position: 'absolute',
          left: 15,
          top: 25,
          width: 25,
          height: 20,
          zIndex: 2,
          resizeMode: 'center'
        }}
      />
      <TextInput
        textContentType="password"
        secureTextEntry={hidePassword}
        style={styles.Input}
        placeholder="Senha"
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 15,
          top: 25,
          width: 25,
          height: 20,
          zIndex: 2,
          resizeMode: 'center'
        }}
        onPress={() => {
          setHidePassword(!hidePassword);
        }}
      >
        <Image
          source={hidePassword ? DontShowPassVector : ShowPassVector}
          style={{
            width: 25,
            height: 20,
            resizeMode: 'center'
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
