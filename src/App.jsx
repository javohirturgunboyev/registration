import React, { useRef, useState } from "react";
import "./App.css";

const Form = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const companyRef = useRef();
  const addressRef = useRef();
  const monthRef = useRef();
  const dayRef = useRef();
  const yearRef = useRef();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!firstNameRef.current.value) newErrors.firstName = "Familiya Majburiy";
    if (!lastNameRef.current.value) newErrors.lastName = "Ism Majburiy";
    if (!emailRef.current.value) newErrors.email = "Email Majburiy";
    if (!addressRef.current.value) newErrors.address = "Address Majburiy";
    if (!monthRef.current.value) newErrors.month = "Oy Majburiy";
    if (!dayRef.current.value) newErrors.day = "Kun Majburiy";
    if (!yearRef.current.value) newErrors.year = "Yil Majburiy";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const formData = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        company: companyRef.current.value,
        address: addressRef.current.value,
        dob: `${monthRef.current.value}/${dayRef.current.value}/${yearRef.current.value}`,
      };
      localStorage.setItem("formData", JSON.stringify(formData));
      alert("localstoragega ma`lumotlaringiz saqlandi");
      setErrors({});
      // Perform further actions such as form reset
    }
  };

  return (
    <div className="form-container">
      <h2>YourEvent</h2>
      <p>Online Registration</p>
      <form onSubmit={handleSubmit}>
        <div className="fl-name">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" placeholder="First Name" ref={firstNameRef} />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" ref={lastNameRef} />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder="Email Address" ref={emailRef} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Company (if applicable)</label>
          <input type="text" placeholder="Company" ref={companyRef} />
        </div>
        <div className="form-group">
          <label>Physical Address</label>
          <input type="text" placeholder="Physical Address" ref={addressRef} />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <div className="dob-container">
            <select ref={monthRef}>
              <option value="">Month</option>

              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select ref={dayRef}>
              <option value="">Day</option>

              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select ref={yearRef}>
              <option value="">Year</option>

              {Array.from({ length: 100 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
          </div>
          {(errors.month || errors.day || errors.year) && (
            <span className="error">Complete date of birth is required</span>
          )}
        </div>
        <button type="submit" className="create-account-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Form;
