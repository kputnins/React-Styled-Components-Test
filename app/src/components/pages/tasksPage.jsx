import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import srcRemove from '../../../img/remove.svg';
import TaskList from '../taskList';
import ImgSpinner from '../spinner';

import { URL_LISTS } from '../../constants/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeadingDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SelectionDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    .icon-remove {
      visibility: unset;
    }
  }
`;

const Select = styled.select`
  font-size: 1.8em;
  font-weight: bold;
  padding: 0.8em;
  appearance: none;
  border: none;
  outline: none;
`;

const ImgRemove = styled.img`
  width: 1.5em;
  height: 1.5em;
  visibility: hidden;
  color: red;
  filter: invert(10%) sepia(100%) saturate(50);
  right: 0;
`;

const findIndexById = (arr, id) =>
  arr.findIndex(item => item?.id?.toString() === id?.toString());

const findItemById = (arr, id) =>
  arr.find(item => item?.id?.toString() === id?.toString());

const TasksPage = withRouter(({ history, match }) => {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    fetch(URL_LISTS)
      .then(res => res.json())
      .then(data => {
        setLists(data);
        const id =
          findIndexById(data, match?.params?.id) !== -1
            ? match.params.id
            : data[0].id;
        setSelectedList(id);
        setIsLoading(false);
      });
  }, []);

  const updateData = (newList, newLists) => {
    setIsUpdating(true);
    fetch(`${URL_LISTS}/${newList.id}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newList),
    })
      .then(res => res.json())
      .then(() => {
        setIsUpdating(false);
        setLists(newLists);
      });
  };

  const onTaskChange = ({ id, newTaskList }) => {
    let newList;
    const newLists = lists.map(list => {
      if (list.id === id) {
        newList = { ...list, tasks: newTaskList };
        return newList;
      }
      return list;
    });
    updateData(newList, newLists);
  };

  const onListRemove = id => {
    setIsLoading(true);
    setIsUpdating(true);
    fetch(`${URL_LISTS}/${id}`, {
      method: 'delete',
    }).then(() => {
      fetch(URL_LISTS)
        .then(res => res.json())
        .then(data => {
          setLists(data);
          setSelectedList(data[0].id);
          setIsUpdating(false);
          setIsLoading(false);
        });
    });
  };

  const onListSelect = ({ target: { value: id } }) => {
    setSelectedList(id);
    history.push(`/tasks/${id}`);
  };

  return (
    <>
      <Container>
        <HeadingDiv>
          <h1>Your task lists</h1>
          <ImgSpinner isUpdating={isUpdating} />
        </HeadingDiv>

        {!isLoading && (
          <>
            <SelectionDiv>
              <Select onChange={e => onListSelect(e)}>
                {lists.map((list, i) => (
                  <option key={`${i + 1}_${list.name}`} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </Select>
              <ImgRemove
                src={srcRemove}
                className="icon-remove"
                onClick={() => onListRemove(selectedList)}
              />
            </SelectionDiv>

            <TaskList
              listData={findItemById(lists, selectedList)}
              onTaskChange={onTaskChange}
              onListRemove={onListRemove}
            />
          </>
        )}
      </Container>
    </>
  );
});

export default TasksPage;
