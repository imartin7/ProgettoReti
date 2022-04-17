import PublicPage from "../../../components/page/public";
import styles from "../../../styles/account/form.module.css";

export class AccountMe extends PublicPage{
  render(){
    return (
      <div className={styles.formContainer}>
        <form className={styles.formBlock}>
          <img className={styles.logo} src={"/assets/logo/logo.png"} alt="Logo"/>
    
          <label>Username</label>
          <input name="username" type="text" placeholder="Enter username"/><br />
          <label>Password</label>
          <input name="password" type="password" placeholder="Enter password"/><br/>
          <input type="submit" value="Log In"/>

        </form>
      </div>
    );
  }
}

export default AccountMe;