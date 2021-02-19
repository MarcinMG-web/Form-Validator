import React, { useState, useRef } from 'react';
import { saveUserForm } from './Form-api';

export const Form = () => {
  const initialState = {
    name: '',
    lastName: '',
    email: '',
    birthday: '',
    userType: 'avtive',
    userInactivitiesDate: '',
  };

  const initialError = {
    nameError: '',
    lastNameError: '',
    emailError: ' ',
    birthDayError: '',
    userInactivitiesDateError: '',
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialError);
  const [distabled, setDistabled] = useState(true);
  const [sendFormText, setSendFormText] = useState('');

  const formRef = useRef();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const checkIfInThePast = (dateFromInput) => {
    const now = new Date();

    const d = now.getDate();
    const m = now.getMonth() + 1;
    const y = now.getFullYear();

    const currentYearMontDay = `${y}-${m <= 9 ? '0' + m : m}-${
      d <= 9 ? '0' + d : d
    }`;

    // Check if is in the past
    if (currentYearMontDay <= dateFromInput) {
      return false;
    } else {
      return true;
    }
  };

  // Validate
  const validate = () => {
    let nameError = '';
    let lastNameError = '';
    let emailError = '';
    let birthDayError = '';
    let userInactivitiesDateError = '';

    if (form.name.length <= 2) {
      nameError = 'Name is too short';
    }

    if (!form.name) {
      nameError = 'Please, provide your name';
    }

    if (form.lastName.length <= 2) {
      lastNameError = 'Last name is too short';
    }

    if (!form.lastName) {
      lastNameError = 'Please, provide your last name';
    }

    if (!form.email) {
      emailError = 'Please, provide your email';
    }

    function validateEmail(email) {
      const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
      const result = pattern.test(email);
      if (result) {
        emailError = '';
      } else {
        emailError =
          'Do not corret email. Email should have format user@domain.com';
      }
    }

    validateEmail(form.email);

    function validateDate(date) {
      const pattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
      const result = pattern.test(date);

      if (result) {
        if (!checkIfInThePast(date)) {
          birthDayError = 'Birthdate should have date in the past';
        }
      } else {
        birthDayError = 'Birthdate should have format YYYY-MM-DD';
      }
    }

    if (form.birthday) {
      validateDate(form.birthday);
    }

    function validateDateInteractivities(date) {
      const pattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
      const result = pattern.test(date);

      if (result) {
        if (!checkIfInThePast(date)) {
          userInactivitiesDateError = 'Date should have date in the past';
        }
      } else {
        userInactivitiesDateError = 'Date should have format YYYY-MM-DD';
      }
    }

    if (!distabled) {
      validateDateInteractivities(form.userInactivitiesDate);
    }

    if (
      nameError ||
      lastNameError ||
      emailError ||
      birthDayError ||
      userInactivitiesDateError
    ) {
      setErrors({
        nameError,
        lastNameError,
        emailError,
        birthDayError,
        userInactivitiesDateError,
      });
      return false;
    }
    return true;
  };

  const check = () => {
    const isValid = validate();
    if (isValid) {
      //clear error
      setErrors(initialError);
    }
  };

  const changeDestable = (e) => {
    if (e.target.value === 'unActive') {
      setDistabled(false);

      form.userInactivitiesDate = e.target.value;
      form.chooseType = e.target.value;
    } else {
      setDistabled(true);
      form.userInactivitiesDate = '';
      form.chooseType = e.target.value;
    }
  };

  const clearForm = () => {
    formRef.current.reset();
    setForm(initialState);
    setDistabled(true);
    setErrors(initialError);
    setSendFormText('');
  };

  // Send form
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (isValid) {
      console.log('Form wysłany', form);
      setSendFormText('Thank you, the form was sent successfully!');
      saveUserForm(form);

      //clear form
      formRef.current.reset();
      setForm(initialState);
      setErrors(initialError);
    }
  };

  return (
    <form
      className='col-lg-6 offset-lg-3 '
      onSubmit={handleSubmitForm}
      ref={formRef}
    >
      <div className='col ml-auto'>
        <div className='col align-self-center'>
          <label htmlFor='validationTooltip01' className='form-label mt-3'>
            First name
          </label>
          <input
            type='text'
            className='form-control'
            name='name'
            placeholder='Name'
            onChange={handleChange}
            onBlur={check}
          />

          <div style={{ color: 'red', fontSize: '12px' }}>
            {errors.nameError}
          </div>
        </div>

        <div className='col align-self-center'>
          <label htmlFor='validationTooltip01 ' className='form-label mt-3'>
            Last name
          </label>
          <input
            type='text'
            name='lastName'
            className='form-control'
            placeholder='Last Name'
            onChange={handleChange}
            onBlur={check}
          />
          <div style={{ color: 'red', fontSize: '12px' }}>
            {errors.lastNameError}
          </div>
        </div>

        <div className='col align-self-center'>
          <label htmlFor='validationTooltip01 ' className='form-label mt-3'>
            Email
          </label>
          <input
            type='email'
            name='email'
            className='form-control'
            placeholder='user@domain.com'
            onChange={handleChange}
            onBlur={check}
          />
          <div style={{ color: 'red', fontSize: '12px' }}>
            {errors.emailError}
          </div>
        </div>

        <div className='col align-self-center'>
          <label htmlFor='validationTooltip02' className='form-label mt-3'>
            Birthday:
          </label>
          <input
            type='text'
            className='form-control '
            name='birthday'
            onChange={handleChange}
            onBlur={check}
            placeholder='YYYY-MM-DD'
          />
          <div style={{ color: 'red', fontSize: '12px' }}>
            {errors.birthDayError}
          </div>
        </div>

        <div className='col align-self-center'>
          <label htmlFor='validationTooltip04' className='form-label mt-3'>
            User Type:
          </label>
          <select
            className='form-control'
            id='validationTooltip04'
            name='userType'
            onChange={changeDestable}
            onBlur={check}
          >
            <option value='active'> Active </option>
            <option value='unActive'> UnAactive </option>
          </select>
        </div>

        <div className='col align-self-center'>
          <label htmlFor='validationTooltip01' className='form-label mt-3'>
            Users Inactivities Date:
          </label>
          <input
            type='text'
            className='form-control'
            name='userInactivitiesDate'
            onChange={handleChange}
            onBlur={check}
            disabled={distabled}
            placeholder='YYYY-MM-DD'
          />
          <div style={{ color: 'red', fontSize: '12px' }}>
            {errors.userInactivitiesDateError}
          </div>
        </div>

        <div className='d-flex justify-content-center'>
          <button
            className='btn btn-medium btn-block btn-outline-danger mt-4'
            onClick={clearForm}
            style={{ fontSize: '12px' }}
          >
            Clear Form
          </button>
          <button
            className='btn btn-medium btn-block btn-outline-success mt-4'
            type='submit'
            style={{ fontSize: '12px' }}
          >
            Submit
          </button>
        </div>

        <div className='col align-self-center mt-4'>
          <div
            style={{
              color: 'green',
              fontSize: '24px',
              fontFamily: 'Lato',
            }}
          >
            {sendFormText}
          </div>
        </div>
      </div>
    </form>
  );
};
