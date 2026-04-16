import { Typography } from '@mui/material';
import { Diagnosis, Patient } from '../../types';
import { Female, Male } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import patientService from '../../services/patients';

interface Props {
    diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        if (!id) return;

        const fetchPatient = async () => {
            try {
                const data = await patientService.findById(id);
                setPatient(data);
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    if (e?.response?.data && typeof e?.response?.data === 'string') {
                        const message = e.response.data.replace('Something went wrong. Error: ', '');
                        console.error(message);
                    } else {
                        console.error('Unrecognized axios error');
                    }
                } else {
                    console.error('Unknown error', e);
                }
            }
        };

        void fetchPatient();
    }, [id]);

    return (
        <div className='App'>
            <Typography variant='h4' sx={{ marginBottom: '0.5em' }}>
                {patient?.name} {patient?.gender === 'female' ? <Female fontSize='large' /> : <Male fontSize='large' />}
            </Typography>
            <Typography variant='h6'>ssn: {patient?.ssn}</Typography>
            <Typography variant='h6'>occupation: {patient?.occupation}</Typography>
            <Typography variant='h5' sx={{ marginBottom: '0.5em', marginTop: '0.5em' }}>
                entries
            </Typography>
            {patient?.entries.map((entry) => {
                return (
                    <div>
                        <Typography variant='h6'>
                            {entry.date} {entry.description}
                        </Typography>
                        <ul>
                            {entry.diagnosisCodes?.map((code) => (
                                <li>
                                    <Typography>{code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}</Typography>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default PatientPage;
