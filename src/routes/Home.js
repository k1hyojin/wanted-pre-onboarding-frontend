
import Login from "../components/Login";
import styles from "../style/App.module.scss";

function Home(){
   return(
    <div className={styles.loginContainer}>
        <Login />
    </div>
   )
}

export default Home;