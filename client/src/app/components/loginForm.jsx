import React, { useEffect, useState } from "react";
import { validator } from "../utils/validator";
import { useAuth } from "../hooks/useAuth";
const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { logIn } = useAuth();
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const err = validator(data, validatorConfig);
    setErrors(err);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    logIn(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email">email</label>
        <div className="input-group has-validation">
          <input
            type="text"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className={
              errors.email ? "form-control is-invalid" : "form-control"
            }
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <label htmlFor="email">password</label>
        <div className="input-group has-validation">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className={
              errors.password ? "form-control is-invalid" : "form-control"
            }
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={"bi bi-eye" + (showPassword ? "" : "-slash")}></i>
          </button>
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
      </div>
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
};
export default LoginForm;
