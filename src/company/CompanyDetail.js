import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../JoblyApi"
import JobCardList from "../job/JobCardList"

function CompanyDetail() {
    const { handle } = useParams();
    console.debug("CompanyDetail", "handle: ", handle);

    const [company, setCompany] = useState(null);

    useEffect(function loadCompanyDetail() {
        console.debug("CompanyDetail useEffect loadCompanyDetail");
        async function getCompany() {
            setCompany(await JoblyApi.getCompany(handle));
        }

        getCompany();
    }, [handle]);

    if (!company) return (<div> Loading ... </div>);

    return (
        <div className="CompanyDetail col-md-8 offset-md-2">
            <h3 className="CompanyDetail">{company.name}</h3>
            <p className="CompanyDetail">{company.description}</p>
            <JobCardList jobs={company.jobs} />
        </div>
    );
}

export default CompanyDetail;
