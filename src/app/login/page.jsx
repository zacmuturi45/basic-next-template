"use client"

import AuthCard from '../components/authcard';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import { LOGGEDUSER, LOGIN_PATIENT } from '../GraphQL/queries';
import Loader from '@/app/components/loader';
import Link from 'next/link';
import { useLoggedUser } from '../contexts/loggedincontext';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [login] = useMutation(LOGIN_PATIENT);
    const [userExists] = useLazyQuery(LOGGEDUSER);
    const { setPd, setName } = useLoggedUser();

    const formik = useFormik({
        initialValues: {
            fullName: "",
            password: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Full name is required"),
            password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const { data } = await login({
                    variables: { fullName: values.fullName, password: values.password }
                });
                if (data.login.ok) {
                    resetForm();
                    const token = data.login.token;
                    if (token) {
                        localStorage.setItem('token', token);
                    }

                    const { data: userData } = await userExists({ variables: { fullName: values.fullName } });

                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        setPd(userData.userExists)
                        setName(values.fullName)
                        userData.userExists === "Patient" ? router.push("/patient") : router.push("/doctor")
                    }, 3000);
                } else {
                    alert("Login failed. Please check your credentials.");
                }
            } catch (error) {
                console.error("Login error:", error);
                alert("Login error. Please try again.");
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <AuthCard>
            <form onSubmit={formik.handleSubmit} className='login-main'>
                <h1>Log in</h1>

                <input
                    name='fullName'
                    type="text"
                    placeholder='Full Name'
                    {...formik.getFieldProps("fullName")}
                />
                {formik.touched.fullName && formik.errors.fullName && <div className="error">{formik.errors.fullName}</div>}

                <input
                    name='password'
                    type="password"
                    placeholder='Password'
                    {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && <div className="error">{formik.errors.password}</div>}

                <button className='login-button' type='submit' disabled={formik.isSubmitting || loading}>
                    {loading ? <Loader /> : <span>Log in</span>}
                </button>

                <div className='login-text'>
                    <Link href="/signup"><p>Dont have an account? Sign up.</p>
                    </Link>
                    <p onClick={() => router.push("/forgot")}>Forgot your password?</p>
                </div>

            </form>
        </AuthCard>
    );
}
