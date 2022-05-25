import PrivatePage from "../../../components/page/private";
import { signOut } from 'next-auth/react'
import _get from 'lodash/get'
import styles from "../../../styles/account/me.module.css";
import { connect }  from 'react-redux';

export class AccountMe extends PrivatePage{

  static mapStateToProps(store){
    const { user } = store;
    return {user};
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
                  <p className={styles.bioUsuario}>Descripcion</p>
                  <ul className={styles.listaPerfil}>
                    <li>35 Seguidores</li>
                    <li>7 Seguidos</li>
                    <li>32 Publicaciones</li>
                  </ul>
              </div>
              <div className={styles.opcionesPerfil}>
                <button type="">Cambiar portada</button>
                <button type=""><i className={styles.herramienta}></i></button>
                <button onClick={() => signOut({ callbackUrl: _get(this.router.getRoute('login'), 'href')})}>Sign Out</button>
              </div>
            </div>
            <div className={styles.menuPerfil}>
              <ul>
                <li><a href="#" title=""><i className={styles.iconoPerfil}></i> Publicaciones</a></li>
                <li><a href="#" title=""><i className={styles.iconoPerfil}></i> Informacion</a></li>
                <li><a href="#" title=""><i className={styles.iconoPerfil}></i> Amigos 43</a></li>
                <li><a href="#" title=""><i className={styles.iconoPerfil}></i> Fotos</a></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(AccountMe.mapStateToProps,null)(AccountMe);
