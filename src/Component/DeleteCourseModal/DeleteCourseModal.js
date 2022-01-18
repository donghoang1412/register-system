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
export default function DeleteCourseModal(props) {

    const {
        deleteCourseClick,
        setDeleteCourseClick,
        courseId,
        profId,
        setCourses
        
    } = props

    const classes = useStyles();

    const handleClose = () => {
        setDeleteCourseClick(false)
    }

    const deleteFunction = async () => {
        const response = await CourseService.deleteCourse(profId, courseId)
        setCourses(response.user.courses)
        setDeleteCourseClick(false)
    }
    

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={deleteCourseClick}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={deleteCourseClick}>
                    <div className={classes.paper}>
                        <h3> Do you wish to remove this course? </h3>
                        <Button variant="contained" color="primary" onClick={deleteFunction}> Yes </Button>
                        <span>{" "}</span>
                        <Button variant="contained" color="primary" onClick={handleClose}> No </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}