import { SyntheticEvent, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
} from '@mui/material';
import { Diagnosis, EntryFormValues } from '../../types';

interface Props {
    diagnoses: Diagnosis[];
    visibility: boolean;
    onClose: () => void;
    onSubmit: (values: EntryFormValues) => void;
}

interface OccupationalHealthcareProps {
    setEmployerName: React.Dispatch<React.SetStateAction<string>>;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    employerName: string;
    startDate: string;
    endDate: string;
}

interface HospitalProps {
    setDate: React.Dispatch<React.SetStateAction<string>>;
    setCriteria: React.Dispatch<React.SetStateAction<string>>;
    date: string;
    criteria: string;
}

interface HealthCheckProps {
    setHealthCheckRating: React.Dispatch<React.SetStateAction<string>>;
    healthCheckRating: string;
}

type EntryType = 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';

const OccupationalHealthcareElement = ({
    employerName,
    startDate,
    endDate,
    setEmployerName,
    setStartDate,
    setEndDate,
}: OccupationalHealthcareProps) => {
    return (
        <Box>
            <TextField
                label='Employer Name'
                fullWidth
                variant='standard'
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
            />
            <FormControl fullWidth sx={{ pt: 3 }}>
                <FormLabel sx={{ pb: 2 }}>SickLeave</FormLabel>
                <Stack spacing={2} sx={{ px: 2 }}>
                    <TextField
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        type='date'
                        label='Start'
                        fullWidth
                        variant='standard'
                        value={startDate}
                        onChange={({ target }) => setStartDate(target.value)}
                    />
                    <TextField
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        type='date'
                        label='End'
                        fullWidth
                        variant='standard'
                        value={endDate}
                        onChange={({ target }) => setEndDate(target.value)}
                    />
                </Stack>
            </FormControl>
        </Box>
    );
};

const HospitalElement = ({ date, criteria, setDate, setCriteria }: HospitalProps) => {
    return (
        <Box>
            <FormControl fullWidth sx={{ pt: 2 }}>
                <FormLabel sx={{ pb: 2 }}>Discharge</FormLabel>

                <Stack sx={{ px: 2 }}>
                    <TextField
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        type='date'
                        label='Date'
                        variant='standard'
                        value={date}
                        onChange={({ target }) => setDate(target.value)}
                    />

                    <TextField
                        label='Criteria'
                        variant='standard'
                        value={criteria}
                        onChange={({ target }) => setCriteria(target.value)}
                    />
                </Stack>
            </FormControl>
        </Box>
    );
};

const HealthCheckElement = ({ healthCheckRating, setHealthCheckRating }: HealthCheckProps) => {
    return (
        <FormControl fullWidth>
            <InputLabel variant='standard'>Health Check Rating</InputLabel>
            <Select
                variant='standard'
                value={healthCheckRating}
                label='healthCheckRating'
                onChange={({ target }) => setHealthCheckRating(target.value)}>
                <MenuItem value={0}>Healthy</MenuItem>
                <MenuItem value={1}>LowRisk</MenuItem>
                <MenuItem value={2}>HighRisk</MenuItem>
                <MenuItem value={3}>CriticalRisk</MenuItem>
            </Select>
        </FormControl>
    );
};

const AddEntryForm = ({ diagnoses, visibility, onSubmit, onClose }: Props) => {
    const [type, setType] = useState<EntryType>('HealthCheck');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [employerName, setEmployerName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [criteria, setcriteria] = useState('');

    const closeForm = (): void => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setHealthCheckRating('');
        setDiagnosisCodes([]);
        onClose();
    };

    const addPatient = (event: SyntheticEvent) => {
        event.preventDefault();

        const baseEntry = {
            type,
            description,
            date,
            specialist,
            diagnosisCodes: diagnosisCodes,
        };

        let entry: EntryFormValues;

        switch (type) {
            case 'Hospital':
                entry = {
                    ...baseEntry,
                    type: 'Hospital',
                    discharge: {
                        date: dischargeDate,
                        criteria,
                    },
                };
                break;

            case 'OccupationalHealthcare':
                entry = {
                    ...baseEntry,
                    type: 'OccupationalHealthcare',
                    employerName,
                    sickLeave: {
                        startDate,
                        endDate,
                    },
                };
                break;

            case 'HealthCheck':
                entry = {
                    ...baseEntry,
                    type: 'HealthCheck',
                    healthCheckRating: Number(healthCheckRating),
                };
                break;

            default:
                throw new Error('Unknown entry type');
        }

        onSubmit(entry);
    };

    const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <Box component='section' sx={{ p: 2, border: '1px dashed grey', display: visibility ? 'block' : 'none' }}>
            <form onSubmit={addPatient}>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Entry Type</FormLabel>
                        <RadioGroup row value={type} onChange={({ target }) => setType(target.value as EntryType)}>
                            <FormControlLabel value='HealthCheck' control={<Radio />} label='HealthCheck' />
                            <FormControlLabel value='Hospital' control={<Radio />} label='Hospital' />
                            <FormControlLabel
                                value='OccupationalHealthcare'
                                control={<Radio />}
                                label='OccupationalHealthcare'
                            />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        label='Description'
                        fullWidth
                        variant='standard'
                        value={description}
                        onChange={({ target }) => setDescription(target.value)}
                    />
                    <TextField
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        type='date'
                        label='Date'
                        fullWidth
                        variant='standard'
                        value={date}
                        onChange={({ target }) => setDate(target.value)}
                    />
                    <TextField
                        label='Specialist'
                        fullWidth
                        variant='standard'
                        value={specialist}
                        onChange={({ target }) => setSpecialist(target.value)}
                    />
                    <FormControl fullWidth>
                        <InputLabel variant='standard'>Diagnosis Codes</InputLabel>

                        <Select
                            multiple
                            variant='standard'
                            value={diagnosisCodes}
                            onChange={handleSelectChange}
                            label='Diagnosis Codes'
                            renderValue={(selected) => (selected as string[]).join(', ')}>
                            {diagnoses.map((opt) => (
                                <MenuItem key={opt.name} value={opt.code}>
                                    {opt.code}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {(() => {
                        switch (type) {
                            case 'HealthCheck':
                                return (
                                    <HealthCheckElement
                                        healthCheckRating={healthCheckRating}
                                        setHealthCheckRating={setHealthCheckRating}
                                    />
                                );
                            case 'OccupationalHealthcare':
                                return (
                                    <OccupationalHealthcareElement
                                        employerName={employerName}
                                        startDate={startDate}
                                        endDate={endDate}
                                        setEmployerName={setEmployerName}
                                        setStartDate={setStartDate}
                                        setEndDate={setEndDate}
                                    />
                                );
                            case 'Hospital':
                                return (
                                    <HospitalElement
                                        date={dischargeDate}
                                        criteria={criteria}
                                        setDate={setDischargeDate}
                                        setCriteria={setcriteria}
                                    />
                                );
                            default:
                                break;
                        }
                    })()}
                    <Stack
                        spacing={2}
                        direction='row'
                        sx={{
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                        }}>
                        <Button variant='contained' color='error' onClick={closeForm}>
                            cancel
                        </Button>
                        <Button type='submit' variant='contained' color='primary'>
                            Add
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};

export default AddEntryForm;
