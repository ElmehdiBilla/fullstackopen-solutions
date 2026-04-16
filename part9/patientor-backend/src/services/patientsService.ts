import PatientsData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatientEntry, NewEntry } from '../types';
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
        entries:[],
        ...entry,
    };

    PatientsData.push(newPatient);
    return newPatient;
};

const addEntry = (id: string ,entry: NewEntry): Patient => {
    const NewEntry = {
        id: uuid(),
        ...entry,
    };

    const patient = PatientsData.find((p) => p.id === id);

    if(patient){
        patient?.entries.push(NewEntry);
        return patient;
    }

    throw new Error("patient not find");
    
};

export default {
    getEntries,
    getNonSensitiveEntries ,
    addPatient,
    addEntry
};
