import React from "react"
import { useState } from "react";
import { Grid } from "@material-ui/core"
import { useHistory } from "react-router";
import schoolLogo from "../../images/eschoolLogo.jpg"
import * as UserService from "../Services/UserServices"
import "./SignUp.css"

const SignUp = (props) => {

    const history = useHistory();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const goToSignInPage = () => {
        history.push({
            pathname: "/signIn",
        });
    }

    const signUpFunction = async () =>{
        const userObj = {
            "firstName" : firstName,
            "lastName" : lastName,
            "username" : username,
            "password" : password,
            "role" : {
                "name" : "ROLE_STUDENT"
            }
        }
        const response = await UserService.saveStudent(userObj)
        console.log(response.status)
        if(response === undefined) {
            alert("Server is not responding!")
        }
        else if(response.status === "successful"){
            history.push({
                pathname: "/signIn",
            });
        }
        else {
            alert("This username's already exists!")
        }
    }

    return (
        <div>
            <Grid container className="grid">

                <Grid >
                    <div className="signUp_component">
                        <div className="signUp">
                            <img alt="" className="login_logo" src={schoolLogo} width="180px" height="100px" />
                            <p className="text_below_schoolLogo">Sign up to see your courses </p>

                            <div className="sign_in_component">
                                <input className="sign_in_input" type="text" placeholder="First Name" onChange={(event) => {
                                    setFirstName(event.target.value)
                                }}></input>
                                <input className="sign_in_input" type="text" placeholder="Last Name" onChange={(event) =>{
                                    setLastName(event.target.value)
                                }}></input>
                                <input className="sign_in_input" type="text" placeholder="Username" onChange={(event) => {
                                    setUsername(event.target.value)
                                }}></input>
                                <input className="sign_in_input" type="password" placeholder="Password" onChange={(event) =>{
                                    setPassword(event.target.value)
                                }}></input>
                                

                                <button className="login_button" onClick={signUpFunction}>Sign Up</button>
                            </div>
                            <div className="term_service">
                                By signing up, you agree to our <span>Terms , Data Policy</span> and <span>Cookies Policy</span> .
                            </div>
                        </div>
                        <div className="signup_component">
                            Have an account? <span onClick={() => { goToSignInPage() }}>Sign in</span>
                        </div>

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default SignUp;