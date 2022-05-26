import PrivatePage from "../../../components/page/private";
import { signOut } from 'next-auth/react'
import { cleanUserData } from '../../../store/actions/user/base'
import _get         from 'lodash/get'
import styles       from "../../../styles/account/me.module.css";
import { connect }  from 'react-redux';
import cookie       from 'react-cookies';
import Link         from "next/link";

export class AccountMe extends PrivatePage{

  static mapStateToProps(store){
    const { user } = store;
    return {user};
  }

  static mapDispatchToProps = {
    cleanUserData
  }

  /**
   * Logs out user
   */
  handleSignout = () => {
    signOut({ callbackUrl: _get(this.router.getRoute('login'), 'href')})
    cookie.remove('token');
    this.props.cleanUserData()
  }

  render(){
    const { user } = this.props;

    return (
      <div className="account-me">
        <section className={styles.perfilUsuario}>
          <div className={styles.contenedorPerfil}>
            <div className={styles.portadaPerfil}>
              <div className={styles.sombra}></div>
                <div className={styles.avatarPerfil}>
                  <img className={styles.fondo} src={"/assets/logo/logo.png"} alt="img"/>
                  <a href="#" className={styles.cambiarFoto}>
                    <i className={styles.camera}></i> 
                    <span>Change Photo</span>
                  </a>
                </div>
                <div className={styles.datosPerfil}>
                  <h4 className={styles.tituloUsuario}>{_get(user,"username")}</h4>
              </div>
              <div className={styles.opcionesPerfil}>
                <button type=""><i className={styles.herramienta}></i></button>
                <button onClick={this.handleSignout}>Sign Out</button>
              </div>
            </div>
            <div className={styles.menuPerfil}>
              <ul>
                <li>
                  <Link {...this.router.getRoute('chat')}>
                    <a href="#"><i className={styles.iconoPerfil}></i> Chat</a>
                  </Link>
                  </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(AccountMe.mapStateToProps,AccountMe.mapDispatchToProps)(AccountMe);
