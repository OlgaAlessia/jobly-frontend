import React from "react";
import { Route, Routes } from "react-router-dom";

import Homepage from "./Homepage";
import LoginForm from "./auth/LoginForm";
import Signup from "./auth/SignupForm";
import ProfileForm from "./auth/ProfileForm";
import CompanyList from "./company/CompanyList";
import CompanyDetail from "./company/CompanyDetail";
import JobList from "./job/JobList";


function RoutesList({ currentUser, login, signup }) {

  //console.log(currentUser)
  return (
    <main className="pt-5">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<Signup signup={signup} />} />
        <Route path="/companies/:handle" element={<CompanyDetail />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path='*' element={<Homepage />} />
      </Routes>
    </main>

  );
}

export default RoutesList;

/*
 {!currentUser ?
          <>
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<Signup signup={signup} />} />
          </> : <>
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/profile" element={<ProfileForm />} />
          </>
        }
*/
