import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../style/App.module.scss";
import { Link } from "react-router-dom";
import APIURL from "../auth/apis";

function Login() {
    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [isActive, setIsActive] = useState(false);

    const onEmail = (event) => setUserEmail(event.target.value);
    const onPass = (event) => setUserPass(event.target.value);
    let body = { email: userEmail, password: userPass };
    const handleLoginBtn = () => { userEmail.includes('@') && userPass.length >=8 ? setIsActive(true) : setIsActive(false)}
    const navigate = useNavigate();
    const auth = localStorage.getItem('login');
    useEffect(()=>{
        auth === null ? navigate('/') : navigate('/todo');
    },[])

    const loginSubmit = (event) => {
        event.preventDefault();
        if(!userEmail.includes("@")){
            alert("올바른 이메일을 입력해주세요.");
        } else if (userPass.length < 8) {
            alert("비밀번호는 8자 이상 입력해주세요.");
            return false;
        } else {
            setIsActive(true);
            axios.post(`${APIURL}/auth/signin`, body)
                .then(res => {
                    localStorage.setItem('login', res.data.access_token);
                    navigate('/todo');
                })
                .catch(err => alert('로그인에 실패하셨습니다.'))
        }
    }
    useEffect(() => {
        handleLoginBtn();
        
    })
    return (
            <form onSubmit={loginSubmit}>
                <input onChange={onEmail} type="email" value={userEmail} />
                <input onChange={onPass} type="password" value={userPass} />
                <button className={styles.btn} disabled={!isActive}> 로그인 </button>
                <Link to="/join">회원가입</Link>
            </form>
    )
}
export default Login;