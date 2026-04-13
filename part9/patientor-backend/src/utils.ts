import { z } from 'zod';
import { Entry, Gender, NewPatientEntry } from './types';

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewPatientSchema.parse(object);
};

const isEntryType = (type: unknown): type is Entry['type'] => {
    return typeof type === 'string' && ['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(type);
};

export const parseEntries = (entries: unknown[]): Entry[] => {
    return entries.map((entry) => {
        if (
            !entry ||
            typeof entry !== 'object' ||
            !('type' in entry) ||
            !isEntryType((entry as { type: unknown }).type)
        ) {
            throw new Error('Invalid entry');
        }

        return entry as Entry;
    });
};

export default toNewPatientEntry;
