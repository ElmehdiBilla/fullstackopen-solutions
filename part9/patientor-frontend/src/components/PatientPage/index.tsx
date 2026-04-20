import { Alert, Button, Card, CardContent, Typography } from '@mui/material';
import {
    Diagnosis,
    Patient,
    HospitalEntry,
    OccupationalHealthcareEntry,
    HealthCheckEntry,
    Entry,
    EntryFormValues,
} from '../../types';
import { Favorite, Female, LocalHospital, Male, MedicalServices, Work } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import patientService from '../../services/patients';
import AddEntryForm from './AddEntryForm';

interface Props {
    diagnoses: Diagnosis[];
}

const HealthCheckColors = ['green', 'yellow', 'orange', 'red'];

const assertNever = (value: never): never => {
    throw new Error(`Unhandled case: ${value}`);
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalElement entry={entry} />;

        case 'OccupationalHealthcare':
            return <OccupationalHealthcareElement entry={entry} />;

        case 'HealthCheck':
            return <HealthCheckElement entry={entry} />;

        default:
            return assertNever(entry);
    }
};

const HospitalElement = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <Card key={entry.id} sx={{ marginBottom: '0.5em' }}>
            <CardContent>
                <Typography variant='h6'>
                    {entry.date} <LocalHospital />
                </Typography>
                <Typography variant='h6'>{entry.description}</Typography>
                <Typography variant='h6'>diagnose by {entry.specialist}</Typography>
            </CardContent>
        </Card>
    );
};

const OccupationalHealthcareElement = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
        <Card key={entry.id} sx={{ marginBottom: '0.5em' }}>
            <CardContent>
                <Typography variant='h6'>
                    {entry.date} <Work /> {entry.employerName}
                </Typography>
                <Typography variant='h6'>{entry.description}</Typography>
                <Typography variant='h6'>diagnose by {entry.specialist}</Typography>
            </CardContent>
        </Card>
    );
};

const HealthCheckElement = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
        <Card key={entry.id} sx={{ marginBottom: '0.5em' }}>
            <CardContent>
                <Typography variant='h6'>
                    {entry.date} <MedicalServices />
                </Typography>
                <Typography variant='h6'>{entry.description}</Typography>
                <Typography variant='h6'>
                    <Favorite sx={{ color: HealthCheckColors[entry.healthCheckRating] }} />
                </Typography>
                <Typography variant='h6'>diagnose by {entry.specialist}</Typography>
            </CardContent>
        </Card>
    );
};

const PatientPage = ({ diagnoses }: Props) => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient>();
    const [error, setError] = useState<string>();
    const [formVisibility, setFormVisibility] = useState<boolean>(false);

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

    const closeForm = (): void => setFormVisibility(false);

    const submitNewEntry = async (values: EntryFormValues) => {
        if (!id) return;

        try {
            const patient = await patientService.addEntry(id, values);
            setPatient(patient);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data) {
                    console.error(e.response?.data?.error?.[0]?.message);
                    setError(e.response?.data?.error?.[0]?.message);
                } else {
                    setError('Unrecognized axios error');
                }
            } else {
                console.error('Unknown error', e);
                setError('Unknown error');
            }
        }
    };

    return (
        <div className='App'>
            <Typography variant='h4' sx={{ marginBottom: '0.5em' }}>
                {patient?.name} {patient?.gender === 'female' ? <Female fontSize='large' /> : <Male fontSize='large' />}
            </Typography>
            <Typography variant='h6'>ssn: {patient?.ssn}</Typography>
            <Typography variant='h6'>occupation: {patient?.occupation}</Typography>
            {error && (
                <Alert sx={{ marginBlock: 2 }} severity='error'>
                    {error}
                </Alert>
            )}
            <Button
                sx={{ marginBlock: 2, display: !formVisibility ? 'block' : 'none' }}
                variant='contained'
                size='large'
                color='primary'
                onClick={() => setFormVisibility(true)}>
                Add New Entry
            </Button>
            <AddEntryForm
                visibility={formVisibility}
                onSubmit={submitNewEntry}
                onClose={closeForm}
                diagnoses={diagnoses}
            />
            <Typography variant='h5' sx={{ marginBottom: '0.5em', marginTop: '0.5em' }}>
                entries
            </Typography>
            {patient?.entries.map((entry) => (
                <EntryDetails entry={entry} />
            ))}
        </div>
    );
};

export default PatientPage;
