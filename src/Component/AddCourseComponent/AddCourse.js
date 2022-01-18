import React, { useEffect, useState  } from "react"
import { Button, TextField } from "@material-ui/core"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AiFillEdit } from "react-icons/ai";
import * as CourseService from "../Services/CourseService"
import * as UserService from "../Services/UserServices"
import { useHistory } from "react-router";
import './AddCourse.css'
import SeeCourse from "../SeeProfessorCourses/SeeCourse";
import AppUtil from "../../util/AppUtil";
import EditStudent from "../EditStudentModal/EditStudent";

export default function AddCourse() {

    const history = useHistory()
    const [profFirstName, setProfFirstName] = useState("")
    const [profLastName, setProfLastName] = useState("")
    const [profUsername, setProfUsername] = useState("")
    const [profPassword, setProfessorPassword] = useState("")
    const [courses, setCourses] = useState([])
    const [searchProf, setSearchProf] = useState("")
    const [searchStudent, setSearchStudent] = useState("")
    const [students, setStudents] = useState([])
    const [professors, setProfessors] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [editStudent, setEditStudent] = useState(false)
    const [studentEdit, setStudentEdit] = useState({})

    const setFirstLastName = async () =>{
        const response = await UserService.getUserFirstNameAndLastName(AppUtil.getUsername())
        setFirstName(response.firstName)
        setLastName(response.lastName)
    }

    useEffect(() => {
        getCourses()
        getStudent()
        getProfessors()
        setFirstLastName()
    }, [])

    //call the back end to get all courses
    const getCourses = async () => {
        const response = await CourseService.getCourseService()
        setCourses(response)
    }

    const getProfessors = async () => {
        const response = await UserService.getAllProfessors()
        setProfessors(response)
    }

    //call backend apis to search for courses by name
    const searchProfessors = async (value) => {
        const response = await UserService.getProfessorByFirstNameContains(value)
        setProfessors(response)
    }

    //call backend apis to search for courses by name
    const searchStudents = async (value) => {
        const response = await UserService.getUserByUsernameContains(value)
        setStudents(response)
    }

    const saveProfessor = async () => {
        const userObj = {
            "firstName": profFirstName,
            "lastName": profLastName,
            "username": profUsername,
            "password": profPassword,
            "role": {
                "name": "ROLE_PROFESSOR"
            }
        }
        const response = await UserService.saveProfessor(userObj)
        setProfessors(response)
        const newProfessor = response.user
        setProfessors([...professors, newProfessor])
    }

    const getStudent = async () => {
        const response = await UserService.getAllStudents()
        setStudents(response)
    }

    const editStudentFunction = (student) => () =>{
        setStudentEdit(student)
        setEditStudent(true)
    }

    const signOutFunction = () =>{
        localStorage.clear()
        history.push({
            pathname : "/signIn"
        })
    }

    return (
        <div className="page">
            <div className="header"> 
                <Button disable >Hi, {firstName} {lastName}</Button>
                <Button  className="sign-out-button" variant="contained" color="primary" onClick={signOutFunction}>Sign Out</Button>
            </div>
            <div className="add_course">
                <h1> Add Professors</h1>
                <div className="form">
                    <TextField
                        className="add_field"
                        placeholder="Professor First Name"
                        variant="outlined"
                        onChange={event => {
                            const value = event.target.value;
                            setProfFirstName(value)
                        }}
                    />
                    <div className="divider"></div>
                    <TextField
                        className="add_field"
                        placeholder="Professor Last Name"
                        variant="outlined"
                        onChange={event => {
                            const value = event.target.value;
                            setProfLastName(value)
                        }}
                    />
                    <div className="divider"></div>
                    <TextField
                        className="add_field"
                        placeholder="Professor Username"
                        variant="outlined"
                        onChange={event => {
                            const value = event.target.value;
                            setProfUsername(value)
                        }}
                    />
                    <div className="divider"></div>
                    <TextField
                        className="add_field"
                        placeholder="Professor Password"
                        variant="outlined"
                        onChange={event => {
                            const value = event.target.value;
                            setProfessorPassword(value)
                        }}
                    />
                    <div className="divider"></div>
                </div>
                <div className="submit_button">
                    <Button variant="contained" color="primary" onClick={saveProfessor}> Submit</Button>
                </div>

            </div>
            <div className="list_course">
                <h1> List of Professors</h1>
                <div className="search_bar">
                    <TextField
                        placeholder="Search by First Name"
                        variant="outlined"
                        value={searchProf}
                        onChange={event => {
                            const value = event.target.value;
                            searchProfessors(value)
                            setSearchProf(value)
                        }}
                    />
                </div>
                <div className="table">
                    <TableContainer component={Paper}>
                        <Table className="course_table" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#dbdbdb' }}>
                                    <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Professor's ID</TableCell>
                                    <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">First Name</TableCell>
                                    <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Last Name</TableCell>
                                    <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Details</TableCell>

                                </TableRow>
                            </TableHead>

                            {professors.length > 0 ? <>
                                {professors.map((professor, key) => {
                                    return (
                                        <TableBody>
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, 'height': '50px' }}
                                            >
                                                <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">{professor.id}</TableCell>
                                                <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">{professor.firstName}</TableCell>
                                                <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">{professor.lastName} </TableCell>
                                                <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="left">
                                                    <SeeCourse
                                                        professor={professor}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>

                                    )
                                })}
                            </> : ""}
                        </Table>
                    </TableContainer>
                </div>
    
            </div>
            <div className="list-of-student">
                <h1> List of Students</h1>
                <div className="search_bar">
                    <TextField
                        placeholder="Search by Username"
                        variant="outlined"
                        value={searchStudent}
                        onChange={event => {
                            const value = event.target.value;
                            searchStudents(value)
                            setSearchStudent(value)
                        }}
                    />
                </div>
                <div className="table">
                    <TableContainer component={Paper}>
                        <Table className="course_table" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#dbdbdb' }}>
                                    <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Student ID</TableCell>
                                    <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">First Name</TableCell>
                                    <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Last Name</TableCell>
                                    <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Username</TableCell>
                                    <TableCell style={{ fontWeight: '500', fontSize: '20px' }} align="center">Edit</TableCell>
                                </TableRow>
                            </TableHead>

                            {students.length > 0 ? <TableBody>
                                {students.map((student, key) => {
                                    return (
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, 'height': '50px' }}
                                        >
                                            <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">{student.id}</TableCell>
                                            <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">{student.firstName} </TableCell>
                                            <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">{student.lastName}</TableCell>
                                            <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">{student.username}</TableCell>
                                            <TableCell style={{ fontWeight: '500', fontSize: '15px' }} align="center">
                                                <AiFillEdit className="edit" onClick={editStudentFunction(student)} />
                                            </TableCell>

                                        </TableRow>
                                    )
                                })}
                            </TableBody> : ""}


                        </Table>
                    </TableContainer>
                    {editStudent ? 
                    <EditStudent 
                        editStudent = {editStudent}
                        setEditStudent = {setEditStudent}
                        studentEdit={studentEdit}
                    />
                    :""}
                </div>
            </div>
        </div>
    )
}