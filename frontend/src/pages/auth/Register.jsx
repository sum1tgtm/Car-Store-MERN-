import axios from 'axios'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'

const LoginFormSchema = Yup.object().shape({
    name: Yup.string().required('Please Enter Tour Fullname'),
    phone: Yup.number('Phone Enter Valid Phone NUmber'),
    email: Yup.string().email('Enter a Valid Email').required('Please Enter Your Email'),
    password: Yup.string().required('Please Enter Your Password')
})




export const Register = () => {
    const navigate = useNavigate()

    const handleSubmit = async (data) => {
        const res = await axios.post('http://localhost:4000/auth/register', {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone
        })
        if (res.status === 200) {
            toast.info("Account Created Successfully")
            navigate('/login')
        } else {
            toast.error("Error!")
        }
    }

    const { user } = useContext(AuthContext)
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])
    return (
        <div className='loginContainer'>
            <div className="loginWrapper">
                <div className="loginHeading">REGISTER</div>
                <div className="loginForm">
                    <Formik
                        initialValues={{
                            name: "",
                            phone: "",
                            email: "",
                            password: "",
                        }}
                        validationSchema={LoginFormSchema}
                        onSubmit={handleSubmit}

                    >
                        {({ touched, errors, values, handleSubmit, handleChange }) => {
                            return (
                                <Form onSubmit={handleSubmit}>
                                    <div>
                                        <input name="name" className='loginInputs' type="text" value={values.name} placeholder="Name" onChange={handleChange} />
                                        {(errors.name && touched.name) && <div className="validationError">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <input name="phone" className='loginInputs' type="number" value={values.phone} placeholder="Phone" onChange={handleChange} />
                                        {(errors.phone && touched.phone) && <div className="validationError">{errors.phone}</div>}
                                    </div>
                                    <div>
                                        <input name="email" className='loginInputs' type="text" value={values.email} placeholder="Email" onChange={handleChange} />
                                        {(errors.email && touched.email) && <div className="validationError">{errors.email}</div>}
                                    </div>
                                    <div>
                                        <input name="password" className='loginInputs' type="password" value={values.password} placeholder="Password" onChange={handleChange} />
                                        {(errors.password && touched.password) && <div className="validationError">{errors.password}</div>}
                                    </div>
                                    <button type='submit' className='loginSubmit'>Register</button>
                                    <div className='loginToRegister'>Already Have an Account? <a href="/login" style={{ textDecoration: 'none' }}>Sign In</a></div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}