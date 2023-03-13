import './sellForm.css'
import { Formik } from 'formik'
import { Box, Button, IconButton, Snackbar, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';



const CarSaleSchema = Yup.object().shape({
    title: Yup.string().min(5, 'Title Too Short').max(50, 'Title Too Long').required('Title is Required'),
    price: Yup.number().min(100000, 'Price Seems Inappropriate').required('Price is Required'),
    brand: Yup.string().required('Brand is Required'),
    model: Yup.string().required('Model is Required'),
    year: Yup.number().min(1990, 'Year Seems Inappropriate').max(2023, 'Year Seems Inappropriate').required('Year is Required'),
    transmission: Yup.string().required('Transmission is Required'),
    mileage: Yup.number().required('Mileage is Required'),
    fueltype: Yup.string().required('Fueltype is Required'),
    description: Yup.string().min(10, 'Minimum 10 characters').required('Description is Required')
})

export const SellForm = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [file, setFile] = useState(null)

    const handleSubmit = async (data) => {
        const submitData = {
            userId: user._id,
            title: data.title,
            description: data.description,
            price: data.price,
            carInfo: {
                brand: data.brand,
                model: data.model,
                year: data.year,
                mileage: data.mileage,
                transmission: data.transmission,
                fuelType: data.fueltype
            }
        }

        if (file) {
            const formData = new FormData()
            const fileName = `${Date.now()}${file.name}`
            formData.append('name', fileName)
            formData.append('file', file)
            submitData.image = fileName

            try {
                await axios.post('http://localhost:4000/api/upload', formData)
            } catch (error) {
                console.log(error)
            }
        }

        const res = await axios.post(`http://localhost:4000/posts/create`, submitData)
        // console.log(res.status)
        if (res.status === 200) {
            toast.success("Car Listed Successfully")
            navigate('/')
        } else {
            toast.error("Error")
        }
    }
    return (
        <div className='sellFormWrapper'>
            <Formik
                initialValues={{
                    title: "",
                    description: "",
                    price: '',
                    brand: "",
                    model: "",
                    year: '',
                    mileage: '',
                    transmission: "",
                    fueltype: "",
                }}
                validationSchema={CarSaleSchema}
                onSubmit={handleSubmit}
            // component={CarForm}
            >
                {({ handleSubmit, values, handleChange, errors, touched }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    '& .MuiTextField-root': { m: 1, marginBottom: '1rem' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <div className='sellFormRow'>
                                    <div>
                                        <TextField
                                            // required    noValidate didnt work without commenting 'required'
                                            id="outlined-required"
                                            label="Enter Post Title"
                                            value={values.title}
                                            name="title"
                                            onChange={handleChange}
                                            sx={{ width: '40ch', mr: 2 }}
                                        />
                                        {(errors.title && touched.title) && <div className="validationError">{errors.title}</div>}
                                    </div>
                                    <div>
                                        <TextField
                                            // required
                                            id="outlined-required"
                                            label="Enter Price"
                                            value={values.price}
                                            name="price"
                                            onChange={handleChange}
                                            type="number"
                                            sx={{ mr: 2 }}
                                        />
                                        {errors.price && touched.price && <div className="validationError">{errors.price}</div>}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        position: 'relative',
                                        top: '8px',
                                        marginLeft: '10px'
                                    }}>
                                        <Box component="span" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2, py: 1, border: '1px solid #909090', borderRadius: '4px', height: '56px' }}>
                                            <input style={{ display: "none" }} type="file" id="file" accept='.png, .jpeg, .jpg' onChange={(e) => setFile(e.target.files[0])} />
                                            <label htmlFor='file' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><AddPhotoAlternateIcon />{file ? "Choose Another Image" : "Add Image"}</label>
                                        </Box>
                                    </div>
                                </div>


                                <div className='sellFormRow'>
                                    <div>
                                        <TextField
                                            // required
                                            id="outlined-required"
                                            label="Enter Car Brand"
                                            value={values.brand}
                                            name="brand"
                                            onChange={handleChange}
                                            sx={{ width: '25ch' }}
                                        />
                                        {errors.brand && touched.brand && <div className="validationError">{errors.brand}</div>}
                                    </div>
                                    <div>
                                        <TextField
                                            // required
                                            id="outlined-required"
                                            label="Enter Car Model"
                                            value={values.model}
                                            name="model"
                                            onChange={handleChange}
                                        />
                                        {errors.model && touched.model && <div className="validationError">{errors.model}</div>}
                                    </div>
                                    <div>
                                        <TextField
                                            // required
                                            id="outlined-required"
                                            label="Enter Make Year"
                                            value={values.year}
                                            name="year"
                                            onChange={handleChange}
                                            type="number"
                                            sx={{ width: '20ch' }}
                                        />
                                        {errors.year && touched.year && <div className="validationError">{errors.year}</div>}
                                    </div>
                                    <div>
                                        <TextField
                                            // required
                                            id="outlined-required"
                                            label="Enter Transmission Type"
                                            value={values.transmission}
                                            name="transmission"
                                            onChange={handleChange}
                                            sx={{ width: '30ch' }}
                                        />
                                        {errors.transmission && touched.transmission && <div className="validationError">{errors.transmission}</div>}
                                    </div>
                                </div>
                                <div className='sellFormRow'>
                                    <div>
                                        <TextField
                                            // required
                                            id="outlined-required"
                                            label="Enter Car Mileage in Kilometres"
                                            value={values.mileage}
                                            name="mileage"
                                            onChange={handleChange}
                                            type="number"
                                            sx={{ width: '30ch' }}
                                        />
                                        {errors.mileage && touched.mileage && <div className="validationError">{errors.mileage}</div>}
                                    </div>
                                    <div>
                                        <TextField
                                            // required
                                            id="outlined-required"
                                            label="Enter Fuel Type"
                                            value={values.fueltype}
                                            name="fueltype"
                                            onChange={handleChange}
                                        />
                                        {errors.fueltype && touched.fueltype && <div className="validationError">{errors.fueltype}</div>}
                                    </div>
                                </div>
                                <div style={{ width: '100%' }}>
                                    <TextField
                                        // required
                                        id="outlined-multiline-flexible"
                                        multiline
                                        rows={4}
                                        label="Add More Details"
                                        value={values.description}
                                        name="description"
                                        onChange={handleChange}
                                        sx={{ width: '100%' }}
                                    />
                                    {errors.description && touched.description && <div className="validationError">{errors.description}</div>}
                                </div>
                            </Box>
                            <Button sx={{ display: 'flex', margin: 'auto' }} variant="contained" color="success" type='submit'>List Car for Sale</Button>
                        </form >

                    )
                }}
            </Formik>
        </div>
    )
}
