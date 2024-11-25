import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';

import SAL from '../../../SAL';
import ActivityIndicator from '../../../components/ActivityIndicator';
import NavigationBar from '../../../components/NavigationBar';
import AssignToDriverLoosePackingScreen from '../warehouserequests/AssignToDriverLoosePackingScreen';
import BoxCreatedScreen from '../warehouserequests/BoxCreatedScreen';
import ContainerCreatedScreen from '../warehouserequests/ContainerCreatedScreen';
import PalletCreatedScreen from '../warehouserequests/PalletCreatedScreen';
import boxListStyle from './BoxListStyle';

import {clearBPCList} from '../../../api/slice/warehouseSlice/warehouseApiSlice';
import useCustomTheme from '../../../hook/useCustomTheme';
import {scaleFactor} from '../../../utils/ViewScaleUtil';

const CreatedTabBar = createMaterialTopTabNavigator();

const CreatedTabStack = ({onChange}) => {
  const theme = useCustomTheme();
  const isDark = theme === 'dark';
  const styles = boxListStyle(isDark);
  return (
    <CreatedTabBar.Navigator
      screenOptions={({route}) => ({
        lazy: true,
        tabBarScrollEnabled: true,
        swipeEnabled: false,
        tabBarActiveTintColor: isDark
          ? SAL.darkModeColors.purpleF0C3F4
          : '#7A2783',
        tabBarInactiveTintColor: isDark
          ? SAL.darkModeColors.tabInActive
          : '#8A8A8A',
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: 'Rubik-Medium',
          marginHorizontal: 0,
        },
        tabBarIndicatorStyle: {
          borderBottomColor: isDark
            ? SAL.darkModeColors.purpleF0C3F4
            : '#7A2783',
          borderBottomWidth: 2,
        },
        tabBarStyle: {
          backgroundColor: 'transparent',
          // height: 50,
        },
        tabBarItemStyle: {
          width: 'auto',
          // paddingHorizontal: 8, // Adjust padding for spacing
        },
        tabBarLabel: ({focused}) => (
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={{
              fontSize: scaleFactor(16),
              fontFamily: 'Rubik-Medium',
              color: focused
                ? isDark
                  ? SAL.darkModeColors.purpleF0C3F4
                  : '#7A2783'
                : isDark
                ? SAL.darkModeColors.tabInActive
                : '#8A8A8A',
            }}>
            {route.name}
          </Text>
        ),
      })}
      screenListeners={{
        state: e => {
          onChange(e.data.state.index);
        },
      }}>
      <CreatedTabBar.Screen name="Box Created" component={BoxCreatedScreen} />
      <CreatedTabBar.Screen
        name="Pallet Created"
        component={PalletCreatedScreen}
      />
      <CreatedTabBar.Screen
        name="Container Created"
        component={ContainerCreatedScreen}
      />
      <CreatedTabBar.Screen
        name="Assigned to Driver"
        component={AssignToDriverLoosePackingScreen}
      />
    </CreatedTabBar.Navigator>
  );
};

const TotalBoxQuantityView = ({styles, icon, label, quantity}) => {
  return (
    <View style={styles.totalQuantityContainer}>
      <Image source={icon} />
      <Text style={styles.labelText}>{label}</Text>
      <Text style={[styles.fromText, {marginTop: 3}]}>{quantity}</Text>
    </View>
  );
};

function BoxListScreen(props) {
  const theme = useCustomTheme();
  const isDark = theme === 'dark';
  const styles = boxListStyle(isDark);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [boxList, setBoxList] = useState(null);
  const [loading, setLoading] = useState(false);

  const [boxCountWeight, setBoxCountWeight] = useState({
    totalQuantity: 0,
    totalWeight: 0,
  });
  const [palletCountWeight, setPalletCountWeight] = useState({
    totalQuantity: 0,
    totalWeight: 0,
  });
  const [containerCountWeight, setContainerCountWeight] = useState({
    totalQuantity: 0,
    totalWeight: 0,
  });

  const [driverCountWeight, setDriverCountWeight] = useState({
    totalQuantity: 0,
    totalWeight: 0,
  });

  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const pickupWarehouse = useSelector(
    state => state.storeDataGlobally.pickupWarehouse,
  );
  const dropoffWarehouse = useSelector(
    state => state.storeDataGlobally.dropoffWarehouse,
  );

  const boxListData = useSelector(state => state.warehouse.boxList);
  const palletListData = useSelector(state => state.warehouse.palletList);
  const containerListData = useSelector(state => state.warehouse.containerList);
  const assignedDriverData = useSelector(
    state => state.warehouse.assignDriverItemList,
  );

  const titleArray = ['Boxes', 'Pallets', 'Containers', 'Items'];

  useEffect(() => {
    if (boxListData) {
      if (boxListData.code === SAL.codeEnum.code200) {
        setBoxCountWeight({
          totalQuantity: boxListData?.data?.totalBoxes,
          totalWeight: boxListData?.data?.totalWeight,
        });
        setSelectedIndex(0);
      }
    }
  }, [boxListData]);

  useEffect(() => {
    if (palletListData) {
      if (palletListData.code === SAL.codeEnum.code200) {
        setPalletCountWeight({
          totalQuantity: palletListData?.data?.totalPallets,
          totalWeight: palletListData?.data?.totalWeight,
        });
        setSelectedIndex(1);
      }
    }
  }, [palletListData]);

  useEffect(() => {
    if (containerListData) {
      console.log('containerListData: ', containerListData);
      setLoading(false);
      if (containerListData.code === SAL.codeEnum.code200) {
        setContainerCountWeight({
          totalQuantity: containerListData?.data?.totalContainers,
          totalWeight: containerListData?.data?.totalWeight,
        });
        setSelectedIndex(2);
      }
    }
  }, [containerListData]);

  useEffect(() => {
    if (assignedDriverData) {
      console.log('assignedDriverData: ', assignedDriverData);
      if (assignedDriverData.code === SAL.codeEnum.code200) {
        setDriverCountWeight({
          totalQuantity: assignedDriverData?.data?.total,
          totalWeight: assignedDriverData?.data?.totalWeight,
        });
      }
      setSelectedIndex(3);
    }
  }, [assignedDriverData]);

  useEffect(() => {
    return () => {
      dispatch(clearBPCList());
    };
  }, []);

  const navigationLeftButton = () => {
    props.navigation.navigate('Warehouse Requests');
  };

  return (
    <View style={styles.container}>
      <Image
        source={SAL.image.gradientBg}
        style={styles.topGradientContainer}></Image>
      <NavigationBar
        navigationLeftButton={navigationLeftButton}
        isBackButton={true}
      />
      <View style={styles.locationContainer}>
        <View style={styles.fromToContainer}>
          <Image source={SAL.image.fromWarehouseWhite}></Image>
          <Text
            style={styles.fromText}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            {pickupWarehouse.label}
          </Text>
        </View>
        <Image source={SAL.image.tripleArrow} />
        <View style={styles.fromToContainer}>
          <Image source={SAL.image.toWarehouseWhite}></Image>
          <Text
            style={styles.fromText}
            adjustsFontSizeToFit={true}
            numberOfLines={1}>
            {dropoffWarehouse.label}
          </Text>
        </View>
      </View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={SAL.colors.totalBoxWeightGradient}
        style={styles.totalBoxWeigthContainer}>
        <TotalBoxQuantityView
          styles={styles}
          label={`Total ${titleArray[selectedIndex]}`}
          quantity={
            selectedIndex === 0
              ? boxCountWeight.totalQuantity
              : selectedIndex === 1
              ? palletCountWeight.totalQuantity
              : selectedIndex === 2
              ? containerCountWeight.totalQuantity
              : driverCountWeight.totalQuantity
          }
          icon={SAL.image.boxIcon}
        />
        <View style={styles.separator} />
        <TotalBoxQuantityView
          styles={styles}
          label={'Total Weight'}
          quantity={
            selectedIndex === 0
              ? boxCountWeight.totalWeight + ' KG'
              : selectedIndex === 1
              ? palletCountWeight.totalWeight + ' KG'
              : selectedIndex === 2
              ? containerCountWeight.totalWeight + ' KG'
              : driverCountWeight.totalWeight + ' KG'
          }
          icon={SAL.image.weightIcon}
        />
      </LinearGradient>
      <CreatedTabStack
        onChange={newState => {
          setSelectedIndex(newState);
        }}
      />
      {loading && <ActivityIndicator />}
    </View>
  );
}

export default BoxListScreen;
