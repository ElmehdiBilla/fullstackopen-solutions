import express, { Response } from 'express';
import patientsService from '../services/patientsService';
import { NonSensitivePatient } from '../types';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientsService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    try{
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientsService.addPatient(newPatientEntry);
        res.json(addedEntry);
    }catch(error:unknown){
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
