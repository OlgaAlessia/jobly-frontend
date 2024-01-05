import React, { useState, useContext, useEffect } from "react";
import "./JobCard.css";
import UserContext from "../UserContext";

function JobCard({ id, title, companyName, salary, equity }) {

    const [applied, setApplied] = useState(false);
    const { hasAppliedToJob, applyToJob } = useContext(UserContext);

    useEffect(function loadJobsAppliedStatus() {
        //console.debug("JobCard useEffect loadJobsAppliedStatuss");
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]
    );

    /** Handles search */
    function handleApply(evt) {
        if (hasAppliedToJob(id)) return;
        console.debug("JobList search", title);
        applyToJob(id);
        setApplied(true);
    }

    return (
        <div className="JobCard card">
            <div className="card-body">
                <h6 className="card-title">{title}</h6>
                <p>{companyName}</p>
                <div><small>Salary: {salary}</small></div>
                {equity && <div><small>Equity: {equity}</small></div>}
                <button className="btn btn-danger fw-bold text-uppercase float-end"
                    onClick={handleApply}
                    disabled={applied}
                >
                    {applied ? "Applied" : "Apply"}

                </button>
            </div>
        </div>
    )
}

export default JobCard;
