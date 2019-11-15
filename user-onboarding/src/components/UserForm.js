import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);


return (
    <div>
        <Form>
            <Field className="input-cont" type="text" name="name" placeholder="name"/>
            {touched.name && errors.name && (
                <p>{errors.name}</p>
            )}
            <Field className="input-cont" required type="text" name="email" placeholder="email"/>
            {touched.email && errors.email && (
                <p>{errors.email}</p>
            )}
            <Field className="input-cont" required type="text" name="password" placeholder="password"/>
            {touched.email && errors.password && (
                <p>{errors.password}</p>
            )}
            <Field className="dropdown-cont" required as="select" name="role">
                <option value="user">User</option>
                <option value="pc-admin">PC administrator</option>
                <option value="sys-admin">System Administrator</option>
            </Field>
            {touched.role && errors.role && (
                <p>{errors.role}</p>
            )}
            <label className="title">Terms Of Service</label>
            <Field className="checkbox-cont" required type="checkbox" name="termsOfService"  checked={values.termsOfService}/>
            <button className="btn" as="button" type="submit">Submit</button>
        </Form>
        {users.map(users => (
            <ul key={users.id}>
                <li>Name: {users.name}</li>
                <li>Email: {users.email}</li>
                <li>Password: {users.password}</li>
                <li>role: {users.role}</li>
            </ul>
        ))}
    </div>
);
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, role, termsOfService}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsOfService: termsOfService || false,
            role: role || ""
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        role: Yup.string().required()
    }),
    handleSubmit(values, {setStatus}) {
        axios.post("https://reqres.in/api/users/", values).then(res => {
            setStatus(res.data);
            console.log(res);
        })
        .catch(error => console.log(error.res));
    }
})(UserForm);

export default FormikUserForm;











