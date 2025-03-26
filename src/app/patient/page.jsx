"use client"

import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_ALL_ASSESSMENTS, GET_PATIENT_ASSESSMENTS } from '../GraphQL/queries'
import Loader from '../components/loader';
import { jwtDecode } from 'jwt-decode';
import { useLoggedUser } from '../contexts/loggedincontext';

export default function Patient() {
  const { name } = useLoggedUser();


  const { loading, error, data } = useQuery(GET_PATIENT_ASSESSMENTS, {
    variables: { fullName: name },
  });

  if (loading) return <Loader />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='doctor-main'>
      <div className="doctor-container">
        <h1>{`My Assessments (${data?.patientAssessments?.length})`}</h1>
        <div className="assessments">
          {
            data?.patientAssessments?.map((assessment, index) => (
              <div className='doctor-assessment' key={index}>
                <h1>{`Doctor: ${assessment.doctor.fullName}.`}</h1>
                <h2>{`Date: ${assessment.date.slice(0,10)}`}</h2>
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
      </div>
    </div>
  )
}
