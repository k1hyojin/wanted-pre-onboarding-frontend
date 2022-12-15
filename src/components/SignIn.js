import { useEffect, useState } from 'react';
import axios from "axios";
import styles from "../style/App.module.scss";
import { useNavigate } from 'react-router-dom';
import APIURL from "../auth/apis";

function SignIn() {
    const [Email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    const [isActive, setIsActive] = useState(false);

    const onEmail = (event) => setEmail(event.target.value);
    const onPass = (event) => setPass(event.target.value);
    let body = { email: Email, password: Pass };
    const handleLoginBtn = () => { Email.includes('@') && Pass.length >= 8 ? setIsActive(true) : setIsActive(false) }
    const navigate = useNavigate();

    const loginSubmit = (event) => {
        event.preventDefault();
        if (!Email.includes("@")) {
            alert("올바른 이메일을 입력해주세요.");
            return false;
        } else if (Pass.length < 8) {
            alert("비밀번호는 8자 이상 입력해주세요.");
            return false;
        } else {
            setIsActive(true);
            axios.post(`${APIURL}/auth/signup`, body)
                .then(res => { alert("회원가입이 완료되었습니다."); navigate('/') })
                .catch(err => alert('이미 있거나 옳지않은 아이디와 비밀번호입니다. 다시 입력해주세요.'))
        }
    }
    useEffect(() => {
        handleLoginBtn();
    })
    return (
        <form onSubmit={loginSubmit}>
            <input onChange={onEmail} type="email" value={Email} placeholder="'@'을 포함한 이메일을 입력해주세요." />
            <input onChange={onPass} type="password" value={Pass} placeholder="비밀번호는 8자 이상 입력해주세요." />
            <button className={styles.btn} disabled={!isActive}> 회원가입하기 </button>
        </form>
    )
}

export default SignIn;