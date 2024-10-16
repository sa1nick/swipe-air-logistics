import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Modal,
  StyleSheet,
  SectionList,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';

import styles from './CreateBoxStyle';
import SAL from '../../../SAL';
import NavigationBar from '../../../components/NavigationBar';
import OrderCreateBoxCell from '../../cells/OrderCreateBoxCell';
import WarehouseOrderCell from '../../cells/WarehouseOrderCell';
import Order from '../../cells/Order';
import BSAssignToDriver from '../../../components/BSAssignToDriver';
import BSChooseDriver from '../../../components/BSChooseDriver';

function Parcel(props) {
  const [selectFrom, setSelectFrom] = useState(null);
  const [selectTo, setSelectTo] = useState(null);
  const [showBS, setShowBS] = useState(false);
  const [showChooseDriverBS, setShowChooseDriverBS] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);

  const pickerItems = [
    {label: 'New York', value: '0'},
    {label: 'California', value: '1'},
    {label: 'Florida', value: '2'},
  ];

  const DATA = [
    {
      title: 'Main dishes',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Drinks',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: 'Desserts',
      data: ['Cheese Cake', 'Ice Cream'],
    },
  ];

  const arrowDownIcon = () => (
    <View style={{marginRight: 20, height: 50, justifyContent: 'center'}}>
      <Image source={SAL.image.downArrow} />
    </View>
  );

  const handleSelectFromValueChange = value => {
    setSelectFrom(value);
  };

  const handleSelectToValueChange = value => {
    setSelectTo(value);
  };

  const renderItem = ({item, index}) => {
    return <Order />;
  };

  const sectionHeaderRenderItem = ({section, index}) => {
    return (
      <View style={{backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 16,
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}>
        <View style={{flexDirection: 'row', height: 50}}>
          <Image style={{marginTop: 5}} source={SAL.image.truckDriver} />
          <View style={{marginLeft: 18}}>
            <Text style={{color: '#8A8A8A', fontSize: 14, fontFamily: 'Rubik-Regular'}}>Driver name</Text>
            <Text style={{color: '#000000', fontSize: 16, fontFamily: 'Rubik-Medium', marginTop: 3}}>Rahul Singh</Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
            <Text style={{color: '#8A8A8A', fontSize: 14, fontFamily: 'Rubik-Regular'}}>Vehicle</Text>
            <Text style={{color: '#000000', fontSize: 16, fontFamily: 'Rubik-Medium', marginTop: 3}}>IK19A 2023</Text>
          </View>
      </View>
      </View>
    );
  };

  const FlatListItemSeparator = () => (
    <View style={{width: '100%', height: 40, backgroundColor: 'white', justifyContent: 'center'}}>
    <View style={{width: '100%', height: 10, backgroundColor: '#E2E2E2'}} />
    </View>
  );

  const closeModalButton = () => {
    setShowBS(false);
  };

  const closeChooseDriverModalButton = () => {
    setShowChooseDriverBS(false);
  };

  const selectDriver = () => {
    setShowChooseDriverBS(true);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBS}
        onRequestClose={closeModalButton}>
        <BSAssignToDriver close={closeModalButton} selectDriver={selectDriver}/>
      </Modal>
      <Image
        source={SAL.image.gradientBg}
        style={styles.topGradientContainer}></Image>
      <NavigationBar />
      <View style={styles.locationContainer}>
        <View style={styles.fromToContainer}>
          <Image source={SAL.image.fromWarehouseWhite}></Image>
          <Text style={styles.fromText}>Punjab Port 1</Text>
        </View>
        <Image source={SAL.image.tripleArrow} />
        <View style={styles.fromToContainer}>
          <Image source={SAL.image.toWarehouseWhite}></Image>
          <Text style={styles.fromText}>Mumbai Seller 1</Text>
        </View>
      </View>
      <View style={styles.flatlistContainer1}>
        <View style={{height: 70, flexDirection: 'row', marginHorizontal: 18}}>
          <Pressable
            style={parcelStyle.psdContainer}
            onPress={() => {
              setSelectedTab(1);
            }}>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor:
                  selectedTab === 1 ? SAL.colors.purple : SAL.colors.white,
                paddingBottom: 5,
                paddingTop: 5,
              }}>
              <Text
                style={[
                  parcelStyle.tabText,
                  {color: selectedTab === 1 ? SAL.colors.purple : '#8A8A8A'},
                ]}>
                Pending (12)
              </Text>
            </View>
            <View
              style={{
                width: 2,
                height: 10,
                backgroundColor: '#8A8A8A',
                marginLeft: 10,
              }}></View>
          </Pressable>
          <Pressable
            style={parcelStyle.psdContainer}
            onPress={() => {
              setSelectedTab(2);
            }}>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor:
                  selectedTab === 2 ? SAL.colors.purple : SAL.colors.white,
                paddingBottom: 5,
                paddingTop: 5,
              }}>
              <Text
                style={[
                  parcelStyle.tabText,
                  {color: selectedTab === 2 ? SAL.colors.purple : '#8A8A8A'},
                ]}>
                Scanned (13)
              </Text>
            </View>
            <View
              style={{
                width: 2,
                height: 10,
                backgroundColor: '#8A8A8A',
                marginLeft: 15,
              }}></View>
          </Pressable>
          <Pressable
            style={[
              parcelStyle.psdContainer,
              {width: '40%', justifyContent: 'flex-end'},
            ]}
            onPress={() => {
              setSelectedTab(3);
            }}>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor:
                  selectedTab === 3 ? SAL.colors.purple : SAL.colors.white,
                paddingBottom: 5,
                paddingTop: 5,
              }}>
              <Text
                style={[
                  parcelStyle.tabText,
                  {color: selectedTab === 3 ? SAL.colors.purple : '#8A8A8A'},
                ]}>
                Assigned To Driver
              </Text>
            </View>
          </Pressable>
        </View>

        {selectedTab === 1 ? <FlatList data={['1', '2', '3']} renderItem={renderItem} /> : null}
        {selectedTab === 3 ? <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={sectionHeaderRenderItem}
          renderSectionFooter={FlatListItemSeparator}
        /> : null}
        <Text style={styles.noteText}>
          Note: If your current box is full, you can seal it and generate ID
          with QR code. Pending items will be packed in a different box.
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Pressable
          style={[styles.createBoxButton, {marginTop: 20}]}
          onPress={() => {
            props.navigation.navigate('ScannedSuccessfullyScreen');
          }}>
          <Image source={SAL.image.createBox} />
          <Text style={styles.createBoxText}>Scan & Create Box</Text>
        </Pressable>
        <Pressable onPress={() => {
            setShowBS(true);
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#6F137A', '#A881AC']}
            style={[styles.moveToWarehouseButton, {flexDirection: 'row'}]}>
              <Image source={SAL.image.truckDriverWhite} />
            <Text style={[styles.moveToWarehouseText, {marginLeft: 10}]}>Assign to Driver</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const parcelStyle = StyleSheet.create({
  psdContainer: {
    width: '30%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabText: {
    color: SAL.colors.purple,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '100%',
    height: 50,
    color: SAL.colors.purple,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    paddingLeft: 20,
  },
  inputAndroid: {
    width: '100%',
    height: 50,
    color: SAL.colors.purple,
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    paddingLeft: 20,
    paddingVertical: 5,
  },
  chevronDown: {
    display: 'none',
  },
  chevronUp: {
    display: 'none',
  },
});

export default Parcel;
