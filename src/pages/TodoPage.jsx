import { useState, useEffect } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { getTodos, addTodos, patchTodos, deleteTodos } from '../api/todos';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, currentMember } = useAuth();

  const handleChange = (value) => {
    setInputValue(value);
  };
  const handleAddTodo = async () => {
    if (inputValue.length === 0) {
      return;
    }
    // call API
    try {
      const data = await addTodos({
        title: inputValue,
        isDone: false,
      });
      // update todos
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue(''); //新增完清空
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyDown = async () => {
    if (inputValue.length === 0) {
      return;
    }
    // call API
    try {
      const data = await addTodos({
        title: inputValue,
        isDone: false,
      });
      // update todos
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue(''); //新增完清空
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleDone = async (id) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    try {
      await patchTodos({
        id,
        isDone: !currentTodo.isDone,
      });
    } catch (error) {
      console.error(error);
    }

    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });
    });
  };
  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return { ...todo, isEdit: false };
      });
    });
  };
  const handleSave = async ({ id, title }) => {
    try {
      await patchTodos({
        id,
        title,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              id,
              title,
              isEdit: false,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteTodos(id);
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error(error);
    }
  };
  // before rendering
  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.log(error);
      }
    };
    getTodosAsync();
  }, []);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);
  return (
    <div>
      <Header username={currentMember?.name} />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer todoLength={todos.length} />
    </div>
  );
};

export default TodoPage;
