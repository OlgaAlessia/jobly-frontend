import React, { useState, useEffect } from "react";
import JoblyApi from "../JoblyApi"
import CompanyCard from "./CompanyCard";
import SearchForm from "../helpers/SearchForm";

function CompanyList() {
    const [companies, setCompanies] = useState(null);

    useEffect(function loadCompaniesInfo() {
        console.debug("CompanyList useEffect loadCompaniesInfo");
        search();
    }, []);

    /** Handles search */
    async function search(name) {
        let companies = await JoblyApi.getSearchCompany(name);
        setCompanies(companies);
    }

    if (!companies) return (<div> Loading ... </div>);

    return (
        <div className="CompanyList col-md-8 offset-md-2">

            <SearchForm searchFor={search} />

            {companies.length
                ? (
                    <div className="CompanyList-list">
                        {companies.map(c => (
                            <CompanyCard key={c.handle}
                                name={c.name}
                                description={c.description}
                                handle={c.handle} />
                        ))}
                    </div>
                ) : (
                    <p>Sorry, no results were found!</p>
                )}
        </div>
    );
};
// end

export default CompanyList;
