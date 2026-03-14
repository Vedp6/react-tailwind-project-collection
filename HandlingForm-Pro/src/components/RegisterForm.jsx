import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./RegisterForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterForm() {

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    alert("Registration Successful");
    reset();
  };

  return (
    <div className="container">

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>

        {/* Name */}
        <input
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        {/* Email */}
        <input
          placeholder="Email"
          {...register("email", {
            required: "Email required"
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        {/* Password */}
        <div className="password-box">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: "Password required"
            })}
          />

          <span
            className="toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>

        </div>

        {errors.password && <p className="error">{errors.password.message}</p>}

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            validate: (value) =>
              value === password || "Passwords do not match"
          })}
        />
        

        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}

        <button type="submit">Register</button>

      </form>

    </div>
  );
}

export default RegisterForm;