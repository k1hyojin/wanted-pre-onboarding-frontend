import SignIn from "../components/SignIn";
import styles from "../style/App.module.scss";

function Join(){
    return(
        <div className={styles.loginContainer}>
            <SignIn />
        </div>
    )
}

export default Join;