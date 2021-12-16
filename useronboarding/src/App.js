import './App.css';
import React, { useEffect, useState } from 'react';
import Form from './Form';
import axios from 'axios';
import Member from './Member'
import formSchema from './formSchema';
import * as yup from 'yup';


const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: false,
}

const initialMembers = [];
const initialDisabled = true;

function App() {

  const [members, setMembers] = useState(initialMembers);
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getMembers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        console.log(res);
        setMembers(res.data.data)
      }).catch(err => console.error(err))
  }

  const postNewMember = newMember => {
    axios.post('https://reqres.in/api/users', newMember)
      .then(res => {
        setMembers([ res.data, ...members])
        console.log(res)
      }).catch(err => console.error(err))
      .finally(() => setFormValues(initialFormValues))
  }

  const validate = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newMember = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms,
    }
    postNewMember(newMember);
  }

  useEffect(() => {
    getMembers()
  }, [])
  
  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])
  
  return (
    <div className="App">
      <header><h1>Members App!</h1></header>
      <Form 
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}

      />
      {
        members.map(member => {
          return (
            <Member details={member} />
          )
        })
      }
    </div>
  );
}

export default App;
