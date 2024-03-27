import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'

export const Login = () => {

  type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
  }
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Email Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Password Required'
      }else if (values.password.length < 6) {
        errors.password = 'Password must be more than 6 symbols'
      }
      return errors
    },
    onSubmit: values => {
      alert(JSON.stringify(values))
      formik.resetForm()
    },
  })
  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <FormControl>
          <FormLabel>
            <p>
              To log in get registered
              <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <FormGroup>
            <TextField 
              label="Email" 
              margin="normal" 
              {...formik.getFieldProps('email')}
            />

            {formik.errors.email && formik.touched.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}

            <TextField 
              type="password" 
              label="Password" 
              margin="normal" 
              {...formik.getFieldProps('password')}
            />
            {formik.errors.password && formik.touched.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
            <FormControlLabel  
              label={'Remember me'} 
              control={<Checkbox />} 
            />
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
}