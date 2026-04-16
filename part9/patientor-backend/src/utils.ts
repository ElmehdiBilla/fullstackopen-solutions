import { z } from 'zod';
import { Entry, Gender, NewPatientEntry } from './types';

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});

const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal('Hospital'),
    discharge: z.object({
        date: z.string(),
        criteria: z.string(),
    }),
});

const OccupationalEntrySchema = BaseEntrySchema.extend({
    type: z.literal('OccupationalHealthcare'),
    employerName: z.string(),
    sickLeave: z
        .object({
            startDate: z.string(),
            endDate: z.string(),
        })
        .optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal('HealthCheck'),
    healthCheckRating: z.number().int().min(0).max(3),
});

export const NewEntrySchema = z.discriminatedUnion('type', [
    HospitalEntrySchema,
    OccupationalEntrySchema,
    HealthCheckEntrySchema,
]);

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
