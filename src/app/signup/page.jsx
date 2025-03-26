"use client"

import AuthCard from '../components/authcard';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { SIGNUP_PATIENT } from '../GraphQL/queries';
import Loader from '@/app/components/loader';

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [createPatient] = useMutation(SIGNUP_PATIENT);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            age: "",
            gender: "",
            phone: "",
            address: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Full name is required"),
            age: Yup.number().min(1, "Invalid age").required("Age is required"),
            gender: Yup.string().oneOf(["Male", "Female", "Other"], "Invalid gender").required("Gender is required"),
            phone: Yup.string().matches(/^\d+$/, "Phone number must be digits only").required("Phone is required"),
            address: Yup.string().optional(),
            password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Required"),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setLoading(true);
            try {
                const { data } = await createPatient({
                    variables: {
                        fullName: values.fullName,
                        age: parseInt(values.age),
                        gender: values.gender,
                        phone: values.phone,
                        address: values.address,
                        password: values.password,
                    },
                });

                if (data.createPatient.ok) {
                    setTimeout(() => {
                        resetForm();
                        router.push("/login");
                    }, 3000);
                } else {
                    alert("Signup failed. Please try again.");
                }
            } catch (error) {
                console.error("Signup error:", error);
                alert("Signup error. Please try again.");
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        },
    });

    return (
        <AuthCard>
            <form onSubmit={formik.handleSubmit} className='signup-main'>
                <h1>Sign up as a Patient</h1>

                <input
                    name='fullName'
                    type="text"
                    placeholder='Full Name'
                    {...formik.getFieldProps("fullName")}
                />
                {formik.touched.fullName && formik.errors.fullName && <div className="error">{formik.errors.fullName}</div>}

                <input
                    name='age'
                    type="number"
                    placeholder='Age'
                    {...formik.getFieldProps("age")}
                />
                {formik.touched.age && formik.errors.age && <div className="error">{formik.errors.age}</div>}

                <select name="gender" {...formik.getFieldProps("gender")}>
                    <option value="" label="Select gender" />
                    <option value="Male" label="Male" />
                    <option value="Female" label="Female" />
                    <option value="Other" label="Other" />
                </select>
                {formik.touched.gender && formik.errors.gender && <div className="error">{formik.errors.gender}</div>}

                <input
                    name='phone'
                    type="text"
                    placeholder='Phone'
                    {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone && <div className="error">{formik.errors.phone}</div>}

                <input
                    name='address'
                    type="text"
                    placeholder='Address (Optional)'
                    {...formik.getFieldProps("address")}
                />

                <input
                    name='password'
                    type="password"
                    placeholder='Create password'
                    {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && <div className="error">{formik.errors.password}</div>}

                <input
                    name='confirmPassword'
                    type="password"
                    placeholder='Confirm password'
                    {...formik.getFieldProps("confirmPassword")}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="error">{formik.errors.confirmPassword}</div>}

                <button className='signup-button' type='submit' disabled={formik.isSubmitting || loading}>
                    {loading ? <Loader /> : <span>Sign up</span>}
                </button>
            </form>
        </AuthCard>
    );
}
