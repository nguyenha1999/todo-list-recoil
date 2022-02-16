import { Button, Input } from "antd";
import moment from "moment";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { storeData } from "../../helpers";
import { todoListState } from "../../recoil";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [text, setText] = useState();
  const TodoList = useRecoilValue(todoListState);
  const setTodo = useSetRecoilState(todoListState);

  const handleAdd = () => {
    setTodo((preState) => {
      const newTodo = [
        ...preState,
        {
          id: nanoid(),
          text: text,
          time: moment().format("hh:mm:ss DD/MM/YYYY"),
        },
      ];
      storeData("todo", newTodo);
      return newTodo;
    });
    setText("");
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        <Button type="primary" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <div>
        {TodoList?.map((todo) => {
          return (
            <>
              <Link to={todo.id}>
                <TodoItem todo={todo} key={todo.id} />{" "}
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Todo;
