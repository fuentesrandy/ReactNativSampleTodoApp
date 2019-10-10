import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';

//
import {getTabBarIcon} from './utils';
// actions
import * as todoActions from '../actions/todoActions';
//
import Home from '../components/home';
import Todo from '../components/todo';
import TodoTabs from '../components/todo/tabs';

//#region Home Tab
const HomeTabRoutes = {
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
};
const HomeTabRoutesConfig = {
  initialRouteName: 'Home',
};
//#endregion

//#region Todos Tab
const TodosTabRoutes = {
  List: {
    screen: TodoTabs,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  AddEdit: {
    screen: Todo,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.Id > 0 ? 'Edit Todo' : 'Add Todo',
    }),
  },
};

const TodosTabRouteConfig = {
  initialRouteName: 'List',
};
//#endregion

const Tabs = {
  HomeTab: {
    screen: createStackNavigator(HomeTabRoutes, HomeTabRoutesConfig),
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  TodoTab: {
    screen: createStackNavigator(TodosTabRoutes, TodosTabRouteConfig),
    navigationOptions: {
      tabBarLabel: 'Todos',
    },
  },
};

const TabNavigatorConfig = {
  defaultNavigationOptions: ({navigation}, props) => ({
    tabBarIcon: ({focused, tintColor}) => {
      return getTabBarIcon(navigation, focused, tintColor);
    },
  }),
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'gray',
  },
};

const MainTabNavigator = createBottomTabNavigator(Tabs, TabNavigatorConfig);
const RootSwitch = createSwitchNavigator(
  {MainTabNavigator},
  {initialRouteName: 'MainTabNavigator'},
);
const AppContainer = createAppContainer(RootSwitch);

class NavWrapper extends Component {
  componentDidMount() {}

  render() {
    return <AppContainer {...this.props} />;
  }
}

//#region MapStateToProps
function mapStateToProps(state, props) {
  return {};
}
//#endregion

//#region MapDispatchToProps
const mapDispatchToProps = {};
//#endregion

//#region Export Component
export default connect(
  mapStateToProps,
  {...mapDispatchToProps},
)(NavWrapper);
//#endregion
