import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
import React from 'react'
import { HashRouter as Router, Route, Link} from 'react-router-dom'
import axios from 'axios'
var moment = require('moment')
import Subheader from 'material-ui/Subheader'
require('./App.css')
import AppBar from 'material-ui/AppBar'
//flat btn
import FlatButton from 'material-ui/FlatButton'
//card
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
//FAB
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
//menu
import Paper from 'material-ui/Paper'
import MenuBar from 'material-ui/Menu'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import Dialog from 'material-ui/Dialog'
//chart
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Sector} from 'recharts'
import RaisedButton from 'material-ui/RaisedButton'
//from
import TextField from 'material-ui/TextField'
//data picker
import DatePicker from 'material-ui/DatePicker'
//List
import {List, ListItem} from 'material-ui/List'
import SelectField from 'material-ui/SelectField'
//Table
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table'
//websocket
// import io from 'socket.io-client'
// const socket = io('http://localhost:1234',{
//   "transports":['websocket', 'polling']
// })
var socket = new WebSocket('ws://localhost:3000')
if(socket.readyState === 3){
	history.go(0) 
}

class Intro extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render(){
		return(
			<div>
				<Card>
			    <CardTitle title="上不去网怎么办"/>
			    <CardText className="cardBGC">
			      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
			      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
			      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
			    </CardText>
			  </Card>
			  <Card>
			    <CardTitle title="如何连接打印机"/>
			    <CardText className="cardBGC">
			      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
			      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
			      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
			    </CardText>
			  </Card>
			  <Card>
			    <CardTitle title="上网认证不好用了怎么办"/>
			    <CardText className="cardBGC">
			      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
			      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
			      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
			    </CardText>
			  </Card>
			  <Card>
			    <CardTitle title="如何重置网络服务"/>
			    <CardText className="cardBGC">
			      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
			      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
			      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
			    </CardText>
			  </Card>
			</div>
			)
	}
}

class Menu extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	user: this.props.user
	  };
	}

	componentDidMount(){

		
	}

	_logout(){
		var that = this
		axios.get('/api/u/logout')
		.then(function(res){
			if(res.data.logout){
				that.props.hasLogged()
			} else{
				that.refs.logoutFailedAlert.handleOpen()
			}
		})
		.catch(function(err){
			console.log(err)
		})
	}

	render(){
		return(
			<div>
				<IconMenu  
			    iconButtonElement={<FlatButton label={'欢迎您，'+ this.state.user.name} labelStyle={{color: 'white'}} style={{margin: '6px'}}/>}
			    targetOrigin={{horizontal: 'right', vertical: 'top'}}
			    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			  >
			    <MenuItem primaryText={this.state.user.department}/>
			    <MenuItem primaryText={this.state.user.phoneNum} />
		     	<Divider />
			    <MenuItem primaryText="登出" onTouchTap={this._logout.bind(this)}/>
			  </IconMenu>
			  <Alert cont={'登出失败！请重试！'} ref='logoutFailedAlert'/>
			</div>
		)
	}
}

const Footer = () => (
	<div className='footer'>
		Powered By WUDI@2017
	</div>
)

const FooterP = () => (
	<div className='footerp'>
		Powered By WUDI@2017
	</div>
)

class SimpleBarChart extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		  data:[]
	  }
	}

	componentDidMount(){
		var that = this
		axios.get('/api/order/info/')
	  .then(function (response) {
	    if(response.data){
	    	that.setState({data: response.data.data})
	    }
	  })
	  .catch(function (error) {
	    console.log(error)
	  })	
	}

	render() {
  	return (
    	<BarChart width={document.body.clientWidth-250} height={500} data={this.state.data}>
	      <XAxis dataKey="name"/>
	      <YAxis/>
	      <CartesianGrid strokeDasharray="3 3"/>
	      <Tooltip/>
	      <Legend />
	      <Bar dataKey="工单数" fill="#8884d8" minPointSize={5}/>
      </BarChart>
    )
  }
}

class Barchart extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data : []
		}
	}

	componentDidMount(){
		var that = this
		axios.get('/api/order/infomore/')
	  .then(function (response) {
	    if(response.data.data){
	    	//console.log(response.data.data)
	    	that.setState({data: response.data.data})
	    }
	  })
	  .catch(function (error) {
	    console.log(error)
	  })	
	}

	render() {
  	return (
  		<div className='BarchartContainer'>
  			{
  				this.state.data.length > 0
  				?<div >
  					<PieChart width={document.body.clientWidth-250} height={300} >
			        <Pie data={this.state.data} cx="30%" cy="40%" outerRadius={60} fill="#8884d8"/>
			        <Pie data={this.state.data} cx="30%" cy="40%" innerRadius={70} outerRadius={90} fill="#82ca9d" label/>
			      </PieChart>
			      <div>	
					    <List className='ListBar'>
					    	{
					    		this.state.data.map((row, index) => (<ListItem key={index} primaryText={row.name +':'+ row.value}/>))
					    	}
					    </List> 
					  </div>
  				</div>
  				:null
  			}
		  </div>
    )
  }
}

class Alert extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	open: false
	  };
	}

	handleClose = () => {
    this.setState({open: false})
    if(this.props.dis){
    	 window.location.hash = this.props.dis
    }
  }
  
  handleOpen = () => {
    this.setState({open: true})
  }

	render(){
		const actions = [
      <FlatButton label="Ok" primary={true} keyboardFocused={true} onTouchTap={this.handleClose}/>
    ]

    return (
    	<Dialog
        actions={actions}
        modal={true}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        {this.props.cont}
      </Dialog>
    )
	}
}

class Login extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
  		employeeID: '',
	  	code: ''
	  };
	}

	_onLogin(){
		this.props.changeLog()
	}

	_submit(){
		var that = this
		if(!this.state.employeeID || !this.state.code){
			this.refs.loginAlert.handleOpen()
			return false
		}
		axios.post('/api/u/login', {
			employeeID: this.state.employeeID,
			code: this.state.code
		})
		.then(function (response) {
			if(response.data.user){
				//console.log(response.data.user)
				that.props.hasLogged(response.data.user)
			}else{
				that.refs.loginFailedAlert.handleOpen()
			}
	  })
	  .catch(function (error) {
	    console.log(error)
	  })
	}

	render(){
		return (
			<div className='login' style={{marginTop: '1px'}}>
				<img className='img' src='https://res.cloudinary.com/dnfhsjz8u/image/upload/v1489974989/logo_wnfbdo.jpg'/>
				<div>LRTV运维中心</div>
				<TextField hintText="员工号" value={this.state.employeeID} onChange={(e) => {this.setState({employeeID: e.target.value})}}/>
				<TextField hintText="密码" value={this.state.code} type="password" onChange={(e) => {this.setState({code: e.target.value})}}/>
				<RaisedButton label="登录" primary={true} className='Loginbtn' onTouchTap={this._submit.bind(this)}/>
				<div className='Loginbtn1' onTouchTap={this._onLogin.bind(this)}>尚未注册？</div>
				<Footer/>
				<Alert cont={'您有未填的项！'} ref='loginAlert'/>
				<Alert cont={'登录失败！请重试！'} ref='loginFailedAlert'/>
			</div>
		)
	}
}

const items = [
  <MenuItem key={1} value={1} primaryText="新闻中心" />,
  <MenuItem key={2} value={2} primaryText="网络中心" />,
  <MenuItem key={3} value={3} primaryText="技术中心" />,
  <MenuItem key={4} value={4} primaryText="人力资源" />,
  <MenuItem key={5} value={5} primaryText="综考办" />,
]

class Signup extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	step: 0,
	  	name: '',
	  	employeeID: '',
	  	code: '',
	  	phoneNum: '',
	  	address: '',
	  	department: '',
	  	value: ''
	  };
	}

	_onLogin(){
		this.props.changeLog()
	}

	_next(){
		var that = this
		if(!this.state.employeeID || !this.state.name || !this.state.code){
			this.refs.signupAlert.handleOpen()
			return
		}
		axios.get('/api/u/validity', {
	    params: {
	      employeeID: that.state.employeeID
	    }
	  })
	  .then(function (response) {
	    if(response.data.user){
	    	alert('您已注册，请直接登录！忘记密码可联系23186872！')
	    	that.props.changeLog()
	    } else {
	    	that.setState({step : 1})
	    }
	  })
	  .catch(function (error) {
	    console.log(error)
	  })	
	}

	_submit(){
		var that = this
		if(!this.state.phoneNum || !this.state.address || !this.state.department){
			this.refs.signupAlert.handleOpen()
			return
		}
		axios.post('/api/u/signup', {
	    name: this.state.name,
	  	employeeID: this.state.employeeID,
	  	code: this.state.code,
	  	phoneNum: this.state.phoneNum,
	  	address: this.state.address,
	  	department: this.state.department
	  })
	  .then(function (response) {
	    //console.log(response.data.user)
	    if(response.data.user){
	    	that.props.hasLogged(response.data.user)
	    } else{
	    	that.refs.signupFailedAlert.handleOpen()
	    }
	  })
	  .catch(function (error) {
	    console.log(error)
	  })
		
	}

	render(){
		return (
			<div className='login' style={{marginTop: '1px'}}>
				<img className='img' src='https://res.cloudinary.com/dnfhsjz8u/image/upload/v1489974989/logo_wnfbdo.jpg'/>
				<div>LRTV运维中心</div>
				{
					this.state.step === 0
					? <div className='login'>
							<TextField hintText="员工号" value={this.state.employeeID} onChange={(e) => {this.setState({employeeID: e.target.value})}}/>
							<TextField hintText="姓名" value={this.state.name} onChange={(e) => {this.setState({name: e.target.value})}}/>
							<TextField hintText="密码" value={this.state.code} type="password" onChange={(e) => {this.setState({code: e.target.value})}}/>
						</div>
					: <div className='login'>
							<TextField hintText="办公地点" value={this.state.address} onChange={(e) => {this.setState({address: e.target.value})}}/>
							<SelectField hintText="部门" value={this.state.value} onChange={(e, index, value) => {this.setState({department: e.target.innerHTML, value: value})}}>{items}</SelectField>
							<TextField hintText="联系方式" value={this.state.phoneNum} onChange={(e) => {this.setState({phoneNum: e.target.value})}}/>
						</div>
				}	
				{this.state.step === 0
				?<RaisedButton label="下一步" primary={true} className='Loginbtn' onTouchTap={this._next.bind(this)}/>
				:<RaisedButton label="注册" primary={true} className='Loginbtn' onTouchTap={this._submit.bind(this)}/>
				}
				<div className='Loginbtn1' onTouchTap={this._onLogin.bind(this)}>已有账号，立即登录！</div>
				<Footer/>
				<Alert cont={'您有未填的项！'} ref='signupAlert'/>
				<Alert cont={'注册失败！请重试！'} ref='signupFailedAlert'/>
			</div>
		)
	}
}

class Submit extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	open: false,
	  	request: ''
	  }
	}

	handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  submit(){
  	var that = this
  	if(!this.state.request){
			this.refs.loginAlert.handleOpen()
			return false
		}
		axios.post('api/order/post', {
			request: this.state.request
		})
		.then(function (response) {
			if(response.data.success){
				that.refs.SubmitAlert.handleOpen()
				that.handleClose()
				that.setState({request: ''})
			}
	  })
	  .catch(function (error) {
	    console.log(error)
	  })
  }

	render(){
		const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="提交"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submit.bind(this)}
      />,
    ]

    return (
      <div>
        <Dialog
          title="请填写您的问题或您的需求"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          multiLine={true}
        >
          <TextField
			      hintText="上不去网/网线10米"
			      floatingLabelText="上不去网/网线10米"
			      value={this.state.request}
			      onChange={(e) => {this.setState({request: e.target.value})}}
			      fullWidth={true}
			    />
        </Dialog>
        <Alert cont={'您有未填的项！'} ref='loginAlert'/>
        <Alert cont={'提交成功！'} ref='SubmitAlert'/>
      </div>
    )

	}
}

class UserTableList extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	fixedHeader: true,
      fixedFooter: false,
      stripedRows: true,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      users: [],
      loading: true,
      title: ''
	  };
	}

	componentDidMount(){
		cache.data = []
    cache.page = 1
    cache.totalLength = 0
    cache.totalPage = 0
    cache.previous = true
    cache.next = false
    this.mounted = true
		this._fetch(1)
		//document.addEventListener('scroll', this._fetchMore.bind(this))
	}

	componentWillUnmount(){
		this.mounted = false
		//document.removeEventListener('scroll', () => console.log('ok'))
	}

	_fetchMore(){
		//console.log(getScrollHeight() - getScrollTop() - getClientHeight())
		if((getScrollHeight() - getScrollTop() - getClientHeight()) <=20 && !this.state.loading){
			if(cache.totalLength > cache.data.length) {
      	this._fetch(cache.page)
    	} 
		}
	}

	_fetch(page){
		var that = this
		if(this.mounted){
			this.setState({loading: true})
		}
		axios.get('http://localhost:8080/api/user/list',{
			params: {
	      id: that.props.match.params.id,
	      page:page
	    }
		})
		.then(function (response) {
			if(response.data.users){
				cache.totalLength = response.data.usersTotal.length
				cache.totalPage = Math.ceil(cache.totalLength / 14)
				if(cache.page === (Math.ceil(cache.totalLength / 14))){
					cache.next = true
					//console.log('rr')
				}
				//cache.data = cache.data.slice().concat(response.data.users)
				if(that.mounted){
					//that.setState({users: cache.data, title: response.data.title, loading: false})
					that.setState({users: response.data.users, title: response.data.title, loading: false})
				}
        //cache.page++
			}
	  })
	  .catch(function (error) {
	    console.log(error)
	  })
	}

	_previous(){
		cache.page--
		console.log(cache.page)
		if (cache.page === 1){
			cache.previous = true
		}
		if (cache.page < cache.totalPage){
			cache.next = false
		}
		this._fetch(cache.page)
	}

	_next(){
		cache.page++
		console.log(cache.page)
		if (cache.page > 1){
			cache.previous = false
		}
		if (cache.page === cache.totalPage){
			cache.next = true
		}
		this._fetch(cache.page)
	}

	render(){
		return (
			<div>
				<Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
                {this.state.title}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Department</TableHeaderColumn>
              <TableHeaderColumn>employeeID</TableHeaderColumn>
              <TableHeaderColumn>Detail</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {
            	this.state.users.map( (row, index) => (
              <TableRow key={row._id}>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.department}</TableRowColumn>
                <TableRowColumn>{row.employeeID}</TableRowColumn>
                <TableRowColumn>{<Link to={{pathname: '/user/'+row._id}}><FlatButton label="详细资料" secondary={true}/></Link>}</TableRowColumn>
              </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <div className='btnContainer'>
        	<RaisedButton label="上一页" disabled={cache.previous} primary={true} onTouchTap={this.	_previous.bind(this)}/>
        	<RaisedButton label="下一页" disabled={cache.next} primary={true} onTouchTap={this._next.bind(this)}/>
        </div>
        <Footer/>
			</div>
		)
	}
}

class userDetail extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	user: ''
	  };
	}

	componentDidMount(){
		var that = this
		axios.get('/api/u/validity', {
	    params: {
	      id: that.props.match.params.id
	    }
	  })
	  .then(function(response){
	  	if(response.data.user){
	  		that.setState({user: response.data.user})
	  	}
	  })
	  .catch(function (error) {
	    console.log(error)
	  })
	}

	_authorize(){
		var that = this
		axios.get('/api/admin/authorize', {
	    params: {
	      id: that.state.user._id
	    }
	  })
	  .then(function(response){
	  	if(response.data.user.role === 50){
	  		that.setState({
	  			user: response.data.user
	  		})
	  		that.refs.auAlert.handleOpen()
	  	}
	  })
	  .catch(function (error) {
	    console.log(error)
	  })
	}

	render(){
		return (
			<div className='person' style={{width: (document.body.clientWidth-250)}}>
				<div className='person1'>
					<Subheader style={{textAlign: 'center'}}>用户信息</Subheader>
					<Divider />
					<List>
			      <ListItem primaryText={"姓名："+ this.state.user.name}  />
			      <ListItem primaryText={"工号："+ this.state.user.employeeID} />
			      <ListItem primaryText={"部门："+ this.state.user.department} />
			      <ListItem primaryText={"办公地址："+ this.state.user.address} />
			      <ListItem primaryText={"联系电话："+ this.state.user.phoneNum} />
			    </List>
			    <div>
			    {
			    	this.state.user.role === 0
			   		?<div>
			   			<RaisedButton label="升级为管理员" fullWidth={true} primary={true} onTouchTap={this._authorize.bind(this)}/>
			   		</div>
			    	:null
			    }
			    </div>
			    <Alert cont={'变更权限成功！'} ref='auAlert' dis='#/u/2'/>
			    
				</div>
			</div>
		)
	}
}

class orderDetail extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	user: '',
	  	order: '',
	  	response: ''
	  };
	}
	//{getScrollHeight() > getClientHeight() ? <FooterP/> : <Footer/> }
	componentDidMount(){
		var that = this
		axios.get('/api/order/detail', {
	    params: {
	      id: that.props.match.params.id
	    }
	  })
	  .then(function(response){
	  	if(response.data.user && response.data.order){
	  		that.setState({
	  			user: response.data.user,
	  			order: response.data.order
	  		})
	  		//console.log(that.state.user)
	  		//console.log(that.state.order)
	  	}else {

	  		window.location.hash = '#/a/1'
	  	}
	  })
	  .catch(function (error) {
	    console.log(error)
	  })
	}

	_finish(){
		var that = this
		if(!this.state.response){
			this.refs.loginAlert.handleOpen()
			return false
		}
		axios.post('/api/order/finish', {
			response: that.state.response,
			orderId: that.state.order._id
		})
		.then(function(response){
			if(response.data.success){
				that.refs.finishAlert.handleOpen()
			}
		})
		.catch(function (error) {
	    console.log(error)
	  })
	}

	render(){
		let order = this.state.order
		let user = this.state.user
		return (
			<div className='person' style={{width: (document.body.clientWidth-250)}}>
				<div className='person1'>
					<Subheader style={{textAlign: 'center'}}>工单信息</Subheader>
					<Divider />
					<List>
			      <ListItem primaryText={"姓名："+user.name}/>
			      <ListItem primaryText={"工号："+user.employeeID}/>
			      <ListItem primaryText={"部门："+user.department}/>
			      <ListItem primaryText={"联系电话："+user.phoneNum} />
			      <ListItem primaryText={"地址："+user.address}/>
			    </List>
			    <Divider />
					<List>
						{
							this.state.order?<ListItem primaryText={"提交时间："+moment(order.meta.createAt).format('YYYY-MM-DD HH:mm:ss') }/>:null
						}
			      <ListItem primaryText={"需求："+order.request}/>
			    </List>
			    <Divider />
			    <div>
			    {
			    	order.completedorNot === 0
			    	?<div>
			    		<TextField
					      hintText="请填写问题处理过程！"
					      floatingLabelText="请填写问题处理过程！"
					      value={this.state.response}
					      onChange={(e) => {this.setState({response: e.target.value})}}
					      fullWidth={true}
					    />
					    <RaisedButton label="完成维修" fullWidth={true} secondary={true} onTouchTap={this._finish.bind(this)}/>
					    <Footer/>
					    <Alert cont={'完成维修'} ref='finishAlert' dis='#/a/1'/>
					    <Alert cont={'您有未填的项！'} ref='loginAlert'/>
			    	</div>
			    	:<div>
			    		<List>
			    		{
			    			this.state.order?<ListItem primaryText={"处理时间："+ moment(order.meta.updateAt).format('YYYY-MM-DD HH:mm:ss') }/>:null
			    		}
					      <ListItem primaryText={"处理意见："+order.response }/>
					      <ListItem primaryText={"处理人："+order.serviceguy}/>
					    </List>
					    <Divider />
					    <Footer/>
			    	</div>
			    }
			    </div>
				</div>
			</div>
		)
	}
}
//获取滚动条高度
function getScrollTop(){
	var scrollTop=0
  if(document.documentElement&&document.documentElement.scrollTop)
  {
      scrollTop=document.documentElement.scrollTop
  }
  else if(document.body)
  {
      scrollTop=document.body.scrollTop
  }
  return scrollTop
}
//获取视窗高度
function getClientHeight(){    
  var clientHeight=0
  if(document.body.clientHeight&&document.documentElement.clientHeight){    
      var clientHeight=(document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight            
  }else{    
      var clientHeight=(document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight       
  }    
  return clientHeight
}
//获取文档内容实际高度
function getScrollHeight(){    
  return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);   
} 

let cache = {
  data: [],
  page: 1,
  totalLength: 0,
  id: null
}

class OrderTableList extends React.Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	fixedHeader: true,
      fixedFooter: false,
      stripedRows: true,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      orders: [],
      loading: false,
      title: ''
	  }
	}

	componentWillMount(){

	}

	componentDidMount(){
		const that = this
		cache.data = []
    cache.page = 1
    cache.totalLength = 0
    cache.totalPage = 0
    cache.previous = true
    cache.next = false
    this.mounted = true
		this._fetch(1)
		socket.addEventListener('message', function (event) {
			console.log('Message from server ', event.data)
			if(event.data){

			}
		})
		//document.addEventListener('scroll', this._fetchMore.bind(this))
	}

	componentWillUnmount(){
		this.mounted = false
		//document.removeEventListener('scroll', () => console.log('ok'))
	}

	_fetchMore(){
		//console.log(getScrollHeight() - getScrollTop() - getClientHeight())
		if((getScrollHeight() - getScrollTop() - getClientHeight()) <= 20 && !this.state.loading){
			if(cache.totalLength > cache.data.length) {
      	this._fetch(cache.page)
    	} 
		}
	}

	_reflash(){
		
	}

	_fetch(page){
		var that = this
		if(this.mounted){
			this.setState({loading: true})
		}
		axios.get('http://localhost:8080/api/orderlist',{
			params: {
	      id: that.props.match.params.id,
	      page:page
	    }
		})
		.then(function (response) {
			if(response.data.orders){
				cache.totalLength = response.data.ordersTotal.length
				cache.totalPage = Math.ceil(cache.totalLength / 14)
				if(cache.page === (Math.ceil(cache.totalLength / 14))){
					cache.next = true
					//console.log('rr')
				}
				//cache.data = cache.data.slice().concat(response.data.orders)
				if(that.mounted){
					//that.setState({orders: cache.data, title: response.data.title, loading: false})
					that.setState({orders: response.data.orders, title: response.data.title, loading: false})
				}
        //cache.page++
        //console.log(cache.page, cache.totalPage)
			}
	  })
	  .catch(function (error) {
	    console.log(error)
	  })
	}

	_previous(){
		cache.page--
		console.log(cache.page)
		if (cache.page === 1){
			cache.previous = true
		}
		if (cache.page < cache.totalPage){
			cache.next = false
		}
		this._fetch(cache.page)
	}

	_next(){
		cache.page++
		console.log(cache.page)
		if (cache.page > 1){
			cache.previous = false
		}
		if (cache.page === cache.totalPage){
			cache.next = true
		}
		this._fetch(cache.page)
	}

	render(){
		//console.log('total', cache.totalLength)
		return (
			<div>
				<Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
               	{this.state.title}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>时间</TableHeaderColumn>
              <TableHeaderColumn>姓名</TableHeaderColumn>
              <TableHeaderColumn>详细资料</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.orders.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{moment(row.meta.createAt).format('YYYY-MM-DD HH:mm:ss')}</TableRowColumn>
                <TableRowColumn>{row.user.name}</TableRowColumn>
                <TableRowColumn>{<Link to={{pathname: '/order/'+row._id}}><FlatButton label="详细资料" secondary={true}/></Link>}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className='btnContainer'>
        	<RaisedButton label="上一页" disabled={cache.previous} primary={true} onTouchTap={this.	_previous.bind(this)}/>
        	<RaisedButton label="下一页" disabled={cache.next} primary={true} onTouchTap={this._next.bind(this)}/>
        </div>
			</div>
		)
	}
}

class Super extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render(){
       // {getScrollHeight() > getClientHeight() ? <Footer/> : <FooterP/> }
		//console.log(getScrollHeight() , getClientHeight())
		return(
			<div className='SuperContainer'>
	    	<div className='SuperTitle1'>七日工单数</div>
    		<SimpleBarChart/>		
  	  	<div className='SuperTitle1'>本月工单部门占比</div>
    		<Barchart/>
    		{getScrollHeight() > getClientHeight() ? <FooterP/> : <Footer/> }
	  	</div>
		)
	}
}

const styleMenu = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
  width: '112px'
};

class TopListBar extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	equel: true
	  };
	}

	componentDidMount(){
		const that = this
		console.log(socket.readyState)
		socket.addEventListener('message', function (event) {
			console.log('Message from server ', event.data)
			if(event.data){
				that._reload()
			}
		})
		//document.addEventListener('scroll', this._fetchMore.bind(this))
	}

	_reload(){
		this.setState({
			equel: false
		})
	}

	_relink(){
		this.setState({
			equel: true
		})
		if(window.location.hash === '#/a/1'){
			history.go(0) 
		} else {
			window.location.hash = '#/a/1'
		}
	}

	render() {
		return (
			<div className='menulist'>
		    <Paper style={styleMenu}>
		      <MenuBar>
		        <Link to='/' className='link'><MenuItem primaryText="统计图表" /></Link>
		        <Divider />
		        <Link to='/a/1' className='link'><MenuItem primaryText="未完成" /></Link>
		        <Link to='/b/2' className='link'><MenuItem primaryText="今日已完成" /></Link>
		        <Link to='/c/3' className='link'><MenuItem primaryText="全部已完成" /></Link>
		        <Divider />
		        <Link to='/u/1' className='link'><MenuItem primaryText="普通用户" /></Link>
		        <Link to='/i/2' className='link'><MenuItem primaryText="高级用户" /></Link>
		      </MenuBar>
		    </Paper>
		    { !this.state.equel 
		    	? <RaisedButton style={{width: '112px'}} label="有新的工单" onTouchTap={this._relink.bind(this)} secondary={true}/>
		    	: null}
		  </div>
		)
	}
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
    	logged: false,
    	signup: false,
    	user: null
    };
  }

  componentDidMount(){
  	let user = JSON.parse(window.localStorage.getItem("user"))
  	let date = JSON.parse(window.localStorage.getItem("date"))
  	let date1 = parseInt(date)

  	let dateNow = new Date()
  	let dateNow1 = dateNow.getTime()

  	if(window.location.hash != '#/'){
  		window.location.hash = '#/'
  	}

  	if(!user){
  		return
  	}

  	let valid = 10 * 60 * 60 * 1000
  	if(dateNow1 - date1 > valid){
			return
  	}
  		
		if(user){
			this.setState({
				logged: true,
				user: JSON.parse(window.localStorage.getItem("user"))
			})
		}
	}

  changeLog(){
  	this.setState({signup: !this.state.signup})
  }

  hasLogged(obj){
  	if(obj){
  		let date = new Date()
  		let date1 = date.getTime()
  		window.localStorage.setItem('user', JSON.stringify(obj))
  		window.localStorage.setItem('date', JSON.stringify(date1))
  		
  		this.setState({
	  		user: obj,
	  		logged: true
	  	})
  	} else {
  		window.localStorage.clear()
  		this.setState({
	  		user: obj,
	  		logged: false,
	  		signup: false
	  	})
  	}
  }

  touchFab(){
  	this.refs.submit.handleOpen()
  }

  handleTouchTap(){
  	 window.location.hash = '#/'
  }

  // _enter(){
  // 	console.log('888')
  // }

  render() {
    return (
  		<div >
	    	{!this.state.logged ?
	    		<div>
	    			{
	    				this.state.signup 
	    				? <Signup changeLog={this.changeLog.bind(this)} hasLogged={this.hasLogged.bind(this)}/> 
	    				:<Login changeLog={this.changeLog.bind(this)} hasLogged={this.hasLogged.bind(this)}/>
	    			}
    			</div>
	    	:<div>
	    		<AppBar 
	    			title={<span style={{cursor: 'pointer'}}>LRTV运维中心</span>}
	    			iconClassNameLeft='fhggfh'
	    			onTitleTouchTap={this.handleTouchTap.bind(this)}
	    			iconElementRight={<Menu user={this.state.user} 
	    			hasLogged={this.hasLogged.bind(this)}/>} 
	    		/>
	    		{this.state.user.role === 0 ?
	    			<div>
		    			<Intro/> 
			    		<FloatingActionButton className='FAB' secondary={true}>
					      <ContentAdd onTouchTap={this.touchFab.bind(this)}/>
					    </FloatingActionButton>
					    <Submit ref='submit'/>
				    </div>
			    : <div className='container'>
					    <Router>
			      		<div style={{marginLeft: '10px'}}><TopListBar/></div>
			      	</Router>
					    <Router>
				    		<div>
							    <Route exact path="/" component={Super}/>
						      <Route path="/a/:id" component={OrderTableList}/>
						      <Route path="/b/:id" component={OrderTableList}/>
						      <Route path="/c/:id" component={OrderTableList}/>
						      <Route path="/u/:id" component={UserTableList}/>
						      <Route path="/i/:id" component={UserTableList}/>
						      <Route path='/user/:id' component={userDetail}/>
						      <Route path='/order/:id' component={orderDetail}/>
					      </div>
					  	</Router>
				  	</div>
			  	}
	    	</div>
	    	}
	    </div>
    )
  }
}
