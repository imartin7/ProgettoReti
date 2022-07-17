import PrivatePage from "../components/page/private";
import _get         from 'lodash/get'
import { connect }  from 'react-redux';
import styles       from  '../styles/chat.module.css'
import Base         from "../components/layout/base";
import Link       from "next/link";
import { sendUserMessage }   from "../store/actions/user/chat";

export class Chat extends PrivatePage{

  static async getInitialProps(ctx){      
    /* const token     = _get(ctx.store.getState(),"user.token",null);
    const id        = _get(ctx.store.getState(),"user.id",null);

    if(token){
      await ctx.store.dispatch(getLatestMessages({
        user: id
      }))
    } */
    return {};
  }
  
  static mapDispatchToProps = {
    sendUserMessage
  }

  static mapStateToProps(store){
    const { user } = store;
    return {user};
  }

  sendMessage = () => {
    const { sendUserMessage } = this.props;
    sendUserMessage(this.context);
  }

 
  render(){
    const { user } = this.props;

    return (
      <Base>
        <div className={styles.chatContainer}>
          <div className={styles.userBox}>
            <div className={styles.avatarPerfil}>
              <img className={styles.fondo} src={_get(user, 'image')} alt="img"/>
            </div>
            <div className={styles.userData}>
              <span className={styles.datosPerfil}>{_get(user,"username")} </span>
              <Link {...this.router.getRoute('myAccount')}>
                <a className={styles.myAcc}>My account</a>
              </Link>
            </div>
          </div>
          <div className={styles.chatBox}>
            <div className={styles.heading}></div>
            <div className={styles.messageBox}>

            </div>
            <div className={styles.messageInput}>
              <input type="text" className={styles.message}/>
              <button className={styles.sendBtn} onClick={this.sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </Base>
    );
  }
}

export default connect(Chat.mapStateToProps,Chat.mapDispatchToProps)(Chat);
