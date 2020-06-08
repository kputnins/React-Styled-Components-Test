/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { URL_LISTS } from '../../constants/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width 10em;
    padding: 0.4em;
    font-size: 1.2em;
    margin: 0.5em;
  }
`;

const FieldDiv = styled.div`
  position: relative;
  width: 28em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 0.5em 0;

  label {
    font-size: 1.5em;
  }

  input {
    width: 18em;
  }
`;

const ErrorDiv = styled.div`
  position: absolute;
  right: -5em;
  top: 0.7em;
`;

const AddTasksPage = withRouter(({ history }) => {
  const [tasks, setTasks] = useState({ task0: '' });

  const onAddTask = () => {
    const index = Object.keys(tasks).length;
    tasks[`task${index}`] = '';
    setTasks({ ...tasks });
  };

  const onSubmit = (values, { setSubmitting }) => {
    const newTasks = [];
    Object.keys(values).forEach(task => {
      if (values[task] && task !== 'label')
        newTasks.push({ label: values[task], done: false });
    });

    const newList = {
      createdAt: new Date().toISOString().split('T')[0],
      name: values.label,
      tasks: newTasks,
    };

    fetch(`${URL_LISTS}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newList),
    })
      .then(res => res.json())
      .then(() => {
        setSubmitting(false);
        alert('List submitted!');
        history.push(`/tasks`);
      });
  };

  return (
    <Container>
      <h1>Add a task list</h1>
      <Formik
        initialValues={tasks}
        validate={values => {
          const errors = {};
          if (!values.label) {
            errors.label = 'Required';
          }
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Container>
              <FieldDiv>
                <label htmlFor="label">List name:</label>
                <Field type="text" name="label" />
                <ErrorMessage name="label" component={ErrorDiv} />
              </FieldDiv>
              {Object.keys(tasks).map((task, i) => {
                return (
                  <FieldDiv key={task}>
                    <label htmlFor={task}>{`Task: ${i + 1}`}</label>
                    <Field type="text" name={task} />
                  </FieldDiv>
                );
              })}
              <button type="button" onClick={onAddTask}>
                Add task
              </button>
              <button type="submit" disabled={isSubmitting}>
                Submit list
              </button>
            </Container>
          </Form>
        )}
      </Formik>
    </Container>
  );
});

export default AddTasksPage;
