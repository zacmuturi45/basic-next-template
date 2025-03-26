"use client"

import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { CREATE_PATIENT_ASSESSMENT, GET_ALL_ASSESSMENTS } from '../GraphQL/queries'
import Loader from '../components/loader';
import { jwtDecode } from 'jwt-decode';

export default function Doctor() {
  const [doctorId, setDoctorId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    password: "",
    symptoms: "",
    diagnosis: "",
    medication: "",
    dosage: "",
    instructions: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setDoctorId(decoded.sub);
    }
  }, [])

  const [createPatientAssessmentWithPrescription, { loading: muteLoading, error: muteError, data: muteData }] = useMutation(CREATE_PATIENT_ASSESSMENT);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPatientAssessmentWithPrescription({
        variables: {
          fullName: formData.fullName,
          age: parseInt(formData.age),
          gender: formData.gender,
          phone: formData.phone,
          address: formData.address,
          passwordHash: formData.password,
          doctorId: doctorId,
          symptoms: formData.symptoms,
          diagnosis: formData.diagnosis,
          medication: formData.medication,
          dosage: formData.dosage,
          instructions: formData.instructions,
        },
      });
      alert("Patient enrolled successfully!");
      setFormData({
        fullName: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
        password: "",
        symptoms: "",
        diagnosis: "",
        medication: "",
        dosage: "",
        instructions: "",
      });
    } catch (err) {
      console.error(err);
    }
  };




  const { loading, error, data } = useQuery(GET_ALL_ASSESSMENTS, {
    variables: { doctorId },
    skip: !doctorId,
  });

  if (loading) return <Loader />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='doctor-main'>
      <div className="doctor-container">
        <h1>{`My Assessments (${data?.doctorAssessments?.length})`}</h1>
        <div className="assessments">
          {
            data?.doctorAssessments?.map((assessment, index) => (
              <div className='doctor-assessment' key={index}>
                <h1>{`Doctor ${assessment.doctor.fullName}'s Assessments`}</h1>
                <h4>{`Patient Name: ${assessment.patient.fullName}`}</h4>
                <p>{`Symptoms: ${assessment.symptoms}`}</p>
                <p>{`Diagnosis: ${assessment.diagnosis}`}</p>
                <div className="prescription">
                  <h3>Prescription</h3>
                  <p>{`Medication: ${assessment.prescription.medication}`}</p>
                  <p>{`Dosage: ${assessment.prescription.dosage}`}</p>
                  <p>{`Instructions: ${assessment.prescription.instructions}`}</p>

                </div>

              </div>
            ))
          }
        </div>

        <div className="addnew">
          <h1>Add New Patient</h1>
          <div className="inputs">
            <div className="form-container">
              <h2>Enroll New Patient</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Temporary Password" value={formData.password} onChange={handleChange} required />
                <input type="text" name="symptoms" placeholder="Symptoms" value={formData.symptoms} onChange={handleChange} required />
                <input type="text" name="diagnosis" placeholder="Diagnosis" value={formData.diagnosis} onChange={handleChange} required />
                <input type="text" name="medication" placeholder="Medication" value={formData.medication} onChange={handleChange} required />
                <input type="text" name="dosage" placeholder="Dosage" value={formData.dosage} onChange={handleChange} required />
                <input type="text" name="instructions" placeholder="Instructions" value={formData.instructions} onChange={handleChange} required />
                <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Enroll Patient"}</button>
              </form>
              {muteError && <p>Error: {error.message}</p>}
              {muteData && <p>Patient successfully enrolled!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
