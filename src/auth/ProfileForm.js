import React, { useState, useContext } from "react";
import Alert from "../helpers/Alert";
import UserContext from "../UserContext";
import JoblyApi from "../JoblyApi"


function ProfileForm() {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
    });
    const [formErrors, setFormErrors] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    async function handleSubmit(evt) {
        evt.preventDefault();

        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
        }

        let updatedUserData;
        try {
            updatedUserData = await JoblyApi.saveProfile(formData.username, userData);
        } catch (err) {
            setFormErrors(err);
            return;
        }

        setFormData(fData => ({ ...fData }));
        setFormErrors([]);
        setIsUpdated(true);

        setCurrentUser(currentUser => ({ ...currentUser, data: updatedUserData }));
    };


    /** Update local state w/curr state of input elem */

    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(fData => ({ ...fData, [name]: value }));
        setFormErrors([]);
    };



    return (
        <div className="ProfileForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Profile</h3>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="form-label">Username</label>
                                <input name="username"
                                    id="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form-label">First Name</label>
                                <input name="firstName"
                                    id="firstName"
                                    className="form-control"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form-label">Last Name</label>
                                <input name="lastName"
                                    id="lastName"
                                    className="form-control"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form-label">Email</label>
                                <input name="email"
                                    id="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {
                                formErrors.length ? <Alert type="danger" messages={formErrors} /> : null
                            }
                            {
                                isUpdated ? <Alert type="success" messages={["Updated successfully"]} /> : null
                            }
                            <div className="d-grid">
                                <button className="btn btn-primary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileForm;
