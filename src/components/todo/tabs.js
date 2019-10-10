import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Text,
  StatusBar,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-ionicons';
// actions
import * as todoActions from '../../actions/todoActions';

import TodoList from './list';

class TodoTabs extends Component {
  state = {
    index: 1,
    routes: [
      {key: 'Completed', title: 'Completed', icon: ''},
      {key: 'Pending', title: 'Pending', icon: ''},
    ],
  };
  componentDidMount() {
    const {tab, fetchTodos} = this.props;
    fetchTodos();

    if (tab) {
      const tabView = this.state.routes.filter(x => x.key === tab)[0];
      const index = this.state.routes.indexOf(tabView);
      this.setState({
        index: index,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tab !== this.props.tab) {
      const tabView = this.state.routes.filter(
        x => x.key === this.props.tab,
      )[0];
      const index = this.state.routes.indexOf(tabView);
      this.setState({
        index: index,
      });
    }
  }

  onMarkComplete(todo) {
    const {toggleTodo} = this.props;
    toggleTodo(todo); // this will dispatch an action
  }

  onMarkUnDone(todo) {
    const {toggleTodo} = this.props;
    toggleTodo(todo); // this will dispatch an action
  }
  addTodo() {
    this.props.navigation.navigate('AddEdit', {
      Id: 0,
    });
  }

  getTabCount(key) {
    const {itemsCompleted, itemsNotCompleted} = this.props;
    let count = 0;
    switch (key) {
      case 'Completed':
        count = itemsCompleted.length;
        break;

      case 'Pending':
        count = itemsNotCompleted.length;
        break;

      default:
        count = 0;
        break;
    }

    return count;
  }

  renderItem = ({navigationState, position}) => ({route, index}) => {
    const inputRange = navigationState.routes.map((_, i) => i);

    const activeOpacity = Animated.interpolate(position, {
      inputRange,
      outputRange: inputRange.map(i => (i === index ? 1 : 0)),
    });
    const inactiveOpacity = Animated.interpolate(position, {
      inputRange,
      outputRange: inputRange.map(i => (i === index ? 0 : 1)),
    });

    return (
      <View style={styles.tabContainer}>
        <Animated.View style={[styles.tabItem, {opacity: inactiveOpacity}]}>
          <Icon
            name={route.icon}
            size={25}
            style={[styles.icon, styles.inactive]}
          />
          <Text style={[styles.itemLbl, styles.inactive]}>{route.title}</Text>
          <View style={[styles.tabItemBadge]}>
            <Text style={[styles.tabItemLbl]}>
              {this.getTabCount(route.key)}
            </Text>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.tabItem,
            styles.activeTabItem,
            {opacity: activeOpacity},
          ]}>
          <Icon
            name={route.icon}
            size={25}
            style={[styles.icon, styles.active]}
          />
          <Text style={[styles.itemLbl, styles.active]}>{route.title}</Text>
          <View style={[styles.tabItemBadge]}>
            <Text style={[styles.tabItemLbl]}>
              {this.getTabCount(route.key)}
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  };

  renderTabBar(props) {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, index) => {
          return (
            <TouchableOpacity
              style={[styles.tabBtn]}
              key={route.key}
              onPress={() => props.jumpTo(route.key)}>
              {this.renderItem(props)({route, index})}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  render() {
    const {isTodoTodoListFetching, itemsCompleted, itemsNotCompleted} = this.props;
    return (
      <View style={styles.mainContainer}>
        <TabView
          renderTabBar={this.renderTabBar.bind(this)}
          navigationState={this.state}
          onIndexChange={index => this.setState({index})}
          initialLayout={{width: Dimensions.get('window').width}}
          renderScene={SceneMap({
            Completed: () => (
              <TodoList
                isLoading={isTodoTodoListFetching}
                addTodo={this.addTodo.bind(this)}
                showAdd={true}
                data={itemsCompleted}
                onMarkComplete={this.onMarkComplete.bind(this)}
                onMarkUnDone={this.onMarkUnDone.bind(this)}
              />
            ),
            Pending: () => (
              <TodoList
                isLoading={isTodoTodoListFetching}
                addTodo={this.addTodo.bind(this)}
                showAdd={true}
                data={itemsNotCompleted}
                onMarkComplete={this.onMarkComplete.bind(this)}
                onMarkUnDone={this.onMarkUnDone.bind(this)}
              />
            ),
          })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E1E1E1',
  },
  tabBtn: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, .2)',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4.5,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  activeTabItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  active: {
    color: '#0084ff',
  },
  inactive: {
    color: '#939393',
  },
  icon: {
    height: 25,
    width: 25,
  },
  itemLbl: {
    fontSize: 15,
    marginTop: 0,
    marginBottom: 5,
    backgroundColor: 'transparent',
  },
  tabItemBadge: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 5,
    borderRadius: 50,
    marginLeft: 5,
    marginBottom: 5,
  },
  tabItemLbl: {},
});

//#region MapStateToProps
function mapStateToProps(state, props) {
  const tab = props.navigation.getParam('tab', undefined);
  const isTodoTodoListFetching = state.todo.metadata.isFetching;
  const itemsCompleted = state.todo.data.filter(x => x.isComplete === true);
  const itemsNotCompleted = state.todo.data.filter(x => x.isComplete === false);
  return {
    tab,
    isTodoTodoListFetching,
    itemsCompleted,
    itemsNotCompleted,
  };
}
//#endregion

//#region MapDispatchToProps
const mapDispatchToProps = {
  fetchTodos: todoActions.fetchTodos,
  toggleTodo: todoActions.toggleTodoComplete,
  addTodo: todoActions.addTodo,
};
//#endregion

//#region Export Component
export default connect(
  mapStateToProps,
  {...mapDispatchToProps},
)(TodoTabs);
//#endregion
