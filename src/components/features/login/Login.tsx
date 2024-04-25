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
import { isLoggenInSelictor, useAppDispatch, useAppSelector } from '../../../app/store'
import { Navigate } from 'react-router-dom'
import { BaseResponseType } from '../../../api/todolist-api'
import { useActions } from '../../../utils/useActions/useActions'


export const Login = () => {

  const isLoggenIn = useAppSelector(isLoggenInSelictor)
  const { login } = useActions()

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
      } else if (values.password.length < 4) {
        errors.password = 'Password must be more than 4 symbols'
      }
      return errors
    },
    onSubmit: (values, formikHalpers) => {
      login({ data: values })
        .unwrap()
        .catch((e: BaseResponseType) => {
          if (e.fieldsErrors) {
            e.fieldsErrors.forEach(el => {
              formikHalpers.setFieldError(el.field, el.error)
            });
          }
        })
      // formik.resetForm()
    },
  })

  if (isLoggenIn) {
    return <Navigate to={'/'} />
  }
  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
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

              {formik.errors.email && formik.touched.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}

              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps('password')}
              />
              {formik.errors.password && formik.touched.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe} />}
              />
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>

      </Grid>
    </Grid>

  )

}




