import AppUtil from "../../util/AppUtil";
export async function getCourseService() {
    const api = "http://localhost:8383/getCourses"

    const response = await fetch(api, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": AppUtil.getJwtToken()
        },
    }).then(res => res.json())
        .then(resJson => resJson)
        .catch(err => err)
    return response;
}

export async function getCourseByNameService(value) {
    const api = "http://localhost:8383/getCourse?courseName=" + value

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

export async function saveCourse(courseObj, id) {
    const api = "http://localhost:8383/saveCourse?id=" + id
    const response = await fetch(api, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": AppUtil.getJwtToken()
        },
        body: JSON.stringify(courseObj),

    }).then(res => res.json())
        .then(resJson => resJson)
        .catch(err => err)
    return response
}

export async function editCourse(editObj) {
    const api = "http://localhost:8383/updateCourse"

    const response = await fetch(api, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : AppUtil.getJwtToken()
        },
        body: JSON.stringify(editObj),

    }).then(res => res.json())
        .then(resJson => resJson)
        .catch(err => err)
    return response    
}

export async function getCoursesByProfessor(value) {
    const api = "http://localhost:8383/getCoursesByProfessor?id=" + value

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

export async function getCoursesEnroll(value) {
    const api = "http://localhost:8383/getCoursesEnrolled?username=" + value

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

export async function deleteCourse(profId, courseId) {
    const api = "http://localhost:8383/deleteCourse?profId=" + profId+"&courseId=" +courseId

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

export async function enrollCourse(username, courseId) {
    const api = "http://localhost:8383/enrollCourse?courseId=" + courseId+"&username=" +username

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

export async function getCourseProfessorDisplay(username) {
    const api = "http://localhost:8383/getCoursesProfessorDisplay?username=" +username

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