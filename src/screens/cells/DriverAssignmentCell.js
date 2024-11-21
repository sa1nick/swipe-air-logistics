import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Platform,
  Appearance,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import SAL from '../../SAL';
import SALGradientButton from '../../components/SALGradientButton';
import {scaleFactor} from '../../utils/ViewScaleUtil';

const colorScheme = Appearance.getColorScheme();
const orange = '#A63D00';
const DriverAssignmentCell = props => {
  const {item} = props;

  const formatPickUpDate = dateStr => {
    const [month, day, year] = dateStr.split('/');
    const dateObj = new Date(year, month - 1, day);
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date format');
    }
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(dateObj);
  };

  const formatPickUpTime = timeStr => {
    let [hours, minutes] = timeStr.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm}`;
  };

  const HeaderContainer = ({title, value}) => {
    return (
      <View
        style={[
          styles.subContainer,
          {alignItems: title === 'Date & Time' ? 'flex-start' : 'flex-end'},
        ]}>
        <Text style={styles.headingText}>{title}</Text>
        <Text
          style={styles.dateText}
          adjustsFontSizeToFit={true}
          numberOfLines={1}>
          {value}
        </Text>
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
          value={`${formatPickUpDate(item.pickUpDate)}, ${formatPickUpTime(
            item.pickUpTime,
          )}`}
        />
        <HeaderContainer
          title={'Capacity Filled'}
          value={item.capacityFilled}
        />
      </View>
      <LinearGradient
        colors={[
          colorScheme === 'dark'
            ? 'rgba(255,183,133, 0.7)'
            : 'rgba(255,183,133, 0.2)',
          SAL.darkModeColors.orangeFFC8A3,
        ]}
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
          {props.selectedValue === '0' ? (
            <SALGradientButton buttonTitle={'Freeze & Proceed'} />
          ) : null}
          {props.selectedValue === '2' ? (
            <SALGradientButton
              buttonTitle={'Remind Driver'}
              buttonPressed={props.remindDriverButton}
            />
          ) : null}
          {props.selectedValue === '1' ? (
            <Pressable
              style={[
                styles.orangeButton,
                {
                  backgroundColor:
                    colorScheme === 'dark'
                      ? SAL.darkModeColors.green082B24
                      : '#0DBC93',
                  borderWidth: 0,
                },
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
    // borderWidth: 1,
    marginHorizontal: scaleFactor(25),
    height: 30,
    flexDirection: 'row',
  },
  subContainer: {
    width: '50%',
    height: 37,
    justifyContent: 'space-between',
  },
  headingText: {
    color:
      colorScheme === 'dark' ? SAL.darkModeColors.tabInActive : SAL.colors.grey,

    fontSize: 14,
    fontFamily: 'Rubik-Regular',
  },
  dateText: {
    color: colorScheme === 'dark' ? SAL.colors.white : SAL.colors.black,
    // fontSize: 16,
    fontFamily: 'Rubik-Medium',
    marginTop: -5,
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
    backgroundColor:
      colorScheme === 'dark' ? SAL.darkModeColors.seperator242424 : '#B1B1B1',
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
    color: colorScheme === 'dark' ? SAL.darkModeColors.black1C1C1C : '#919191',
    fontSize: 8,
    fontFamily: 'Rubik-Regular',
    marginBottom: Platform.OS === 'ios' ? scaleFactor(5) : scaleFactor(0),
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
    width: scaleFactor(150),
    height: 45,
    borderColor: colorScheme === 'dark' ? orange : '#FF6D09',

    borderWidth: 0.5,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orangeButtonText: {
    color: colorScheme === 'dark' ? orange : '#FF6D09',

    fontSize: scaleFactor(12),
    fontFamily: 'Rubik-Medium',
    marginLeft: 10,
  },
});

export default DriverAssignmentCell;
