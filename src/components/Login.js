import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Login.scss';
import { signup, login } from '../actions/auth';
import {FormattedMessage, FormattedDate, injectIntl} from 'react-intl';

export class Login extends React.Component {


  constructor(props) {
    super(props);
    this.state={
    	role:"user"
    }
    this.getEmail = this.getEmail.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.getName = this.getName.bind(this);
    this.renderSignupForm = this.renderSignupForm.bind(this);
    this.getCheckbox = this.getCheckbox.bind(this);
  }

  	getCheckbox(event){
  		let inputCheckbox = event.target.checked;
  		//console.log(inputCheckbox);

  		if(inputCheckbox){
  			this.setState({
  				role: "agent"
  			});
  		}
  		else{
  			this.setState({
  				role: "user"
  			});
  		}
  		
  	}

	getEmail(event){
		const inputEmail= event.target.value.trim();
		this.setState({
			email: inputEmail
		});
	}

	getPassword(event){
		let inputPassword= event.target.value.trim();
		this.setState({
			password: inputPassword
		});
	}

	getName(event){
		let inputName= event.target.value.trim();
		this.setState({
			name: inputName
		});
	}

	handleSubmit(event) {
		const {login, signup} = this.props;
		event.preventDefault();
		if(this.state.name) return signup(this.state);
		else return login(this.state);
	}

	renderSignupForm(){
		return(
			<div className="row">
					<div className="input-field col s12">
						<input id="Name" type="text" className="validate" onChange={this.getName}></input>
						<label htmlFor="Username">
							<FormattedMessage id="app.login.name" />
						</label>
					</div>
			</div>
		);
	}

	componentDidMount(){
		const {pathname} = this.props.location;
		if(pathname === "/login" ){
			this.setState({
				color:"#cc1818"
			})
		} else{
			this.setState({
				color:"#185392"
			})
		};
	}


  render() {
		const {formatMessage} = this.props.intl;
		const {pathname} = this.props.location;
		const headerTitle = formatMessage({id: pathname === "/signup" ? 'app.login.header2' : 'app.login.header1'});
    	const signBtnTitle = formatMessage({id: pathname === "/signup" ? 'app.login.signupBtn' : 'app.login.loginBtn'});
		return (
			<div className="container center-align themeContainer" >

				<div className="container">
					<h4>Are you an <b>Agent</b>?</h4>
				    <p>
				      <input type="checkbox" id="checkboxForm" onChange={this.getCheckbox}/>
				      <label htmlFor="checkboxForm">Yes!</label>
				    </p>
				    <hr/>
				</div>
				
				<div className="container buttonContainer">
					<h4>{signBtnTitle + ' with'}</h4>
					
					{ this.state.role === "user" && 
						<div>
							<div className="loginButton">
								<a href='/auth/google' className="waves-effect waves-light btn-large social google col s12">
									<i className="fa fa-google"></i> {signBtnTitle} with google
								</a>							
							</div>
							<div className="loginButton">
							<a href='/auth/facebook' className="waves-effect waves-light btn-large social facebook col s12">
								<i className="fa fa-facebook"></i> {signBtnTitle} with facebook
							</a>
							</div>
							<div className="loginButton">
								<a href='/auth/twitter' className="waves-effect waves-light btn-large social twitter col s12">
									<i className="fa fa-twitter"></i> {signBtnTitle} with twitter
								</a>
							</div>
						</div>
					}

					{ this.state.role === "agent" && 
						<div>
							<div className="loginButton">
								<a href='/auth/google/agent' className="waves-effect waves-light btn-large social google col s12">
									<i className="fa fa-google"></i> {signBtnTitle} with google
								</a>							
							</div>
							<div className="loginButton">
							<a href='/auth/facebook/agent' className="waves-effect waves-light btn-large social facebook col s12">
								<i className="fa fa-facebook"></i> {signBtnTitle} with facebook
							</a>
							</div>
							<div className="loginButton">
								<a href='/auth/twitter/agent' className="waves-effect waves-light btn-large social twitter col s12">
									<i className="fa fa-twitter"></i> {signBtnTitle} with twitter
								</a>
							</div>
						</div>
					}

					
				</div>
				<br/>
				<h5>or</h5>
				<br/>
				<h4>{ headerTitle }</h4>
				<form onSubmit={this.handleSubmit.bind(this)}>
					{pathname === "/signup" && this.renderSignupForm()}

					<div className="row">
						<div className="input-field col s12">
							<input id="Email" type="text" className="validate" onChange={this.getEmail}></input>
							<label htmlFor="Email">
							<FormattedMessage id="app.login.email" />
							</label>
						</div>
					</div>
					<div>
						<div className="row">
							<div className="input-field col s12">
								<input id="Password" type="password" className="validate" onChange={this.getPassword}></input>
								<label htmlFor="Password">
									<FormattedMessage id="app.login.password" />
								</label>
							</div>
						</div>
					</div>
					<button className="btn waves-effect waves-light themeButton" type="submit" name="action">
						{ signBtnTitle }
						<i className="material-icons right">send</i>
					</button>
				</form>
			</div>

    );
  }
}

export default injectIntl(connect(
  null,
	{ signup, login }
)(Login));


