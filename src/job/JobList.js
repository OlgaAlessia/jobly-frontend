import React, { useState, useEffect } from "react";
import JoblyApi from "../JoblyApi"
import JobCard from "./JobCard";
import SearchForm from "../helpers/SearchForm";

function JobList() {
    const [jobs, setJobs] = useState(null);


    useEffect(function loadJobsInfo() {
        console.debug("JobList useEffect loadJobsInfo");
        search();
    }, []
    );

    /** Handles search */
    async function search(title) {
        console.debug("JobList search", title);
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) return (<div> Loading ... </div>);

    return (
        <div className="JobList col-md-8 offset-md-2">

            <SearchForm searchFor={search} />

            {jobs.length
                ? (
                    <div className="JobList-list">
                        {jobs.map(j => (
                            <JobCard
                                key={j.id}
                                id={j.id}
                                title={j.title}
                                companyName={j.companyName}
                                salary={j.salary}
                                equity={j.equity}
                            />
                        ))}
                    </div>
                ) : (
                    <p>Sorry, no results were found!</p>
                )}
        </div>
    );
};
// end

export default JobList;
