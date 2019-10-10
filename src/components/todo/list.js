import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-ionicons';
import Loading from '../common/loading';
const TodoList = ({
  isLoading,
  addTodo,
  title,
  showAdd,
  data,
  onMarkComplete,
  onMarkUnDone,
}) => {
  return (
    <View>
      <View>
        {showAdd && <Button title="Add" onPress={addTodo} />}
        {title && <Text style={styles.title}>{title}</Text>}
        {isLoading && <Loading />}
      </View>
      {!data ||
        (data.length == 0 && (
          <View>
            <Text style={styles.emptyList}>No Items</Text>
          </View>
        ))}
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={styles.listRow}>
            <View style={styles.left}>
              {item.isComplete === true && (
                <Icon
                  style={[styles.icon, styles.complete]}
                  size={25}
                  name={'checkmark-circle-outline'}
                />
              )}
              {item.isComplete === false && (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={e => onMarkComplete(item)}>
                  <Icon
                    style={[styles.icon, styles.pending]}
                    size={25}
                    name={'checkmark-circle-outline'}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.right}>
              {item.isComplete === true && (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={e => onMarkUnDone(item)}>
                  <Icon
                    style={[styles.icon, styles.red]}
                    size={25}
                    name={'undo'}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    color: 'black',
    alignSelf: 'center',
  },
  emptyList: {
    fontSize: 25,
    color: '#c0c0c0',
    alignSelf: 'center',
  },
  listRow: {
    flex: 1,
    paddingTop: 22,
    paddingBottom: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    padding: 5,
  },
  description: {
    flexGrow: 1,
    padding: 5,
    fontSize: 18,
  },
  right: {
    padding: 5,
  },
  btn: {
    alignItems: 'center',
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
  complete: {
    color: 'green',
  },
  pending: {
    color: '#FFBF00',
  },
  red: {
    color: 'red',
  },
});

export default TodoList;
