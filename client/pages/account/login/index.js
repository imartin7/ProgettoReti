import PublicPage from "../../../components/page/public";
import styles from "../../../styles/account/form.module.css";
import Link   from "next/link";
import _map   from 'lodash/map'
import _get   from 'lodash/get'
import { signIn, getProviders } from 'next-auth/react'
export class Login extends PublicPage{

  state = {
    providers: {}
  }

  componentDidMount = async () => {
    const providers = await getProviders();
    this.setState({providers})
  }

  render(){
    const {providers} = this.state;

    return (
      <div className={styles.formContainer}>
        <div className={styles.formBlock}>
          <form>
            <img className={styles.logo} src={"/assets/logo/logo.png"} alt="Logo"/>
      
            <label>Username</label>
            <input name="username" type="text" placeholder="Enter username"/><br />
            <label>Password</label>
            <input name="password" type="password" placeholder="Enter password"/><br/>
            <input type="submit" value="Log In"/>
            <Link {...this.router.getRoute('register')}>
              <a href="#">Don't have an account?</a>
            </Link>
          </form>
          <div className={styles.providers}>
          { 
            _map(providers, (value, provider) => {
              return <button className={`${styles.authProvider} ${_get(styles, provider)}`} key={provider} onClick={() => 
              signIn(provider, {
                callbackUrl: _get(this.router.getRoute('myAccount'), 'href'),
              })}>Sign in with {_get(value, 'name')}</button>
            })
          }    
          </div>
        </div>
      </div>
    );
  }
}

export default Login;