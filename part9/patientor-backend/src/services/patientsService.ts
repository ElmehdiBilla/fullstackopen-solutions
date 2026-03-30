import PatientsData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
    return PatientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return PatientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatient = {
        id: uuid(),
        ...entry,
    };

    PatientsData.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    getNonSensitiveEntries ,
    addPatient
};
