import PrivatePage from "../components/page/private";
import _get         from 'lodash/get'
import styles       from "../styles/account/me.module.css";
import { connect }  from 'react-redux';

export class Chat extends PrivatePage{

  static async getInitialProps(ctx){      
    const token     = _get(ctx.store.getState(),"user.token",null);
    const id        = _get(ctx.store.getState(),"user.id",null);

    if(token){
      await ctx.store.dispatch(getLatestMessages({
        user: id
      }))
    }
    return {};
  }

  static mapStateToProps(store){
    const { user } = store;
    return {user};
  }
 
  render(){
    const { user } = this.props;

    return (
      <div className="chat">
      </div>
    );
  }
}

export default connect(Chat.mapStateToProps,Chat.mapDispatchToProps)(Chat);
