import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <div className="login">
      <div className="login-form">
        <div className="login-inner">
          <h1>LOGIN</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
