import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { store } from './reducers';

import App from './containers/app';
import Landing from './components/landing';
import LoginField from './containers/login-field';
import UserForm from './containers/addUser';
import RenderClassBuilder from './components/render_class_builder';
import RenderUsers from './components/render_users';
import UpdateProfile from './components/render_profile_builder';
import RenderProfile from './components/render_profile';
import RenderClasses from './components/render_classes';
import RenderDepartments from './components/render_departments';
import userAnalyticsDashboard from './containers/userAnalyticsDashboard';
import classAnalyticsDashboard from './containers/classAnalyticsDashboard';
import DepartmentForm from './containers/addDepartment';
import CourseForm from './containers/addCourse';
import RenderLesson from './components/render_lesson';
import RenderCalendar from './components/render_calendar';
import RenderCourseCatalog from './components/render_course_catalog';
import RenderClassesforCourse from './components/render_courses';
import RenderSingleClass from './components/render_single_class';
import renderDailySchedule from './containers/myDailySchedule';
import CreateForm from './components/create_all_forms';

const isAuth = () => !!store.getState().user.id;

const requireAuth = (nextState, replace) => {
  if (!isAuth) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const requireAuthType = (nextState, replace, ...types) => {
  const user = store.getState().user;
  if (!isAuth || !!user.type || types.includes(user.type.name)) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

ReactDOM.render(

  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Landing} />
      <Route component={App}>
        <Route path="/login" component={LoginField} />
        <Route path="/class" component={RenderClassBuilder} />
        <Route path="/user" component={UserForm} />
        <Route path="/classes" component={RenderClasses} />
        <Route path="/users" component={RenderUsers} />
        <Route path="/updateprofile" component={UpdateProfile} />
        <Route
          path="/profile"
          component={RenderProfile}
          onEnter={requireAuth}
        />
        <Route path="/dashboard" component={renderDailySchedule} />
        <Route path="/department" component={RenderDepartments} />
        <Route path="/usergradegraph" component={userAnalyticsDashboard} />
        <Route path="/classgradegraph" component={classAnalyticsDashboard} />
        <Route
          path="/createDepartment"
          component={DepartmentForm}
          onEnter={(nextState, replace) => requireAuthType(nextState, replace, 'teacher')}
        />
        <Route path="/course" component={RenderClassesforCourse} />
        <Route path="/createCourse" component={CourseForm} />
        <Route path="/lesson" component={RenderLesson} />
        <Route path="/calendar" component={RenderCalendar} />
        <Route path="/coursecatalog" component={RenderCourseCatalog} />
        <Route path="/coursecatalog/department" component={RenderDepartments} />
        <Route path="/coursecatalog/department/course" component={RenderClassesforCourse} />
        <Route path="/coursecatalog/department/course/class" component={RenderSingleClass} />
        <Route path="/createform" component={CreateForm} />
      </Route>
    </Router>
  </Provider>

  , document.getElementById('container'));
