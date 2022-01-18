import React, { useEffect, useState } from "react"
import * as CourseService from "../Services/CourseService"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './EnrollCourseManage.css'
import AppUtil from "../../util/AppUtil";

export default function EnrollCourseManage() {

    const [courses, setCourses] = useState([])

    useEffect(() =>{
        getCoursesEnrolled()
    },[])

    const getCoursesEnrolled =async  () =>{
        const response = await CourseService.getCoursesEnroll(AppUtil.getUsername())
        setCourses(response)
    }

    return (
        <div>
            <div className="manage_course">
                <TableContainer component={Paper}>
                    <Table className="course_table" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#dbdbdb' }}>
                                <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Class Name</TableCell>
                                <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Professor Name</TableCell>
                                <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Capacity</TableCell>
                                <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Description</TableCell>
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
                                        <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">{course.profName} </TableCell>
                                        <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">{course.capacity}</TableCell>
                                        <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">{course.description}</TableCell>
                                        <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">
                                        
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