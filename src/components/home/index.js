import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
// actions
import * as todoActions from '../../actions/todoActions';
import Loading from '../common/loading';
class HomeScreen extends Component {
  componentDidMount() {
    const {fetchTodos} = this.props;
    fetchTodos();
  }

  render() {
    const {isTodoListFetching, itemsCompleted, itemsNotCompleted} = this.props;
    return (
      <View style={styles.container}>
        <Button
          title="Add Todo"
          onPress={() =>
            this.props.navigation.navigate('AddEdit', {
              Id: 0,
            })
          }
        />
        {isTodoListFetching && <Loading />}
        <View style={styles.statBoxContainer}>
          <TouchableOpacity
            style={[styles.statBox, styles.statBoxBtn]}
            onPress={e =>
              this.props.navigation.navigate('List', {
                tab: 'Completed',
              })
            }>
            <View>
              <Text style={styles.statBoxTitle}>Completed</Text>
              <Text style={styles.statBoxCount}>
                {itemsCompleted && itemsCompleted.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statBox, styles.statBoxBtn]}
            onPress={e =>
              this.props.navigation.navigate('List', {
                tab: 'Pending',
              })
            }>
            <View>
              <Text style={styles.statBoxTitle}>Pending</Text>
              <Text style={styles.statBoxCount}>
                {itemsNotCompleted && itemsNotCompleted.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBoxBtn: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#E1E1E1',
    margin: 10,
    padding: 15,
  },
  statBox: {},

  statBoxTitle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statBoxCount: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
});

//#region MapStateToProps
function mapStateToProps(state, props) {
  const isTodoListFetching = state.todo.metadata.isFetching;
  const itemsCompleted = state.todo.data.filter(x => x.isComplete === true);
  const itemsNotCompleted = state.todo.data.filter(x => x.isComplete === false);
  return {
    isTodoListFetching,
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
)(HomeScreen);
//#endregion
