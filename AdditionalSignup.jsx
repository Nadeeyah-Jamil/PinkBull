import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './AdditionalSignup.css';

const AdditionalSignup = ({ userData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(false);

  const onSubmit = async (data) => {
    const fullData = { ...userData, ...data };
    console.log('Complete Signup Data:', fullData);

    try {
      const response = await fetch('http://your-backend-url/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Backend Response:', result);

      // Show success message and redirect after 2 seconds
      setSuccessMessage(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className='additional-signup-container'>
      <div className="additional-signup-wrapper">
        <div className="additional-signup-form-box">
          <h2 className='additional-signup-heading'>Complete Your Profile</h2>

          {successMessage && (
            <div className="additional-signup-success-msg">
              Signup Successful! Redirecting...
            </div>
          )}

          {!successMessage && (
            <form onSubmit={handleSubmit(onSubmit)} className="additional-signup-form">
              {/* Email (Read-only) */}
              <div className='additional-signup-div'>
                <label className='AddSignup-labels'>Email:</label>
                <input
                  type="email"
                  value={userData?.email || ''}
                  readOnly
                  className="additional-signup-readonly-input"
                />
              </div>

              {/* First and Last Name */}
              <div className='additional-signup-row'>
                <div className='additional-signup-div-half'>
                  <label className='AddSignup-labels'>First Name:</label>
                  <input
                    type="text"
                    {...register("firstName", { required: "First name is required" })}
                  />
                  {errors.firstName && <p className="additional-signup-error">{errors.firstName.message}</p>}
                </div>

                <div className='additional-signup-div-half'>
                  <label className='AddSignup-labels'>Last Name:</label>
                  <input
                    type="text"
                    {...register("lastName", { required: "Last name is required" })}
                  />
                  {errors.lastName && <p className="additional-signup-error">{errors.lastName.message}</p>}
                </div>
              </div>

              {/* Country */}
              <div className='additional-signup-div'>
                <label className='AddSignup-labels'>Country:</label>
                <select {...register("country", { required: "Country is required" })}>
                  <option value="Pakistan" selected>Pakistan</option>
                </select>
                {errors.country && <p className="additional-signup-error">{errors.country.message}</p>}
              </div>

              {/* City and Postal Code */}
              <div className='additional-signup-row'>
                <div className='additional-signup-div-half'>
                  <label className='AddSignup-labels'>City:</label>
                  <select {...register("city")}>
                    <option value="Karachi" selected>Karachi</option>
                  </select>
                </div>

                <div className='additional-signup-div-half'>
                  <label className='AddSignup-labels'>Postal Code:</label>
                  <input type="text" {...register("postalCode")} />
                </div>
              </div>

              {/* Address */}
              <div className='additional-signup-div'>
                <label className='AddSignup-labels'>Address:</label>
                <input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && <p className="additional-signup-error">{errors.address.message}</p>}
              </div>

              {/* Phone */}
              <div className='additional-signup-div'>
                <label className='AddSignup-labels'>Phone Number:</label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Enter a valid phone number"
                    }
                  })}
                />
                {errors.phone && <p className="additional-signup-error">{errors.phone.message}</p>}
              </div>

              <button type="submit" className='additional-signup-btn'>Finish Signup</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdditionalSignup;
