import {Alert, Platform, Share} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {StorageKey} from './Enum';
import RNRestart from 'react-native-restart';

// import Share from 'react-native-share';

export const removeValueAsyncStorage = async key => {
  await AsyncStorage.removeItem(key);
};

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const showAlert = message => {
  Alert.alert(
    '',
    message,
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    {cancelable: false},
  );
};

export const downloadFile = async (fileName, filePath) => {
  let dirs = ReactNativeBlobUtil.fs.dirs;
  await ReactNativeBlobUtil.config({
    fileCache: true,
    appendExt: 'pdf',
    path: `${dirs.DocumentDir}/${fileName}`,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      title: fileName,
      description: 'File downloaded by download manager.',
      mime: 'application/pdf',
    },
  })
    .fetch('GET', filePath)
    .then(res => {
      console.log('res: ', res);
      // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
      // whereas in android, the download manager is handling the download for us.
      if (Platform.OS === 'ios') {
        const filePath = res.path();
        Share.share({url: filePath});
      }
    })
    .catch(err => console.log('BLOB ERROR -> ', err));

  // let fs = ReactNativeBlobUtil.fs;
  // let {dirs} = fs;

  // const filePath = dirs.DocumentDir + '/' + fileName;

  // const isExist = await fs.exists(filePath);

  // if (!isExist) {
  //   await fs.createFile(filePath, binaryData, 'base64');
  // }
  // Share.share({url: filePath});
};

export const navigationLeftButton = () => {
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          removeValueAsyncStorage(StorageKey.userData);
          RNRestart.restart();
        },
      },
    ],
    {cancelable: true},
  );
};
