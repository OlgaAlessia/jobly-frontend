import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;


  static async request(endpoint, paramsOrData = {}, method = "get") {
    console.debug("API Call:", endpoint, paramsOrData, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };

    try {
      return (
        await axios({
          url: `${BASE_URL}/${endpoint}`,
          method,
          [method === "get" ? "params" : "data"]: paramsOrData,
          headers
        })).data;

    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }


  // Individual API routes

  //----------------- USER ----------------

  /** Get token 
   * 
   * POST /auth/token:  { username, password } => { token }
  */

  static async login(data) {
    let res = await this.request('auth/token', data, "post");
    return res.token;
  }

  /** Signup 
   * 
   * POST /auth/register:   { user } => { token }
   * user must include { username, password, firstName, lastName, email }
  */

  static async signup(data) {
    let res = await this.request('auth/register', data, "post");
    return res.token;
  }

  /** Get details of the user w/username. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }


  /** Save user profile page.
   * 
   * PATCH /[username] { user } => { user }
   *  Data can include: { firstName, lastName, email }
  */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  //----------------- COMPANY ----------------

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get the companies with nameLike. */

  static async getSearchCompany(nameLike) {
    let res = await this.request('companies', { nameLike });

    return res.companies;
  }

  //----------------- JOBS ----------------

  /** Get details on a company by title. */

  static async getJobs(title) {
    let res = await this.request('jobs', { title });
    return res.jobs;
  }


  static async applyToJob(username, jobId) {
    await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  }

}

// for now, put token ("testuser" / "password" on class)
/*JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
*/


export default JoblyApi;
