import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentAuth.css";

function StudentAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* ===== LOGIN ===== */
    if (isLogin) {
      const savedStudent = JSON.parse(localStorage.getItem("student"));

      if (
        savedStudent &&
        savedStudent.email === form.email &&
        savedStudent.password === form.password
      ) {
        alert("Login successful 🎉");

        // redirect dashboard
        navigate("/student");
      } else {
        alert("Invalid email or password ❌");
      }
    }

    /* ===== REGISTER ===== */
    else {
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match ❌");
        return;
      }

      const newStudent = {
        name: form.name,
        email: form.email,
        password: form.password
      };

      localStorage.setItem("student", JSON.stringify(newStudent));

      alert("Registration successful 🎉");

      // redirect dashboard
      navigate("/student");
    }
  };

  return (
    <div className="student-auth-container">

      {/* LEFT */}
      <div className="student-auth-left">
        <div className="overlay">
          <h3>🎓 Student Portal</h3>
          <h1>Welcome to CampusHub</h1>
          <p>
            Discover events, join clubs, and explore campus life with ease.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="student-auth-right">
        <div className="student-auth-box">

          <h2>{isLogin ? "Student Login" : "Student Register"}</h2>

          <form onSubmit={handleSubmit}>

            {!isLogin && (
              <>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="student@college.edu"
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />

            {!isLogin && (
              <>
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <button className="primary-btn">
              {isLogin ? "Login" : "Register"}
            </button>

          </form>

          <p className="switch-text">
            {isLogin ? (
              <>
                New student?{" "}
                <span onClick={() => setIsLogin(false)}>
                  Register here
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)}>
                  Login here
                </span>
              </>
            )}
          </p>

        </div>
      </div>
    </div>
  );
}

export default StudentAuth;
