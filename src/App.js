import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from './Component/SignUpComponent/SignUp';
import SignIn from './Component/SignInComponent/SignIn';
import AddCourse from './Component/AddCourseComponent/AddCourse'
import EnrollCourseHeader from './Component/EnrollCourseHeader/EnrollCourseHeader';
import './App.css';
import ProfessorHeader from './Component/ProfessorPageHeader/ProfessorHeader';


function App() {

  useEffect(() => {
    document.title = "Register"
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signUp" component={SignUp} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/admin" component={AddCourse} />
          <Route path="/enroll" component={EnrollCourseHeader}/>
          <Route path="/professor" component={ProfessorHeader}/>
          <Route path="" component={SignIn}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
