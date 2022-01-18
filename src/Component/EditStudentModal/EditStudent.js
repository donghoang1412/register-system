import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import * as UserService from "../Services/UserServices"


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '10px solid #fff'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        justifyContent: theme.center,
        width: '60%',
        textAlign: 'left',
        outlineColor: 'white'
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '95ch',
            position: 'relative'
        },

    },

}));
export default function EditStudent(props) {

    const {
        editStudent,
        setEditStudent,
        studentEdit
    } = props

    const classes = useStyles();

    const handleClose = () => {
        setEditStudent(false)
    }

    const [firstName, setFirstName] = useState(studentEdit.firstName)
    const [lastName, setLastName] = useState(studentEdit.lastName)

    const editFunction = () => {
        const editObj = {
            'id': studentEdit.id,
            'firstName': firstName,
            'lastName': lastName,
            'username': studentEdit.username,
        }
        studentEditFunction(editObj)
    }

    const studentEditFunction = async (editObj) => {
        const response = await UserService.editStudent(editObj)
        console.log(response)
        setEditStudent(false)
    }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={editStudent}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={editStudent}>
                    <div className={classes.paper}>
                        <span style={{ fontSize: 'larger', fontWeight: '500' }}><i class="fa fa-pencil"></i>  Student's Information: </span>
                        <form className={classes.form} noValidate autoComplete="off">
                            
                            <TextField
                                placeholder="First Name"
                                variant="outlined"
                                label="First Name"
                                value={firstName}
                                onChange={event => {
                                    const value = event.target.value;
                                    setFirstName(value)
                                }}
                            />

                            <TextField
                                placeholder="Last Name"
                                variant="outlined"
                                label="Last Name"
                                value={lastName}
                                onChange={event => {
                                    const value = event.target.value;
                                    setLastName(value)
                                }}
                            />


                        </form>

                        <Button variant="contained" color="primary" onClick={() => editFunction()}> Edit</Button>

                    </div>
                </Fade>
            </Modal>
        </div>
    )
}