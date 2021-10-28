// import logo from './logo.svg';
// import './App.css';
import React, { Component, useEffect, useState } from "react";
import gql from 'graphql-tag';
// eslint-disable-next-line
import { graphql, useMutation, useQuery } from '@apollo/client';
import { Paper } from '@material-ui/core';
import Form from "./Form";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



// eslint-disable-next-line
const TodosQuery = gql`
{
  todos{
    id
    text
    complete
  }
}`;
const UpdateMutation = gql`
  mutation($id: ID!, $complete: Boolean!){
    updateTodo(id: $id, complete: $complete){
      id
      text
      complete
    }
  }
`;
const RemoveMutation = gql`
  mutation($id: ID!){
    removeTodo(id: $id){
      id
      text
      complete
    }
  }
`;
const CreateMutation = gql`
  mutation($id: ID!){
    createTodo(id: $id){
      id
      text
      complete
    }
  }
`;



function App() {
  //useQuery or other hooks can never be outside function/class
  const { data, loading, error } = useQuery(TodosQuery);
  const [updateTodo, { dataUpdate }] = useMutation(UpdateMutation);
  const [removeTodo, {dataRemove}] = useMutation(RemoveMutation);
  const [createTodo, {dataCreate}] = useMutation(CreateMutation);
  // useEffect(){

  // },[];
  const updateTodoFn = async todo => {
    await updateTodo({ variables: { id: todo.id, complete: !todo.complete } })
      .then(result => console.log(result));
  }
  const removeTodoFn = async todo => {
    await removeTodo({variables: {id: todo.id}})

    // await removeTodo({variables: {id: todo.id},
      
    //   update: cache => {
    //     console.log('Updating data');
    //     let data = cache.readQuery({ query: TodosQuery });
    //     console.log(data);
    //     let abc = {todos: ""};
    //     abc.todos = data.todos.filter(({id: itemId}) => itemId !== todo.id);
    //     console.log('Intermediate data');
    //     console.log(abc);
    //     data = abc;
    //     console.log('Intermediate data 222');
    //     console.log(abc);
        
    //     let test = cache.writeQuery({ query: TodosQuery }, data);
    //     console.log('After updating data');
    //     console.log(test);
        
    //   }})//})
    .then(result => console.log(result));
  }


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  //This function is written with double arrows so that this function
  // doesn't get called right away when mentioned in onClick param
  //DOuble arrow is must
  const handleToggle = (value) => () => {
    updateTodoFn(value)//.then(() => window.location.reload());

  };
  const handleCreateTodo = (value)  => {
    updateTodoFn(value)//.then(() => window.location.reload());

  };
  const handleDelete = (value) => () => {
    removeTodoFn(value)//.then(() => window.location.reload());

  };
  console.log(data)
  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "auto", width: 400 }}>
        {/* Paper is like a card item only */}
        <Paper elevation={3} >
          <h1>
            TodoList
          </h1>
          <Form submit = {handleCreateTodo}>

          </Form>
          {/* {
            data.todos.map(todo =>
              <div key={`${todo.id}-todo-item`}>{todo.text}</div>)
          } */}
          <List >
            {data.todos.map((value) => {
              const labelId = `checkbox-list-label-${value.id}`;

              return (
                <ListItem key={value.id} role={undefined} dense button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value.complete}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value.text}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" >
                      <CloseIcon onClick = {handleDelete(value)}/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </div>
    </div>

  );

}

// export default App;
export default App;

//export graphql(TodosQuery)(App)
//This thing is deprecated in Apollo/client 3

// import React from 'react';
// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

function CheckboxList({ data1 }) {
  // const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, value);
    }

    setChecked(newChecked);
    console.log(checked);

  };
  // console.log(data1);
  return (
    <List >
      {data1.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem key={value.id} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={value.complete}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${value.text}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}