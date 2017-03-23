
import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import axios from "axios";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import AccountCircle from "material-ui/svg-icons/action/account-circle";
import Snackbar from 'material-ui/Snackbar';
import {Link} from "react-router";

class Header extends React.Component{
  constructor(){
    super();
    this.state={
      open: false ,     //登录注册的开关
      action:"signin", //登录注册表单的选项
      username:"",      //表单用户名的value
      password:"",      //表单密码的value
      isLogin:false,    //是否登录的状态
      user:"",          //登录后后台返回的用户名
      userId:"",        //登录后后台返回的userid
      openMenu:false,   //登录后右上角弹出式菜单的开关
      snackBar:false    //登出时弹出的提示框开关
    }
  }

  componentWillMount(){
      if(localStorage.user && localStorage.user){
        this.setState({isLogin:true,user:localStorage.user,userId:localStorage.userId})
      }
  }


  handleClose(){
    this.setState({
      open: false
    })
  }
  handleOpen(){
    this.setState({
      open: true
    })
  }
  handleUsername(e,username){
    this.setState({username:username.trim()});
  }
  handlePassword(e,password){
    this.setState({password:password.trim()});
  }
  handleSubmit(){
    let data = {username:this.state.username,password:this.state.password};
    axios.post(`http://api.duopingshidai.com/user/${this.state.action}`, data)
    .then(res =>{
      this.setState({open:false,isLogin:true,user:res.data.user,userId:res.data.userId})
      localStorage.setItem("user",res.data.user);
      localStorage.setItem("userId",res.data.userId);
    })
    .catch(err=>{
      if(err.response){
        alert(err.response.data.msg)
      }else{
        console.log("Error",err);
      }
    })
  }
  handleOnRequestChange(value){
    this.setState({
      openMenu: value,
    })
  }
  handleMenuItem(e,child){
    console.log("yin");
    if (child.props.value === "3") this.logout()
  }
  logout(){
    axios.get("http://api.duopingshidai.com/user/logout")
    .then(res => {
      this.setState({isLogin:false,user:"",userId:"",snackBar:true})
      localStorage.user = "";
      localStorage.userId = "";
    })
  }
  render(){
    const actions = [
      <FlatButton
        label="返回"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="确认"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
    ];
    let rightIcon = this.state.isLogin ?
    <IconMenu
       iconButtonElement={<IconButton><AccountCircle/></IconButton>}
       anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
       targetOrigin={{horizontal: 'right', vertical: 'top'}}
       open={this.state.openMenu}
       onRequestChange={this.handleOnRequestChange.bind(this)}
       onItemTouchTap={this.handleMenuItem.bind(this)}
       >

       <MenuItem value="1" primaryText={<p><b>{`欢迎 ${this.state.user}`}</b></p>} />
       <MenuItem value="2" primaryText="个人资料" />
       <MenuItem value="3" primaryText="退出登录"/>
    </IconMenu> :
    <FlatButton label="登录/注册" onTouchTap = {this.handleOpen.bind(this)}/>
    return(
      <div>
        <AppBar
          title="这么粗的大棒子"
          iconElementLeft={<IconButton><ActionHome /></IconButton>}
          iconElementRight={rightIcon}
        />
        <Dialog
          title="用户表单"
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}

          >
          {<FlatButton label="登录" primary = {this.state.action=="signin" ? true : false}
            onTouchTap={() => this.setState({action:"signin"})}/>}
          {<FlatButton label="注册" primary = {this.state.action=="signup" ? true : false}
            onTouchTap={() => this.setState({action:"signup"})}/>}<br/>
            <TextField hintText="username" onChange = {this.handleUsername.bind(this)}/><br />
            <TextField hintText="password" type = "password" onChange = {this.handlePassword.bind(this)}/><br />
        </Dialog>

        <Snackbar
            open={this.state.snackBar}
            message="成功退出登录"
            autoHideDuration={2000}
            onRequestClose={() => this.setState({snackBar:false})}
            bodyStyle={{textAlign:"center"}}
        />
      </div>
    )
  }
}

export default Header;
