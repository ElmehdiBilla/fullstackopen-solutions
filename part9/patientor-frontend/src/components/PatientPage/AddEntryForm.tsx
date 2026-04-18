import { SyntheticEvent, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { EntryFormValues } from '../../types';

interface Props {
    visibility: boolean;
    onClose: () => void;
    onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ visibility, onSubmit, onClose }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');

    const closeForm = (): void => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setHealthCheckRating('');
        setDiagnosisCodes('');
        onClose();
    };

    const addPatient = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
            type:'HealthCheck',
            description,
            date,
            specialist,
            healthCheckRating: Number(healthCheckRating),
            diagnosisCodes: diagnosisCodes.split(','),
        });
    };

    return (
        <Box component='section' sx={{ p: 2, border: '1px dashed grey', display:visibility ? 'block' : 'none' }}>
            <form onSubmit={addPatient}>
                <Stack spacing={2}>
                    <Typography variant='h6'>New HealtCheck entry</Typography>
                    <TextField
                        label='Description'
                        fullWidth
                        variant='standard'
                        value={description}
                        onChange={({ target }) => setDescription(target.value)}
                    />
                    <TextField
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
                    <TextField
                        label='healthCheckRating'
                        fullWidth
                        variant='standard'
                        value={healthCheckRating}
                        onChange={({ target }) => setHealthCheckRating(target.value)}
                    />
                    <TextField
                        label='diagnosis Codes'
                        fullWidth
                        variant='standard'
                        value={diagnosisCodes}
                        onChange={({ target }) => setDiagnosisCodes(target.value)}
                    />
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
