import PublicPage from "../../../components/page/public";
import styles from "../../../styles/account/form.module.css";

export class Register extends PublicPage{
  render(){
    return (
      <div className={styles.formContainer}>
        <form className={styles.formBlock}>
          <h2>Register Here</h2>

          <label>Name</label>
          <input name="name" type="text" placeholder="Enter name"/><br/>

          <label>Lastname</label>
          <input name="lastname" type="text" placeholder="Enter lastname"/><br/>
        
          <label>Username</label>
          <input name="username" type="text" placeholder="Enter username"/><br/>

          <label>Password</label>
          <input name="password" type="password" placeholder="Enter password"/><br/>

          <label>Confirm password</label>
          <input name="passwordConfirm" type="password" placeholder="Confirm password"/><br/>

          <label>Email</label>
          <input name="email" type="text" placeholder="Enter email"/><br/>

          <input type="submit" value="Sign Up"></input>
        </form>
      </div>
    );
  }
}

export default Register;