import React from 'react';
import { string, bool, func } from 'prop-types';
import styled from 'styled-components';

import srcRemove from '../../img/remove.svg';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 21.5em;
  margin-bottom: 0.8em;

  &:hover {
    .icon-remove {
      display: unset;
    }
  }
`;

const TaskContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 19em;

  label {
    font-size: 1.5em;
  }

  input {
    transform: scale(1.7);
  }
`;

const ImgRemove = styled.img`
  width: 1.5em;
  height: 1.5em;
  display: none;
  color: red;
  filter: invert(10%) sepia(100%) saturate(50);
`;

const Task = ({ label, done, inputName, onTaskClick, onTaskRemove }) => {
  return (
    <Container>
      <TaskContainer onClick={() => onTaskClick(inputName)}>
        <label htmlFor={inputName}>{label}</label>
        <input type="checkbox" name={inputName} checked={done} readOnly />
      </TaskContainer>
      <ImgRemove
        src={srcRemove}
        className="icon-remove"
        onClick={() => onTaskRemove(inputName)}
      />
    </Container>
  );
};

Task.propTypes = {
  label: string.isRequired,
  done: bool.isRequired,
  inputName: string.isRequired,
  onTaskClick: func.isRequired,
  onTaskRemove: func.isRequired,
};

export default Task;
