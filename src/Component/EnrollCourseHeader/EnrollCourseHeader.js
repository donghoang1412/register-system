import { Button, Tab } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from './EnrollCourseHeader.module.css'
import EnrollCourse from "../EnrollCourseCourses/EnrollCourse";
import EnrollCourseManage from "../EnrollCourseMange/EnrollCourseMange";
import AppUtil from "../../util/AppUtil";
import * as UserService from "../Services/UserServices"
import { useHistory } from "react-router";
export default function EnrollCourseHeader() {

    useEffect(() =>{
        setFirstLastName()
    },[])
    const history = useHistory()
    const [value, setValue] = React.useState('1');
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const setFirstLastName = async () =>{
        const response = await UserService.getUserFirstNameAndLastName(AppUtil.getUsername())
        setFirstName(response.firstName)
        setLastName(response.lastName)
    }

    const signOutFunction = () =>{
        localStorage.clear()
        history.push({
            pathname : "/signIn"
        })
    }

    return (
        <div>
            <div className={styles["enrollCourseHeader"]}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <div className={styles["header"]}>
                            <div className={styles["header-box"]}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Courses" value="1" />
                                        <Tab label="Courses Enrolled" value="2" />
                                    </TabList>
                                </Box>
                            </div>
                            <div className={styles["header-name"]}>
                                <div><Button disable> Hi, {firstName} {lastName}</Button></div>
                                <div> <Button variant="contained" color="primary" onClick={signOutFunction}> Sign Out</Button></div>
                            </div>
                        </div>

                        <TabPanel value="1">
                            <EnrollCourse />
                        </TabPanel>
                        <TabPanel value="2">
                            <EnrollCourseManage />
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>

    )
}