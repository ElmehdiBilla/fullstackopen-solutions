import PatientsData from '../../data/patients';
import { Patient, NonSensitivePatient } from '../types';

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

export default {
    getEntries,
    getNonSensitiveEntries ,
};
