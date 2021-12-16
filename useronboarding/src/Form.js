import React from 'react';

export default function Form(props){
    const { values, submit, change, disabled, errors } = props;

    const handleSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const handleChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2>Add an entry</h2>
                
                <div>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.terms}</div>
                </div>

                <label>Name
                    <input 
                        value={values.name}
                        onChange={handleChange}
                        name='name'
                        type='text'
                    />
                </label>

                <label>Email
                    <input 
                        value={values.email}
                        onChange={handleChange}
                        name='email'
                        type='text'
                    />
                </label>

                <label>Password
                    <input 
                        value={values.password}
                        onChange={handleChange}
                        name='password'
                        type='password'
                    />
                </label>

                <label>Terms of Service
                    <input 
                        type='checkbox'
                        name='terms'
                        checked={values.terms}
                        onChange={handleChange}
                    />
                </label>

                <button disabled={disabled}>submit</button>
            </div>
        </form>
    )
}