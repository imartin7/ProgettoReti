import PrivatePage from "../../../components/page/private";
import { signOut } from 'next-auth/react'
import { cleanUserData } from '../../../store/actions/user/base'
import _get         from 'lodash/get'
import styles       from "../../../styles/account/me.module.css";
import { connect }  from 'react-redux';
import Link         from "next/link";
import React        from "react";
import { storage }  from "../../../firebase.config";
import { getDownloadURL, ref, uploadBytes }      from "firebase/storage";
import { v4 }       from "uuid";
import { setLogo }  from "../../../store/actions/user/logo"
import { addUserImage }  from "../../../store/actions/user/addImage"
import Base         from "../../../components/layout/base";
import { destroyCookie }  from 'nookies'

export class AccountMe extends PrivatePage{

  inputRef = React.createRef();
  logoRef = React.createRef();

  static mapStateToProps(store){
    const { user } = store;
    return {user};
  }

  static mapDispatchToProps = {
    cleanUserData,
    setLogo, 
    addUserImage
  }

  /**
   * Logs out user
   */
  handleSignout = () => {
    signOut({ callbackUrl: _get(this.router.getRoute('login'), 'href')})
    destroyCookie(null, 'token');
    this.props.cleanUserData()
  }

  openFileUploader = (logo) => {
    const { current } = logo ? this.logoRef : this.inputRef;
    !!current && current.click();
  }

  selectLogo = async (event) => {
    const {user} = this.props;
    const upload = _get(event, 'target.files.[0]');
    if(!!upload){
      const imgRef = ref(storage, `users/${_get(user,'username')}/images/logo/${v4()}-${upload.name}`)
      await uploadBytes(imgRef, upload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
        const {user,setLogo} = this.props;
        setLogo(this.context, {
            id: _get(user, 'id'),
            url
          })
        })
      });
    }
  }

  selectImage = async (event) => {
    const {user} = this.props;
    const upload = _get(event, 'target.files.[0]');
    if(!!upload){
      const imgRef = ref(storage, `users/${_get(user,'username')}/images/feed/${v4()}-${upload.name}`)
      await uploadBytes(imgRef, upload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
        const {user,addUserImage} = this.props;
        addUserImage(this.context, {
            id: _get(user, 'id'),
            url
          })
        })
      });
    }
  }

  render(){
    const { user } = this.props;
    return (
      <Base className={styles.accountMe}>
        <div className={styles.contenedorPerfil}>
          <div className={styles.portadaPerfil}>
            <div className={styles.sombra}></div>
              <div className={styles.avatarPerfil}>
                <img className={styles.fondo} src={_get(user, 'image')} alt="img"/>
                <a onClick={() => this.openFileUploader(true)} className={styles.cambiarFoto}>
                  <input type="file" ref={this.logoRef} accept="image/*" hidden onChange={this.selectLogo}/>
                  <i className={styles.camera}></i> 
                  <span>Change Photo</span>
                </a>
              </div>
              <div className={styles.datosPerfil}>
                <h4 className={styles.tituloUsuario}>{_get(user,"username")}</h4>
            </div>
            <div className={styles.opcionesPerfil}>
              <button onClick={this.handleSignout}>Sign Out</button>
            </div>
          </div>
          <div className={styles.menuPerfil}>
            <ul>
              <li>
                <Link {...this.router.getRoute('chat')}>
                  <a><i className={styles.iconoPerfil}></i>Chat</a>
                </Link>
                </li>
            </ul>
          </div>
          <div className={styles.imagesContainer}>
            <div className={styles.imagesList}>
            
            </div>
            <div className={styles.addImages}>
              <a onClick={() => this.openFileUploader(false)}>
                  <input type="file" ref={this.inputRef} accept="image/*" hidden onChange={this.selectImage}/>
                  <i></i> 
                  <span>Change Photo</span>
                </a>
            </div>  
          </div>
        </div>
      </Base>
    );
  }
}

export default connect(AccountMe.mapStateToProps,AccountMe.mapDispatchToProps)(AccountMe);
