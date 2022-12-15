# 원티드 프리온보딩 프론트엔드 사전과제

### ✔️ 기술 스택 : React, react-router , sass , axios  
### [배포 웹페이지 바로가기⚡️](https://k1hyojin.github.io/wanted-pre-onboarding-frontend)
<br>

### 프로젝트 실행방법
```
 $ npm install
 $ npm run serve
```

## 라우팅
로그인페이지와 회원가입페이지를 분리했습니다.
```
function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
          <Route path={"/todo" }element={<Todo />}/>
          <Route path={"/join"} element={<Join />}/>
          <Route path={`/`} element={<Home />} />
      </Routes>
  </Router>
  )
}
```

## 로그인

```
 useEffect(()=>{
        auth === null ? navigate('/') : navigate('/todo');
    },[])
```
로컬스토리지에 토큰값이 없을 경우에 `/` 로 있을 경우엔 `/`로 리다이렉트 됩니다.

  <br>

## 회원가입
```
axios.post(`${APIURL}/auth/signup`, body)
     .then(res => { alert("회원가입이 완료되었습니다."); navigate('/') })
     .catch(err => alert('이미 있거나 옳지않은 아이디와 비밀번호입니다. 다시 입력해주세요.'))
```
navigate를 이용해 회원가입 완료 후 로그인페이지로 리다이렉트하게 설정했습니다.


<br>

## Todo
```
 useEffect(()=>{
        auth === null ? navigate('/') : navigate('/todo');
    },[])
```
로그인과 마찬가지로 토큰값이 없으면 `/todo`로 이동할 수 없고 토큰값이 있다면 바로 `/todo`로 이동합니다.
## CRUD

### CREATE
```
const todoAdd = (event)=>{
        event.preventDefault();
        axios.post(`${APIURL}/todos`, body,{
            headers: {
                Authorization: `Bearer ${access_token}`}
            })
        .then(res => setUpTodo(!upTodo) )
        .catch(err => alert("오류 발생"))
        setTodo('');
    }
```
`axios`를 이용해 `authoriziation` 설정해서 투두리스트를 추가합니다.
추가 후에는 입력창을 비우도록 설정했습니다.

<br>

### READ

```
const getTodo = ()=>{
        axios.get(`${APIURL}/todos`,{
            headers: {
                Authorization: `Bearer ${access_token}`}
            })
        .then(res => {setTodoList(res.data);} )
        .catch(err => alert("오류 발생"))
    }
    

useEffect(()=>{
        getTodo();
},[upTodo]);
```
`axios`로 데이터를 받아온 후 응답 값을 `.map`을 이용해 컴포넌트로 전달합니다.
데이터가 추가되거나 변경될 때마다 새로운 값을 불러옵니다.
 <br>

### UPDATE

```
const updateChange = ()=>{
        setUpdateTodo(updateTodo +1);
        axios.put(`${APIURL}/todos/${id}`,body2,{
            headers: {
                Authorization: `Bearer ${access_token}`}
            })
        .then(res => setUpdate(updateTodo) )
        .catch(err => alert('오류 발생!'));
        setEdit(!edit);
        
    }
```
`edit` 값을 `boolean` 으로 설정 후 `수정` 버튼을 클릭할 때 마다 수정이 가능하게 했습니다.
api 와 통신시에 부모로부터 받은 `upTodo` 값을 갱신하여 `getTodo()`를 실행합니다.

 <br>
 
 ### DELETE

```
 const deleteList = ()=>{
        axios.delete(`${APIURL}/todos/${id}`,{
            headers: {
                Authorization: `Bearer ${access_token}`}
            })
        .then(res => setUpdate(updateTodo) )
        .catch(err => alert('오류 발생!'));
    }
```
`axios`를 이용해 객체를 삭제합니다.
 <br>
