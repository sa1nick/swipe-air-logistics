import React from 'react';
import {StyleSheet, Text, View, Pressable, Image, Platform} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import SAL from '../../SAL';
import SALGradientButton from '../../components/SALGradientButton';
import {scaleFactor} from '../../utils/ViewScaleUtil';

const DriverAssignmentCell = props => {
  const {item} = props;

  const HeaderContainer = ({title, value}) => {
    return (
      <View
        style={[
          styles.subContainer,
          {alignItems: title === 'Date & Time' ? 'flex-start' : 'flex-end'},
        ]}>
        <Text style={styles.headingText}>{title}</Text>
        <Text style={styles.dateText}>{value}</Text>
      </View>
    );
  };

  const LocationContainer = ({value}) => {
    return (
      <View style={styles.locationContainer}>
        <PickupDropLocation
          title={'PICKUP LOCATION'}
          address={item.pickupWarehouseName}
        />
        <PickupDropLocation
          title={'DROP LOCATION'}
          address={item.wareHouseName}
        />
      </View>
    );
  };

  const PickupDropLocation = ({title, address}) => {
    return (
      <View>
        <Text style={styles.locationTitle}>{title}</Text>
        <Text
          style={[
            styles.dateText,
            {fontFamily: 'Rubik-Regular', marginBottom: 10},
          ]}>
          {address}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateCapacityContainer}>
        <HeaderContainer
          title={'Date & Time'}
          value={`${item.pickUpDate}, ${item.pickUpTime}`}
        />
        <HeaderContainer
          title={'Capacity Filled'}
          value={item.capacityFilled}
        />
      </View>
      <LinearGradient
        colors={['rgba(255,183,133, 0.2)', 'rgba(255,183,133, 0.7)']}
        style={styles.bgGradientContainer}>
        <View style={styles.driverInfoContainer}>
          <LinearGradient
            colors={['#BBE5F8', '#FFFFFF']}
            style={styles.driverIcon}>
            <Image source={SAL.image.truckDriver} />
          </LinearGradient>
          <View style={styles.driverNameVehicleContainer}>
            <Text style={styles.dateText}>{item.driverName}</Text>
            <Text style={[styles.headingText, {color: '#111111'}]}>
              Vehicle : {item.vehicleNo}
            </Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.separator} />
          <Text style={[styles.statusText, {color: props.color}]}>
            {props.selectedLabel}
          </Text>
        </View>
        <LocationContainer />
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.orangeButton}
            onPress={props.showConsignmentButton}>
            <Text style={styles.orangeButtonText}>Show Consignment</Text>
          </Pressable>
          {props.selectedValue === '1' ? (
            <SALGradientButton buttonTitle={'Freeze & Proceed'} />
          ) : null}
          {props.selectedValue === '2' ? (
            <SALGradientButton
              buttonTitle={'Remind Driver'}
              buttonPressed={props.remindDriverButton}
            />
          ) : null}
          {props.selectedValue === '3' ? (
            <Pressable
              style={[
                styles.orangeButton,
                {backgroundColor: '#0DBC93', borderWidth: 0},
              ]}>
              <Text
                style={[styles.orangeButtonText, {color: SAL.colors.white}]}>
                Call Driver
              </Text>
            </Pressable>
          ) : null}
          {props.selectedValue === '5' ? (
            <SALGradientButton
              buttonTitle={'Assign Another Driver'}
              buttonPressed={props.assignmentRejectedButton}
            />
          ) : null}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: 330,
  },
  bgGradientContainer: {
    marginHorizontal: 16,
    // height: scaleFactor(265),
    borderRadius: 8,
    marginTop: scaleFactor(18),
    paddingBottom: 20,
  },
  dateCapacityContainer: {
    marginHorizontal: 16,
    height: 37,
    flexDirection: 'row',
  },
  subContainer: {
    width: '50%',
    height: 37,
    justifyContent: 'space-between',
  },
  headingText: {
    color: SAL.colors.grey,
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
  },
  dateText: {
    color: SAL.colors.black,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  driverInfoContainer: {
    marginHorizontal: 18,
    height: 36,
    marginTop: 20,
    flexDirection: 'row',
  },
  driverIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverNameVehicleContainer: {
    marginLeft: 10,
    height: 36,
  },
  statusContainer: {
    marginHorizontal: 18,
    height: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  separator: {
    width: '50%',
    height: 0.5,
    backgroundColor: '#B1B1B1',
    marginTop: 10,
  },
  statusText: {
    color: '#0DBC93',
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
  },
  locationContainer: {
    marginHorizontal: 17,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  locationTitle: {
    color: '#919191',
    fontSize: 8,
    fontFamily: 'Rubik-Regular',
  },
  buttonContainer: {
    // height: scaleFactor(67),
    // marginTop: scaleFactor(5),
    marginHorizontal: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  orangeButton: {
    width: 150,
    height: 45,
    borderColor: '#FF6D09',
    borderWidth: 0.5,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orangeButtonText: {
    color: '#FF6D09',
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
    marginLeft: 10,
  },
});

export default DriverAssignmentCell;
