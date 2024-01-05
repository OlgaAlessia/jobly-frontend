import React from "react";
import "./CompanyCard.css";
import { NavLink } from "react-router-dom";

const CompanyCard = ({ name, description, handle }) => {

    return (
        <NavLink className="CompanyCard card" to={`${handle}`}>
            <div className="card-body">
                <h6 className="card-title">{name}</h6>
                <p>
                    <small>{description}</small>
                </p>
            </div>
        </NavLink >
    )
}

export default CompanyCard;
