import { gql } from "@apollo/client";



export const SIGNUP_PATIENT = gql`
  mutation SignupPatient(
    $fullName: String!
    $age: Int!
    $gender: String!
    $phone: String!
    $address: String
    $password: String!
  ) {
    createPatient(
      fullName: $fullName
      age: $age
      gender: $gender
      phone: $phone
      address: $address
      password: $password
    ) {
      ok
      successMessage
    }
  }
`;

export const LOGIN_PATIENT = gql`
  mutation LoginPatient($fullName: String!, $password: String!) {
    login(fullName: $fullName, password: $password) {
      ok
      token
    }
  }
`;


export const LOGGEDUSER = gql`
query ($fullName: String!) {
    userExists (fullName: $fullName)
}
`;

export const GET_ALL_ASSESSMENTS = gql`
  query ($doctorId: Int!) {
    doctorAssessments(doctorId: $doctorId) {
      date
      patient {
        fullName
      }
      doctor {
        fullName
      }
      symptoms
      diagnosis
      prescription {
        medication
        dosage
        instructions
      }
    }
  }
`;

export const GET_PATIENT_ASSESSMENTS = gql`
  query ($fullName: String!) {
    patientAssessments(fullName: $fullName) {
      date
      doctor {
        fullName
      }
      diagnosis
      prescription {
        medication
        dosage
        instructions
      }
    }
  }

`
export const CREATE_PATIENT_ASSESSMENT = gql`
  mutation CreatePatientAssessmentWithPrescription(
    $fullName: String!,
    $age: Int!,
    $gender: String!,
    $phone: String!,
    $address: String!,
    $passwordHash: String!,
    $doctorId: ID!,
    $symptoms: String!,
    $diagnosis: String!,
    $medication: String!,
    $dosage: String!,
    $instructions: String!
  ) {
    createPatientAssessmentWithPrescription(
      fullName: $fullName,
      age: $age,
      gender: $gender,
      phone: $phone,
      address: $address,
      passwordHash: $passwordHash,
      doctorId: $doctorId,
      symptoms: $symptoms,
      diagnosis: $diagnosis,
      medication: $medication,
      dosage: $dosage,
      instructions: $instructions
    ) {
      patient {
        id
        fullName
        age
        gender
        phone
        address
      }
      assessment {
        id
        symptoms
        diagnosis
      }
      prescription {
        id
        medication
        dosage
        instructions
      }
    }
  }
`;