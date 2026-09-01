import React from "react";

function Login() {
  return (
    <div
      id="login-page"
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
      }}
    >
      <h1>Login</h1>
      <div style={{ maxWidth: "320px", width: "100%" }}>
        <input
          type="email"
          placeholder="Email"
          style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
        />
        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
        />
        <button style={{ width: "100%", padding: "10px", cursor: "pointer" }}>
          Log In
        </button>
      </div>
      <div id="returning-user-banner" style={{ marginTop: "30px", width: "100%", maxWidth: "320px" }}></div>
    </div>
  );
}

export default Login;