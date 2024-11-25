import React, {useRef} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  Text,
  View,
} from 'react-native';

import SAL from '../../SAL';
import SALGradientButton from '../../components/SALGradientButton';
import SALInputField from '../../components/SALInputField';
import useCustomTheme from '../../hook/useCustomTheme';
import {showAlert} from '../../utils/Utils';
import ForgotPasswordStyle from './ForgotPasswordStyle';

function ForgotPasswordScreen(props) {
  const theme = useCustomTheme();
  const isDark = theme === 'dark';
  const styles = ForgotPasswordStyle(isDark);
  const emailRef = useRef(null);

  const sendOtpButton = () => {
    validateForm();
  };

  const validateForm = () => {
    let errorMessage = '';
    let isValidForm = true;
    let reg =
      /^[a-zA-Z0-9+_.-]+@[_a-zA-Z0-9-]+(?:\.[_a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/i;

    if (reg.test(emailRef?.current?.value) === false) {
      errorMessage = 'Email must be a valid email';
      isValidForm = false;
    }

    if (isValidForm) {
      Keyboard.dismiss();
    } else {
      showAlert(errorMessage);
    }
  };

  const backButton = () => {
    props.navigation.pop();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={SAL.image.gradientBg}
        style={styles.linearGradient}>
        <Image style={styles.saLogo} source={SAL.image.saLogo}></Image>
        <View style={styles.bottomContainer}>
          <Text style={styles.headingText}>Forgot your password?</Text>
          <Text style={styles.subHeadingText}>
            Enter your email for the verification process, we will send 4 digits
            code to your email.
          </Text>
          <SALInputField
            inputRef={emailRef}
            title={'Email Address'}
            placeholderText={'Enter Email address'}
            keyboardType={'email-address'}
            secureTextEntry={false}
            onChangeText={value => {
              emailRef.current.value = value;
            }}
          />
          <SALGradientButton
            buttonTitle={'Send OTP'}
            buttonPressed={sendOtpButton}
          />
        </View>
      </ImageBackground>
      <Pressable style={styles.backButton} onPress={backButton}>
        <Image source={SAL.image.backIconWhite}></Image>
      </Pressable>
    </View>
  );
}

export default ForgotPasswordScreen;
