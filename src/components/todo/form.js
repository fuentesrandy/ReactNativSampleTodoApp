import React, {Fragment} from 'react';
import {Button, TextInput, View, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

const TodoForm = ({onSubmit, todo = {}}) => {
  return (
    <Formik
      initialValues={{...todo}}
      onSubmit={(values, actions) => {
        onSubmit(values, actions.setSubmitting, actions.resetForm);
      }}
      validationSchema={Yup.object().shape({
        description: Yup.string().required('Required'),
      })}>
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isValid,
          isSubmitting,
          handleChange,
          handleBlur,
          setFieldTouched,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <Fragment>
            <TextInput
              autoFocus={true}
              style={styles.textInput}
              value={values.description}
              onChangeText={handleChange('description')}
              placeholder="Enter todo"
              onBlur={() => setFieldTouched('description')}
              secureTextEntry={true}
              multiline
              numberOfLines={4}
            />
            {errors.description && (
              <Text style={{fontSize: 10, color: 'red'}}>
                {errors.description}
              </Text>
            )}

            <Button
              title="Save"
              disabled={isSubmitting || isValid === false}
              onPress={handleSubmit}
            />
          </Fragment>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingLeft: 30,
    paddingRight: 30,
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10,
  },
});

export default TodoForm;
