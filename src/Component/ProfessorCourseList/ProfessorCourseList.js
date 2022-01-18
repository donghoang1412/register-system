import React, { useEffect, useState } from "react"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as CourseService from "../Services/CourseService"

import "./ProfessorCourseList.css"
import AppUtil from "../../util/AppUtil";
export default function ProfessorCourseList() {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        getCourses()
    }, [])

    const getCourses = async () => {
        const response = await CourseService.getCourseProfessorDisplay(AppUtil.getUsername())
        setCourses(response)
    }



    return (
        <div className="enroll">
            <h1 className="h1"> Courses: </h1>
            <div >
                <TableContainer component={Paper}>
                    <Table className="course_table" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#dbdbdb' }}>
                                <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Class Name</TableCell>
                                <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Capacity</TableCell>
                                <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Description</TableCell>
                                <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">List of Students</TableCell>

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
                                        <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">{course.description}</TableCell>
                                        <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">
                                            {course.studentNames.map((studentName, key) =>{

                                                return(
                                                    <div>
                                                        {key+1}. {studentName}
                                                    </div>
                                                )
                                            })}
                                        </TableCell>

                                    </TableRow>
                                )
                            })}
                        </TableBody> : ""}
                    </Table>
                </TableContainer>
            </div>
        </div>

    )
}