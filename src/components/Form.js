import React,  { useState, useRef } from 'react';
import { saveUserForm } from './Form-api'


export const Form = () => {
    const initialState = {
        name: '',
        lastName: '',
        birthday: '',
        userType: 'avtive',
        userInactivitiesDate: ''
    }

    const initialError = {
        nameError: '',
        lastNameError: '',
        birthDayError: '',
        userInactivitiesDateError: ''
    }
         
    const [form, setForm] = useState(initialState)
    const [errors, setErrors] = useState(initialError)
    const [distabled, setDistabled] = useState(true)

    const formRef = useRef();

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const checkIfInThePast = (dateFromInput) => {
        
        const now = new Date();

        const d = now.getDate();
        const m = now.getMonth() + 1;
        const y = now.getFullYear();

        const currentYearMontDay = `${y}-${m <= 9 ? '0' + m : m}-${d <= 9 ? '0' + d : d}`
                  
        // Check if is in the past
        if (currentYearMontDay <= dateFromInput) {
            return false
        } else{
           return true
        }
  
    }

    // Validate
    const validate = () => {
        let nameError = '';
        let lastNameError = '';
        let birthDayError = '';
        let userInactivitiesDateError = ''

        if (!form.name){
            nameError = 'Please, provide your name'
        }

        if (!form.lastName) {
            lastNameError = 'Please, provide your last name'
        }
       
        function validateDate(date) {
            try {
                new Date(date).toISOString();
                    if (!checkIfInThePast(date)) {
                        birthDayError = 'Birthdate should have date in the past';
                    }
                
            } catch  {
                birthDayError = 'Birthdate should have format YYYY-MM-DD';
            }
        }
        validateDate(form.birthday)

        function validateDateInteractivities(date) {
            try {
                new Date(date).toISOString();
                    if (!checkIfInThePast(date)) {
                        userInactivitiesDateError = 'Date should have date in the past';
                    }
   
            } catch  {
                userInactivitiesDateError = 'Date should have format YYYY-MM-DD';
            }
        }
        
        if (!distabled) {
            validateDateInteractivities(form.userInactivitiesDate)
        } 
              
        if (nameError || lastNameError || birthDayError || userInactivitiesDateError){

            setErrors({
                nameError,
                lastNameError,
                birthDayError,
                userInactivitiesDateError
            })
            return false
        }
        return true
      }
    
    // Send form
    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        const isValid = validate()
        if (isValid) {
            console.log('Form wysłany', form)
            saveUserForm(form)

            //clear form
            formRef.current.reset();
            setForm(initialState)
            setErrors(initialError)
        }        
    }
    
    const check = () => {

        const isValid = validate()
        if (isValid) {

            //clear error
            setErrors(initialError)
        }
    }

    const changeDestable = e => {
        
        if (e.target.value === "unActive"){
            setDistabled(false)
            
            form.userInactivitiesDate = e.target.value
            form.chooseType = e.target.value
        } else {
            setDistabled(true)
            form.userInactivitiesDate = ''
            form.chooseType = e.target.value
        }
    }

             
    return (
                   
        <form className = 'd-flex flex-column mt-0 mb-0'
            onSubmit = {handleSubmitForm}
            ref={formRef} 
        >
            <div className = "d-flex" >
                <div className="col-md-6 position-relative">
                    <label htmlFor="validationTooltip01" className="form-label">
                        First name
                    </label>
                    <input type="text" 
                            className="form-control"  
                            name = 'name' 
                            placeholder = 'Name'
                            onChange={handleChange}
                            onBlur={check}
                            />
                    
                    <div style={{color: 'red', fontSize: '12px'}}>
                        {errors.nameError}
                    </div>               
                </div>
                         
                <div className = "col-md-6 position-relative " >
                    <label htmlFor="validationTooltip01 " className="form-label">
                        Last name
                    </label>
                    <input type="text" 
                            name = 'lastName'
                            className="form-control" 
                            placeholder = 'Last Name'
                            onChange={handleChange}
                            onBlur={check}
                            />
                   <div style={{color: 'red',fontSize: '12px'}}>
                       {errors.lastNameError}
                    </div>
                </div>
            </div>            
            <div className = "d-flex" >
                <div className="col-md-6 position-relative">
                    <label htmlFor="validationTooltip02" className="form-label mt-3">
                        Birthday:
                    </label>
                    <input type = "text"
                            className = "form-control "
                            name = "birthday"
                            onChange = {handleChange}
                            onBlur={check}
                            placeholder = 'YYYY-MM-DD'                   
                            />
                   <div style={{color: 'red', fontSize: '12px'}}>
                       {errors.birthDayError}
                    </div>
                </div>       
            </div>

            <div className = "d-flex flex-column" >
                    <div className="col-md-6 position-relative">
                            <label htmlFor="validationTooltip04" className="form-label mt-3">
                                User Type:
                            </label>
                            <select className = "form-control"
                                id = "validationTooltip04"
                                name = "userType"
                                onChange = {changeDestable}
                                onBlur = {check} 
                                >
                                    <option value = "active" > Active </option> 
                                    <option value = "unActive" > UnAactive </option>
                            </select>
                            
                        </div>
                       
                        <div className="col-md-6 position-relative">
                            <label htmlFor = "validationTooltip01"
                            className = "form-label mt-3" >
                                Users Inactivities Date:
                            </label>
                            <input  type = "text"
                                    className = "form-control"
                                    name = "userInactivitiesDate"
                                    onChange={handleChange}
                                    onBlur={check}
                                    disabled = {distabled}
                                    placeholder = 'YYYY-MM-DD'
                                    />
                        <div style={{color: 'red',fontSize: '12px'}}>
                            {errors.userInactivitiesDateError}
                        </div>
                    </div>
    
            </div>
                <button 
                    className="btn btn-outline-primary mt-2 mb-0" 
                    type="submit" 
                    style={{fontSize: '12px'}}
                    >
                        SAVE
                </button>
        </form>
        
    );
};