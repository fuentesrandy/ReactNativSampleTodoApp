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
  Alert,
} from 'react-native';
import TodoForm from './form';
// actions
import * as todoActions from '../../actions/todoActions';

class Todo extends Component {
  componentDidMount() {}

  addTodo(values, setSubmitting, resetForm) {
    const data = values;
    const {addTodo} = this.props;
    addTodo(data);
    resetForm();
    setSubmitting(false);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <TodoForm onSubmit={this.addTodo.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//#region MapStateToProps

function mapStateToProps(state, props) {
  const {navigation} = props;
  return {
    Id: JSON.stringify(navigation.getParam('Id', 0)),
  };
}
//#endregion

//#region MapDispatchToProps
const mapDispatchToProps = {
  addTodo: todoActions.addTodo,
};
//#endregion

//#region Export Component
export default connect(
  mapStateToProps,
  {...mapDispatchToProps},
)(Todo);
//#endregion
