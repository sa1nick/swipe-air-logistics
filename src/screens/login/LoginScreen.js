import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import {useDispatch, useSelector} from 'react-redux';
// import signalr from 'react-native-signalr';

import {LoginStyle, pickerSelectStyles} from './LoginStyle';

import SAL from '../../SAL';
import ActivityIndicator from '../../components/ActivityIndicator';
import SALGradientButton from '../../components/SALGradientButton';
import SALInputField from '../../components/SALInputField';
import {StorageKey} from '../../utils/Enum';
import {showAlert, storeData} from '../../utils/Utils';

import {
  clearAuthDetails,
  loginApi,
  logisticsUserTypesApi,
} from '../../api/slice/authSlice/authApiSlice';
import useCustomTheme from '../../hook/useCustomTheme';

function LoginScreen(props) {
  const theme = useCustomTheme();
  const isDark = theme === 'dark';
  const styles = LoginStyle(isDark);
  const pickerSelectStyle = pickerSelectStyles(isDark);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const pickerHeigth = 35;

  const defaultLabel = 'Select User Type';

  const [selectedValue, setSelectedValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pickerUserTypes, setPickerUserTypes] = useState([]);

  const dispatch = useDispatch();

  const userTypeData = useSelector(state => state.auth.logisticsUserTypesData);
  const userTypeApiStatus = useSelector(state => state.auth.status);
  const userTypeApiError = useSelector(state => state.auth.error);

  const loginData = useSelector(state => state.auth.data);
  const loginApiStatus = useSelector(state => state.auth.status);
  const loginApiError = useSelector(state => state.auth.error);

  useEffect(() => {
    setLoading(true);
    dispatch(logisticsUserTypesApi({}));
  }, []);

  useEffect(() => {
    if (loginData) {
      console.log(loginData);
      setLoading(false);
      if (loginData.code === SAL.codeEnum.code200) {
        storeData(StorageKey.userData, loginData.data);
        props.navigation.navigate('BottomTabBar');
      } else {
        dispatch(clearAuthDetails());
        showAlert(loginData.message);
      }
    }
  }, [loginData]);

  useEffect(() => {
    if (userTypeData) {
      console.log('arrayUserTypes', userTypeData);

      setLoading(false);
      if (userTypeData.status) {
        const arrayUserTypes = userTypeData.data.map(item => {
          return {
            label: item.text,
            value: item.value,
          };
        });
        setPickerUserTypes(arrayUserTypes);
      }
    }
  }, [userTypeData]);

  useEffect(() => {
    if (userTypeApiError) {
      setLoading(false);
    }
  }, [userTypeApiError]);

  useEffect(() => {
    if (loginApiError) {
      setLoading(false);
      showAlert(loginApiError);
    }
  }, [userTypeApiError, loginApiError]);

  const handleValueChange = (value, index) => {
    setSelectedValue(value);
  };

  const arrowDownIcon = () => (
    <View
      style={{marginRight: 20, height: pickerHeigth, justifyContent: 'center'}}>
      <Image
        source={SAL.image.downArrow}
        style={{tintColor: isDark ? '#F0C3F4' : ''}}
      />
    </View>
  );

  const loginButton = () => {
    // props.navigation.navigate('BottomTabBar');
    validateForm();
    //   let connection = new signalR.HubConnectionBuilder()
    //   .withUrl("https://paintrax.com/swipe.singalr/chatHub")
    //   .build();
    //   connection.logging = true
    //   connection.on("send", data => {
    //     console.log('data: ', data);
    // });

    //   connection.start()
    //   .then(() => console.log('state: ', connection.state)).catch((error) => {
    //     console.log('error: ', error)
    // });

    // const connection = signalr.hubConnection('https://api.swipeairdev.com');
    // connection.logging = true;

    // const proxy = connection.createHubProxy('ChatAppHub');

    // connection.start().done(() => {
    //   console.log('Now connected, connection ID=' + connection.id);
    // }).fail(() => {
    //   console.log('Failed');
    // });

    // connection.error((error) => {
    //   const errorMessage = error.message;
    //   let detailedError = '';
    //   if (error.source && error.source._response) {
    //     detailedError = error.source._response;
    //   }
    //   if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
    //     console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
    //   }
    //   console.debug('SignalR error: ' + errorMessage, detailedError)
    // });
  };

  const validateForm = () => {
    let errorMessage = '';
    let isValidForm = true;
    let reg =
      /^[a-zA-Z0-9+_.-]+@[_a-zA-Z0-9-]+(?:\.[_a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/i;

    if (!selectedValue) {
      errorMessage = 'Please select user type';
      isValidForm = false;
    } else if (reg.test(emailRef?.current?.value) === false) {
      errorMessage = 'Email must be a valid email';
      isValidForm = false;
    } // Check for empty password
    else if (
      !passwordRef?.current?.value ||
      passwordRef.current.value.trim() === ''
    ) {
      errorMessage = 'Password is required';
      isValidForm = false;
    }

    // Check password length
    else if (
      passwordRef?.current?.value &&
      passwordRef.current.value.length < 7
    ) {
      errorMessage = 'Password must be at least 7 characters long';
      isValidForm = false;
    }

    if (isValidForm) {
      Keyboard.dismiss();
      setLoading(true);
      const payload = {
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
        userType: selectedValue,
      };
      dispatch(loginApi(payload));
    } else {
      showAlert(errorMessage);
    }
  };

  const forgotPasswordButton = () => {
    props.navigation.navigate('ForgotPasswordScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBackgroundContainer}></View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        style={{width: '100%'}}>
        <>
          <ImageBackground
            source={SAL.image.gradientBg}
            style={styles.linearGradient}>
            <Image style={styles.saLogo} source={SAL.image.saLogo}></Image>
            <Text style={styles.headingText}>
              International Shipping & Delivery
            </Text>
            <Image source={SAL.image.deliveryLogo}></Image>
          </ImageBackground>
          <Text style={styles.loginAsText}>Login as</Text>
          <View
            style={{
              height: pickerHeigth,
              alignSelf: 'center',
              marginTop: 15,
              marginBottom: 20,
            }}>
            <RNPickerSelect
              placeholderTextColor="red"
              placeholder={{label: defaultLabel, value: null}}
              items={pickerUserTypes}
              onValueChange={handleValueChange}
              itemKey={selectedValue}
              useNativeAndroidPickerStyle={false}
              Icon={arrowDownIcon}
              style={pickerSelectStyle}
            />
          </View>

          <SALInputField
            inputStyle={styles.inputStyle}
            inputRef={emailRef}
            title={'Email Address'}
            placeholderTextColor={
              isDark ? SAL.darkModeColors.tabInActive : SAL.colors.grey
            }
            placeholderText={'Enter Email address'}
            keyboardType={'email-address'}
            secureTextEntry={false}
            onChangeText={value => {
              emailRef.current.value = value;
            }}
          />
          <SALInputField
            inputRef={passwordRef}
            title={'Password'}
            placeholderTextColor={
              isDark ? SAL.darkModeColors.tabInActive : SAL.colors.grey
            }
            placeholderText={'Enter Password'}
            keyboardType={'default'}
            secureTextEntry={true}
            onChangeText={value => {
              passwordRef.current.value = value;
            }}
          />
          <View style={styles.forgotPasswordContainer}>
            <Pressable style={{height: 30}} onPress={forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>
          </View>
          <SALGradientButton
            buttonTitle={'Login'}
            buttonPressed={loginButton}
          />
          <Pressable
            style={{flexDirection: 'row', marginTop: 30, marginBottom: 30}}>
            <Text
              style={{
                color: isDark
                  ? SAL.darkModeColors.tabInActive
                  : SAL.colors.grey,
              }}>
              Facing Trouble to login?{' '}
            </Text>
            <Text
              style={{
                color: isDark
                  ? SAL.darkModeColors.orangeFFC8A3
                  : SAL.colors.orange,
              }}>
              Raise Query
            </Text>
          </Pressable>
        </>
      </ScrollView>
      {loading && <ActivityIndicator />}
    </View>
  );
}

export default LoginScreen;
