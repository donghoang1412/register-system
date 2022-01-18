import AppUtil from "../../util/AppUtil"

export async function getUserFirstNameAndLastName (username) {
    const api="http://localhost:8383/getUserFirstNameAndLastName?username="+username
    const response = await fetch(api, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": AppUtil.getJwtToken()
        },
    }).then(res => res.json())
        .then(resJson => resJson)
        .catch(err => err)
    return response
}

export async function getUserByUsernameContains (username) {
    const api="http://localhost:8383/getUserByUsernameContains?username="+username
    const response = await fetch(api, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": AppUtil.getJwtToken()
        },
    }).then(res => res.json())
        .then(resJson => resJson)
        .catch(err => err)
    return response
}

export async function getProfessorByFirstNameContains (firstName) {
    const api="http://localhost:8383/getProfessorByFirstNameContains?firstName="+firstName
    const response = await fetch(api, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": AppUtil.getJwtToken()
        },
    }).then(res => res.json())
        .then(resJson => resJson)
        .catch(err => err)
    return response
}


export async function getAllStudents () {
    const api="http://localhost:8383/getAllStudents"
    const response = await fetch(api, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": AppUtil.getJwtToken()
        },
    }).then(res => res.json())
        .then(resJson => resJson)
        .catch(err => err)
    return response
}

export async function getAllProfessors () {
    const api="http://localhost:8383/getAllProfessor"
    const response = await fetch(api, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": AppUtil.getJwtToken()
        },
    }).then(res => res.json())
        .then(resJson => resJson)
        .catch(err => err)
    return response
}

export async function saveProfessor (userObj) {
    const api="http://localhost:8383/saveUser"
    const response = await fetch(api, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj)
    }).then(res => res.json())
        .then(resJson => resJson)
        .catch(err => err)
    return response
}

export async function saveStudent (userObj) {
    const api="http://localhost:8383/saveUser"
    const response = await fetch(api, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj)
    }).then(res => res.json())
        .then(resJson => resJson)
        .catch(err => err)
    return response
}

export async function editStudent (userObj) {
    const api="http://localhost:8383/editUser"
    const response = await fetch(api, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : AppUtil.getJwtToken()
        },
        body: JSON.stringify(userObj)
    }).then(res => res.json())
        .then(resJson => resJson)
        .catch(err => err)
    return response
}

export async function getStudentList (value) {
    const api="http://localhost:8383/getStudentList?courseId=" + value
    const response = await fetch(api, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": AppUtil.getJwtToken()
        },
    }).then(res => res.json())
        .then(resJson => resJson)
        .catch(err => err)
    return response
}