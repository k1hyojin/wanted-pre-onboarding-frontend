import { useState } from "react";
import styles from "../style/App.module.scss";
import axios from "axios";
function TodoList({ id, completed, todo, setUpdate}) {
    const access_token = localStorage.getItem('login');
    const [edit, setEdit] = useState(false);
    const [isComplete, setIsComplete] = useState(!completed);
    const [updateTodo,setUpdateTodo] = useState(0);
    const [change, setChange] = useState(todo);
    const updateCancel = ()=>{ setEdit(!edit); setChange(todo)}
    const isEdit = () => {setEdit(!edit)}

    let body = {
        todo: change,
        isCompleted : isComplete
    }
    let body2 = {
        todo: change,
        isCompleted : completed
    }

    const todoComplete = async()=>{
        setIsComplete(!isComplete);
        axios.put(`https://pre-onboarding-selection-task.shop/todos/${id}`,body,{
            headers: {
                Authorization: `Bearer ${access_token}`}
            })
        .then(res => {
            setUpdate(updateTodo);
        } )
        .catch(err => alert('오류발생!'))
    }

    const changeTodo = (event)=>{
        setChange(event.target.value);
    }

    const updateChange = ()=>{
        setUpdateTodo(updateTodo +1);
        axios.put(`https://pre-onboarding-selection-task.shop/todos/${id}`,body2,{
            headers: {
                Authorization: `Bearer ${access_token}`}
            })
        .then(res => setUpdate(updateTodo) )
        .catch(err => alert('오류 발생!'));
        setEdit(!edit);
        
    }

    const deleteList = ()=>{
        axios.delete(`https://pre-onboarding-selection-task.shop/todos/${id}`,{
            headers: {
                Authorization: `Bearer ${access_token}`}
            })
        .then(res => setUpdate(updateTodo) )
        .catch(err => alert('오류 발생!'));
    }

    return (
        <div>
            {edit ? <div>
                    <input type="text" onChange={changeTodo} value={change} />
                    <button onClick={updateChange}>제출</button>
                    <button onClick={updateCancel}>취소</button>
                </div>
                    : 
            <div key={id}>
                <span className={!isComplete ? styles.complete : styles.notComplete}> {todo}</span>
                <button onClick={todoComplete}>완료</button>
                <button onClick={isEdit}>수정</button>
                <button onClick={deleteList}>삭제</button>
            </div>}
        </div>
    )
}

export default TodoList;