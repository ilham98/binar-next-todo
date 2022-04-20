import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFormTitle,
  createTodo,
  deleteTodo,
  fetchTodo,
} from "../redux/slices/todoSlice";
import Navbar from "../components/Navbar";
import Authenticated from "../middlewares/Authenticated";

export default function Home() {
  const todos = useSelector((store) => store.todo);
  const dispatch = useDispatch();

  const getTodo = async () => {
    await dispatch(fetchTodo());
  };

  useEffect(() => {
    getTodo();
  }, []);

  const onInputChange = (event) => {
    dispatch(changeFormTitle(event.target.value));
  };

  const onSubmitClick = () => {
    dispatch(createTodo(todos.form.title));
  };

  const onDeleteClick = (id, index) => {
    dispatch(deleteTodo({ id, index }));
  };

  return (
    <Authenticated>
      <Navbar />
      <div className={styles.container}>
        <input onChange={onInputChange} value={todos.form.title} />
        <button onClick={onSubmitClick} disabled={todos.isSubmitLoading}>
          Tambah
        </button>
        {todos.isLoading ? (
          "Loading"
        ) : (
          <ul>
            {todos.data.map((todo, todoIndex) => (
              <li key={todo.id}>
                {todo.title}{" "}
                <button onClick={() => onDeleteClick(todo.id, todoIndex)}>
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Authenticated>
  );
}
