import express, { Response } from 'express';
import patientsService from '../services/patientsService';
import { NonSensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientsService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatientEntry = patientsService.addPatient({ name, dateOfBirth, ssn, gender, occupation });
    res.json(newPatientEntry);
});

export default router;
