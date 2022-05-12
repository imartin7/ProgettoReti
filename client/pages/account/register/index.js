import PublicPage   from "../../../components/page/public";
import styles       from "../../../styles/account/form.module.css";
import Link         from "next/link";
import { connect }  from 'react-redux';
import _get         from 'lodash/get';
import { register } from '../../../store/actions/user/register';

export class Register extends PublicPage{

  static mapDispatchToProps = { register };

  state = {
    passwdValidation: true
  }

  handleRegister = (event) => {
    event.preventDefault();
    const { register } = this.props;
    const form = _get(event, 'target');
    const name = _get(form, '[0].value');
    const lastname = _get(form, '[1].value');
    const username = _get(form, '[2].value');
    const password = _get(form, '[3].value');
    const passwordConfirm = _get(form, '[4].value');
    const email = _get(form, '[5].value');

    if(password !== passwordConfirm){
      this.setState({passwdValidation: false})
    }else{
      this.setState({passwdValidation: true})
      register(this.context, {
        name,
        lastname,
        username,
        email,
        password
      })
    }
  }

  render(){
    const {passwdValidation} = this.state;
    return (
      <div className={styles.formContainer}>
        <form className={styles.formBlock} onSubmit={this.handleRegister}>
          <h2>Register Here</h2>

          <label>Name</label>
          <input name="name" type="text" placeholder="Enter name"/>

          <label>Lastname</label>
          <input name="lastname" type="text" placeholder="Enter lastname"/>
        
          <label>Username</label>
          <input name="username" type="text" placeholder="Enter username"/>

          <label>Password</label>
          <input name="password" type="password" placeholder="Enter password"/>

          <label>Confirm password</label>
          <input name="passwordConfirm" type="password" placeholder="Confirm password"/>
          {!passwdValidation && <span className={styles.error}>Passwords must match</span>}

          <label>Email</label>
          <input name="email" type="email" placeholder="Enter email"/>

          <input type="submit" value="Sign Up"></input>
          <Link {...this.router.getRoute('login')}>
            <a href="#">Already have an account?</a>
          </Link>
        </form>
      </div>
    );
  }
}

export default connect(null,Register.mapDispatchToProps)(Register);