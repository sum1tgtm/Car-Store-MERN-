import './login.css'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { loginCall } from '../../api/apiCall'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email('Enter a Valid Email').required('Please Enter Your Email'),
    password: Yup.string().required('Please Enter Your Password')
})



export const Login = () => {
    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = (data, actions) => {
        loginCall({ email: data.email, password: data.password }, dispatch)
    }
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    return (
        <div className='loginContainer'>
            <div className="loginWrapper">
                <div className="loginHeading">LOGIN</div>
                <div className="loginForm">
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={LoginFormSchema}
                        onSubmit={handleSubmit}

                    >
                        {({ touched, errors, values, handleSubmit, handleChange }) => {
                            return (
                                <Form>
                                    <div>
                                        <input name="email" className='loginInputs' type="text" value={values.email} placeholder="Email" onChange={handleChange} />
                                        {(errors.email && touched.email) && <div className="validationError">{errors.email}</div>}
                                    </div>
                                    <div>
                                        <input name="password" className='loginInputs' type="password" value={values.password} placeholder="Password" onChange={handleChange} />
                                        {(errors.password && touched.password) && <div className="validationError">{errors.password}</div>}
                                    </div>
                                    <button type='submit' className='loginSubmit'>Login</button>
                                    <div className='loginToRegister'>Don't Have an Account? <a href="/register" style={{ textDecoration: 'none' }}>Join Us</a></div>
                                </Form>


                            )
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}