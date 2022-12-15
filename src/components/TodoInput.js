import { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "./TodoList";

function TodoInput(){
    const [todo, setTodo] = useState('');
    const [todoList,setTodoList] = useState([]);
    const [upTodo, setUpTodo] = useState(0);
    const access_token = localStorage.getItem('login');
    const todoValue = (event)=> setTodo(event.target.value);
    let body = {todo : todo}
    const todoAdd = (event)=>{
        event.preventDefault();
        axios.post("https://pre-onboarding-selection-task.shop/todos", body,{
            headers: {
                Authorization: `Bearer ${access_token}`}
            })
        .then(res => setUpTodo(!upTodo) )
        .catch(err => alert("오류 발생"))
        setTodo('');
    }
    const getTodo = ()=>{
        axios.get("https://pre-onboarding-selection-task.shop/todos",{
            headers: {
                Authorization: `Bearer ${access_token}`}
            })
        .then(res => {setTodoList(res.data);} )
        .catch(err => alert("오류 발생"))
    }
    const setUpdate = ()=>{
        setUpTodo(upTodo+1);
    }
    useEffect(()=>{
        getTodo();
    },[upTodo]);

    return(
        <div>
            <form onSubmit={todoAdd}>
                <input onChange={todoValue} type="text" value={todo} />
                <button>추가</button>
            </form>
            {todoList.length > 0 ? todoList.map(item => <TodoList key={item.id} id={item.id} todo={item.todo} completed={item.isCompleted} setUpdate={setUpdate} /> ) : <div>할 일 목록이 없습니다.</div>}
        </div>
    )
}

export default TodoInput;