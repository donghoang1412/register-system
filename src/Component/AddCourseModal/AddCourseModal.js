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
export default function AddCourseModal(props) {

    const {
        addCourseClick,
        setAddCourseClick,
        professorId, 
        courses,
        setCourses
    } = props

    const classes = useStyles();

    const handleClose = () => {
        setAddCourseClick(false)
    }

    const [courseName, setCourseName] = useState("")
    const [capacity, setCapacity] = useState("")
    const [description, setDescription] = useState("")

    const addCourseFunc = async () =>{
        const courseObj = {
            "courseName" : courseName,
            "capacity" : capacity,
            "description" : description
        }
        const response = await CourseService.saveCourse(courseObj, professorId)
        console.log(response)
        setCourses(response.user.courses)
        setAddCourseClick(false)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={addCourseClick}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={addCourseClick}>
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
                       
                        <Button variant="contained" color="primary" onClick={addCourseFunc}> Submit</Button>

                    </div>
                </Fade>
            </Modal>
        </div>
    )
}