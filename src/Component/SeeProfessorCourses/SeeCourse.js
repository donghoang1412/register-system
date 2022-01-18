import React, { useState, useEffect } from "react"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as CourseService from "../Services/CourseService"
import { AiFillEdit } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";

import { Button } from "@material-ui/core"
import './SeeCourse.css'
import EditCourse from "../EditCourseModal/EditCourse";
import AddCourseModal from "../AddCourseModal/AddCourseModal";
import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";
export default function SeeCourse(props) {

    const { professor } = props
    const [courses, setCourses] = useState([])
    const [courseDisplayClick, setCourseDisplayClick] = useState(false)
    const [edit, setEdit] = useState(false)
    const [courseEdit, setCourseEdit] = useState({})
    const [addCourseClick, setAddCourseClick] = useState(false)
    const [deleteCourseClick, setDeleteCourseClick] = useState(false)
    const [courseId, setCourseId] = useState("")

    useEffect(() => {
        getCoursesByProf()
    }, [])

    const getCoursesByProf = async () => {
        const response = await CourseService.getCoursesByProfessor(professor.id)
        setCourses(response)
    }

    const displayCourses = () => {
        setCourseDisplayClick(!courseDisplayClick)
    }

    const editCourse = (course) => () => {
        setCourseEdit(course)
        setEdit(true)
    }

    const addCourseFunction = () => {
        setAddCourseClick(true)
    }

    const deleteCourseFunction = (courseId) => () =>{
        setCourseId(courseId)
        setDeleteCourseClick(true)
    }

    return (
        <div className="see-course">
            <div>
                <TableContainer component={Paper}>
                    <Table className="course_table" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, 'height': '50px' }}
                            >
                                <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center"></TableCell>
                                <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center"></TableCell>
                                <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center"> </TableCell>
                                <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="left">
                                    <span className="see-courses" onClick={displayCourses}>See Courses</span>
                                </TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                {courseDisplayClick ?
                    <>
                        <TableContainer component={Paper}>
                            <Table className="course_table" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow style={{ backgroundColor: '#dbdbdb' }}>
                                        <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Course </TableCell>
                                        <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Capacity</TableCell>
                                        <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Description</TableCell>
                                        <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center"></TableCell>
                                        <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center"></TableCell>

                                    </TableRow>
                                </TableHead>

                                {courses.length > 0 ? <TableBody>
                                    {courses.map((course, key) => {
                                        return (
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, 'height': '50px' }}
                                            >
                                                <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">{course.courseName}</TableCell>
                                                <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">{course.capacity}</TableCell>
                                                <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">{course.description} </TableCell>
                                                <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">
                                                    <AiFillEdit className="edit" onClick={editCourse(course)} />
                                                </TableCell>
                                                <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">
                                                    <FiDelete className="edit" onClick={deleteCourseFunction(course.id)} />
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })}
                                </TableBody> : <div style={{ marginLeft: 20 }}> <h3>There is no course! Wanna add?</h3></div>}


                            </Table>
                        </TableContainer>
                        <div style={{ marginTop: 5 }}>
                            <Button variant="contained" color="primary" onClick={addCourseFunction}> Add Course</Button>
                        </div>
                        {edit ?
                            <EditCourse
                                edit={edit}
                                setEdit={setEdit}
                                courseEdit={courseEdit}
                            />
                            : ""}
                        {addCourseClick ?
                            <AddCourseModal
                                addCourseClick={addCourseClick}
                                setAddCourseClick={setAddCourseClick}
                                professorId = {professor.id}
                                courses = {courses}
                                setCourses ={setCourses}
                            />
                            : ""}
                        {deleteCourseClick ? 
                            <DeleteCourseModal 
                                deleteCourseClick = {deleteCourseClick}
                                setDeleteCourseClick = {setDeleteCourseClick}
                                courseId={courseId}
                                profId = {professor.id}
                                setCourses={setCourses}
                            />
                        :""}
                    </>
                    : ""}
            </div>
        </div>
    )
}