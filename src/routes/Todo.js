import { useNavigate } from "react-router-dom";
import {useEffect} from 'react';
import TodoInput from "../components/TodoInput";
import styles from "../style/App.module.scss";
function Todo(){
    const navigate = useNavigate();
    const auth = localStorage.getItem('login');
    useEffect(()=>{
        auth === null ? navigate('/') : navigate('/todo');
    },[])
    return(
        <div className={styles.todo}>
            <h1>TODOLIST</h1>
            <TodoInput />
        </div>
    )
}
export default Todo;