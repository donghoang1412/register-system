import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import * as CourseService from "../Services/CourseService"


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
export default function EditCourse(props) {

    const {
        edit,
        setEdit,
        courseEdit
    } = props

    const classes = useStyles();

    const handleClose = () => {
        setEdit(false)
    }

    const [courseName, setCourseName] = useState(courseEdit.courseName)
    const [capacity, setCapacity] = useState(courseEdit.capacity)
    const [description, setDescription] = useState(courseEdit.description)

    const editFunction = () => {
        const editObj = {
            'id' : courseEdit.id,
            'courseName': courseName,
            'capacity': capacity,
            'description': description,
        }
        courseEditFunction(editObj)
    }

    const courseEditFunction = async (editObj) => {
        const response = CourseService.editCourse(editObj)
        console.log(response)
        setEdit(false)
    }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={edit}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={edit}>
                    <div className={classes.paper}>
                        <span style={{fontSize:'larger',fontWeight:'500'}}><i class="fa fa-pencil"></i>  Course's Information: </span>
                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField
                                placeholder="Course's Name"
                                variant="outlined"
                                label="Course's Name"
                                value={courseName}
                                onChange={event => {
                                    const value = event.target.value;
                                    setCourseName(value)
                                }}
                            />

                            <TextField
                                placeholder="Capacity"
                                variant="outlined"
                                label="Capacity"
                                value={capacity}
                                onChange={event => {
                                    const value = event.target.value;
                                    setCapacity(value)
                                }}
                            />
                            
                            <TextField
                                placeholder="Description"
                                variant="outlined"
                                label="Description"
                                value={description}
                                onChange={event => {
                                    const value = event.target.value;
                                    setDescription(value)
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