import { Grid } from "@material-ui/core"
import React, { useState } from "react"
import { useHistory } from "react-router";
import schoolLogo from "../../images/eschoolLogo.jpg"
import AppUtil from "../../util/AppUtil";
import "./SignIn.css"
const SignIn = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState(true)

    const history = useHistory();

    const goToSignUpPage = (event) => {
        history.push({
            pathname: "/signUp",
        });
    }

    const signIn = async () =>{
        const signInObj = {
            "username" : username,
            "password" : password
        }
        const api = "http://localhost:8383/authenticate"
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signInObj)
        }).then(res => res.json())
            .then(resJson => {
                setStatus(true)
                return resJson
            })
            .catch(err => {
                setStatus(false)
            })
        AppUtil.setJwtToken(response.jwt)
        AppUtil.setUsername(response.username)
        AppUtil.setRole(response.roles[0])
        if(response.roles[0] === "ROLE_ADMIN")
            gotoAdminPage()
        else if(response.roles[0] === "ROLE_STUDENT")
            gotoStudentPage()
        else if(response.roles[0] === "ROLE_PROFESSOR")
            gotoProfessorPage()
    }

    const gotoAdminPage = () => {
        history.push({
            pathname: "/admin",
        });
    }

    const gotoStudentPage = () =>{
        history.push({
            pathname: "/enroll"
        })
    }

    
    const gotoProfessorPage = () =>{
        history.push({
            pathname: "/professor"
        })
    }

    



    return (
        <div>
            <Grid container className="grid">
                <Grid >
                    <div className="signUp_component">
                        <div className="login_component">
                            <img alt="" className="login_logo" src={schoolLogo} width="180px" height="100px"/>
                            <div className="sign_in">
                                <input className="sign_in_input" type="text" placeholder="UserName" onChange={(event) =>{
                                    setUsername(event.target.value)
                                }}></input>
                                <input className="sign_in_input" type="password" placeholder="Password" onChange={(event) =>{
                                    setPassword(event.target.value)
                                }}></input>
                                {!status ? <div className="wrong_credentials"> Wrong credentials </div> : ""}
                                <button className="login_button" onClick={signIn}>Log In</button>
                            </div>
                            
                            {/* There will be one functionality to reset the password for user if he/she forgets */}
                            <div className="forgot_password">
                                Forgot Password?
                            </div>
                        </div>
                        <div className="signup_component">
                            Don't have an account? <span onClick={() => goToSignUpPage()}>Sign up</span>
                        </div>

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default SignIn;