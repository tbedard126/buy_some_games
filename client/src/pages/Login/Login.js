import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutations";
import Auth from "../../auth/auth.js";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // Reset form to blank after submission
    setFormState({
      email: "",
      password: "",
    });
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
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                {/* We may not really need/want anything here because Auth's login function auto-redirects to home */}
                Logged in! <Link to="/">Go to the homepage.</Link>
              </p>
            ) : (
              <div className="formCont">
                <form onSubmit={handleFormSubmit}>
                  <div className="inputCont">
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
                    <button className="btn btn-block btn-primary" type="submit">
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

export default Login;
