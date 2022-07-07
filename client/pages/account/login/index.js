import PublicPage from "../../../components/page/public";
import styles     from "../../../styles/account/form.module.css";
import Link       from "next/link";
import _map       from 'lodash/map'
import _get       from 'lodash/get'
import { connect }    from 'react-redux';
import { login }      from '../../../store/actions/user/login';
import {SUCCESS_CODE} from '../../../settings/api';
import { signIn, getProviders } from 'next-auth/react'
import { setCookie }  from 'nookies'
import nookies        from 'nookies'


export class Login extends PublicPage{

  static async getInitialProps(ctx){
    const publicPageProps = await super.getInitialProps(ctx);
    const cookies = nookies.get(ctx);
    const token   = _get(cookies, 'token');
    const nextAuthToken = _get(cookies, 'next-auth.session-token');

    if (!!token || !!nextAuthToken) {
      ctx.router.redirect('myAccount',ctx,{});
    }
    
    return {
      ...publicPageProps, token, nextAuthToken
    }
  }

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
      setCookie(null, 'token', _get(response, 'data.token'), { path: '/' });
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
          <form className={styles.flexDisplay} onSubmit={this.handleLogin}>
            <img className={styles.logo} src={"/assets/logo/logo.png"} alt="Logo"/>
      
            <label>Email</label>
            <input name="email" type="email" placeholder="Enter email"/><br />
            <label>Password</label>
            <input name="password" type="password" placeholder="Enter password"/><br/>
            <input type="submit" value="Log In"/>
            <Link {...this.router.getRoute('register')}>
              <a href="#">Dont have an account?</a>
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