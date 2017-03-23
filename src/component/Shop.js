import React from 'react';
import axios from "axios";

class Shop extends React.Component {
  constructor(){
    super();
    this.state={
      name:"",
      shopName:[],
      allSort:[],
      newName:[],
      spname: "",
      summary: "",
      price:0,
      id:"",
      shopId:""
    }
  }
  handleSubmit(){
    let data ={name : this.refs.name.value}
    console.log(this.refs.name.value);
    axios.post("http://api.duopingshidai.com/category", data)
    .then((res) =>{
      let item = this.refs.name.value
      console.log(res.data.category.name)
      this.setState({shopName:[...this.state.shopName,<li Key = {Math.random()}>{item}</li>]})
    })
  }
  handleGet(){
    axios.get("http://api.duopingshidai.com/category")
    .then(res=>{
      this.setState({allSort:res.data.categories})
    })
  }
  myFiindIndex(_id){
    return this.state.allSort.findIndex(item => item._id===_id);
  }
  handleRemove(_id){
    console.log(_id);
    axios.delete(`http://api.duopingshidai.com/category?id=${_id}`)
    .then(res=>{
      console.log(res);
      let index = this.myFiindIndex(_id);
      this.state.allSort.splice(index,1);
      this.setState({allSort:this.state.allSort})
    })
  }
  handleAdd(){
    let newShop = {
      name: this.state.spname,
      summary: this.state.summary,
      price: this.state.price,
      poster:"http://localhost:3000/shop",
      category:this.state.id
    }
    axios.post("http://api.duopingshidai.com/product/new",newShop)
    .then(res=>{
      console.log(res);
        this.setState({newName:[...this.state.newName,<li Key = {Math.random()}>{this.state.spname}</li>]})
        this.setState({shopId:res.data.product._id});
        console.log(this.state.shopId);
    })
  }
  handleInput1(e){
    this.setState({spname:e.target.value})
  }
  handleInput2(e){
    this.setState({summary:e.target.value})
  }
  handleInput3(e){
    this.setState({price:e.target.value})
  }
  handleInput4(e){
    this.setState({id:e.target.value})
  }
  handleId(_id){
    console.log(_id);
  }
  handleMessage(){
      axios.get(`http://api.duopingshidai.com/product/detail/${this.state.shopId}`)
      .then(res =>{
        console.log(res);
      })
  }
  render () {
    console.log(this.state.spname);
    return(
      <div>
        <input type = "text" ref="name"/>
        <ul>{this.state.shopName}</ul>
        <button onClick = {this.handleSubmit.bind(this)}>加入商品库</button><br/>
        <button onClick = {this.handleGet.bind(this)}>查看商品分类</button>
        <ul>
          {this.state.allSort.map(item =>(<li Key={Math.random()} className="Li">{item.name}
          <br/><label>商品名称</label><input type = "text" onChange = {this.handleInput1.bind(this)}/><br/>
          <label>商品简介</label><input type = "text" onChange = {this.handleInput2.bind(this)}/><br/>
          <label>商品价格</label><input type = "text" onChange = {this.handleInput3.bind(this)}/><br/>
          <label>商品类ID</label><input type = "text" onChange = {this.handleInput4.bind(this)}/><br/>
          <button onClick = {this.handleId.bind(this,item._id)}>商品类ID</button>
          <button onClick = {this.handleAdd.bind(this)}>添加</button>
          <ul><button onClick = {this.handleMessage.bind(this)}>详细信息</button>{this.state.newName}</ul>
          <button onClick = {this.handleRemove.bind(this,item._id)}>删除</button></li>))}
        </ul>
      </div>
    )
  }
}

export default Shop;
