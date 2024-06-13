import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: 'Abhishek',
    lastName: 'Gupta',
    username: 'abhi@gupta',
    email: 'abhisheksh54005@gmail.com',
    password: '12345678',
    phoneNo: '+91-9264480203',
    country: 'India',
    city: 'Noida',
    panNo: 'ABCDE1234F',
    aadharNo: '677145943676',
  });

  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const validate = () => {
    let errors = {};

    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) errors.password = "Password is required";
    if (!formData.phoneNo) {
      errors.phoneNo = "Phone Number is required";
    } else if (!/^\+\d{1,3}-\d{6,12}$/.test(formData.phoneNo)) {
      errors.phoneNo = "Phone Number is invalid";
    }
    if (!formData.country) errors.country = "Country is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.panNo) {
      errors.panNo = "Pan No. is required";
    } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(formData.panNo)) {
      errors.panNo = "Pan No. is invalid";
    }
    if (!formData.aadharNo) {
      errors.aadharNo = "Aadhar No. is required";
    } else if (!/^\d{12}$/.test(formData.aadharNo)) {
      errors.aadharNo = "Aadhar No. is invalid";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = () => {
    const errors = validate();
    setErrors(errors);
    console.log('Errors:', errors); // Debugging line
    if (Object.keys(errors).length === 0) {
        setCurrentStep((prevStep) => prevStep + 1);
        console.log('Current Step:', currentStep + 1); // Debugging line
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      navigate('/success');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p>{errors.firstName}</p>}
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p>{errors.lastName}</p>}
            </div>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p>{errors.username}</p>}
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div>
              <label>Password:</label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
              {errors.password && <p>{errors.password}</p>}
            </div>
            <div>
              <label>Phone No.:</label>
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
              />
              {errors.phoneNo && <p>{errors.phoneNo}</p>}
            </div>
            <button type="button" onClick={handlePrevStep}>
              Previous
            </button>
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
          </>
        )}

        {currentStep === 3 && (
          <>
            <div>
              <label>Country:</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
              </select>
              {errors.country && <p>{errors.country}</p>}
            </div>
            <div>
              <label>City:</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                {formData.country === "India" && (
                  <>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                  </>
                )}
                {formData.country === "USA" && (
                  <>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                  </>
                )}
                {formData.country === "Canada" && (
                  <>
                    <option value="Toronto">Toronto</option>
                    <option value="Vancouver">Vancouver</option>
                  </>
                )}
              </select>
              {errors.city && <p>{errors.city}</p>}
            </div>

            <button type="button" onClick={handlePrevStep}>
              Previous
            </button>
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
          </>
        )}

        {currentStep === 4 && (
          <>
            <div>
              <label>Pan No.:</label>
              <input
                type="text"
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
              />
              {errors.panNo && <p>{errors.panNo}</p>}
            </div>

            <div>
              <label>Aadhar No.:</label>
              <input
                type="text"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
              />
              {errors.aadharNo && <p>{errors.aadharNo}</p>}
            </div>

            <button type="button" onClick={handlePrevStep}>
              Previous
            </button>
            <button type="submit" disabled={Object.keys(errors).length > 0}>
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Form;
