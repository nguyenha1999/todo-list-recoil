import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Popconfirm, Row } from "antd";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { storeData } from "../../helpers";
import { todoListState } from "./../../recoil";

const TodoItem = ({ todo }) => {
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState(todo.text);
  const [id, setId] = useState(todo.id);

  const setTodo = useSetRecoilState(todoListState);

  const handleDelete = (index) => {
    setTodo((preState) => {
      const newTodo = preState.filter((todo) => {
        return todo.id !== index;
      });
      storeData("todo", newTodo);
      return newTodo;
    });
  };
  const handleEdit = (index) => {
    setTodo((preState) => {
      // eslint-disable-next-line array-callback-return
      const newTodo = preState?.map((todo) => {
        if (todo.id === index) {
          return { ...todo, id: id, text: text };
        }
      });
      storeData("todo", newTodo);
      return newTodo;
    });
  };
  return (
    <div>
      <Card
        style={{
          borderRadius: "8px",
          margin: "24px",
          border: "1px solid teal",
        }}
      >
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Col>
            {editable ? (
              <Input value={id} onChange={(e) => setId(e.target.value)} />
            ) : (
              <span>{todo.id}</span>
            )}
          </Col>
          <Col>
            {editable ? (
              <Input value={text} onChange={(e) => setText(e.target.value)} />
            ) : (
              <span>{todo.text}</span>
            )}
          </Col>
          <Col>{todo.time}</Col>
          <Col>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                handleEdit(todo.id);
                if (editable) {
                  setText(todo.text);
                }
                setEditable(!editable);
              }}
            >
              {editable ? "Update" : "Edit"}
            </Button>
            <Popconfirm title="Bạn có muốn xóa hành động này không ?">
              <Button
                icon={<DeleteOutlined />}
                style={{ marginLeft: "8px" }}
                danger
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TodoItem;
