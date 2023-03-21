import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_USER } from "../../graphql/mutations";
import Auth from "../../auth/auth.js";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  if (Auth.loggedIn()) {
    return (
      <p>
        You're logged in, you sly fox. Click{" "}
        <span
          onClick={handleLogout}
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          here
        </span>{" "}
        to logout, or go back <a href="/">home</a>.
      </p>
    );
  }

  return (
    <div className="loginCont">
      <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10 formCard">
            <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
            <div className="card-body">
              {data ? (
                <p>
                  {/* We may not really need/want anything here because Auth's login function auto-redirects to home */}
                  Your account has been created!{" "}
                  <Link to="/">Go to the homepage.</Link>
                </p>
              ) : (
                <div className="formCont">
                  <form onSubmit={handleFormSubmit}>
                    <div className="inputCont">
                      <input
                        className="form-input"
                        placeholder="Enter username"
                        name="username"
                        type="text"
                        value={formState.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        className="form-input"
                        placeholder="Email address"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        className="form-input"
                        placeholder="********"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                      />
                    </div>
                    <br />
                    <div className="loginSubmit">
                      <button
                        className="btn btn-block btn-primary"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </div>
          </div>
      </main>
    </div>
  );
};

export default Signup;
