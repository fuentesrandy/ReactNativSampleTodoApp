import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-ionicons';

export const IconWithBadge = ({name, badgeCount = 0, color, size}) => {
  return (
    <View style={{width: 24, height: 24, margin: 5}}>
      <Icon name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
};

export const getTabBarIcon = (navigation, focused, tintColor) => {
  const {routeName} = navigation.state;
  let IconComponent = Icon;
  let iconName;
  if (routeName === 'HomeTab') {
    iconName = `home${focused ? '' : ''}`;
    IconComponent = IconWithBadge;
  } else if (routeName === 'TodoTab') {
    iconName = `ios-list`;
  } else if (routeName === '') {
    iconName = ``;
  }
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};
