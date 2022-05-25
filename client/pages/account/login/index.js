import PublicPage from "../../../components/page/public";
import styles     from "../../../styles/account/form.module.css";
import Link       from "next/link";
import _map       from 'lodash/map'
import _get       from 'lodash/get'
import { connect }    from 'react-redux';
import { login }      from '../../../store/actions/user/login';
import {SUCCESS_CODE} from '../../../settings/api';
import { signIn, getProviders } from 'next-auth/react'
import cookie         from 'react-cookies';

export class Login extends PublicPage{

  static mapDispatchToProps = { login };

  state = {
    providers: {},
    error: null
  }

  componentDidMount = async () => {
    const providers = await getProviders();
    this.setState({providers})
  }

  logInNextAuth = (provider) => () => {
    signIn(provider, {
      callbackUrl: _get(this.router.getRoute('myAccount'), 'href'),
    })
  }

  /**
   * @method
   * User login handler
   * 
   * @param {Event} event with form data
   */
   handleLogin = async (event) => {
    event.preventDefault();

    const { login } = this.props;
    const form = _get(event, 'target');
    const email = _get(form, '[0].value');
    const password = _get(form, '[1].value');

    const response = await login(this.context, {
      email,
      password
    })


    if(_get(response, 'code') == SUCCESS_CODE){
      cookie.save('token', _get(response, 'data.token'));
      this.router.redirect('myAccount');
    }else{
      this.setState({error: _get(response, 'msg')})
    }
    
  }

  render(){
    const {providers,error} = this.state;

    return (
      <div className={styles.formContainer}>
        <div className={styles.formBlock}>
          <form onSubmit={this.handleLogin}>
            <img className={styles.logo} src={"/assets/logo/logo.png"} alt="Logo"/>
      
            <label>Email</label>
            <input name="email" type="email" placeholder="Enter email"/><br />
            <label>Password</label>
            <input name="password" type="password" placeholder="Enter password"/><br/>
            <input type="submit" value="Log In"/>
            <Link {...this.router.getRoute('register')}>
              <a href="#">Don't have an account?</a>
            </Link>
            {!!error && <span className={styles.errorMsg}>{error}</span>}
          </form>
          <div className={styles.providers}>
          { 
            _map(providers, (value, provider) => {
              return <button className={`${styles.authProvider} ${_get(styles, provider)}`} key={provider} onClick={this.logInNextAuth(provider)}>Sign in with {_get(value, 'name')}</button>
            })
          }    
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null,Login.mapDispatchToProps)(Login);