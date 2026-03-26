import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    
    if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) {
        return res.status(400).json({
            error: 'malformatted parameters',
        });
    }

    const bmi = calculateBmi(Number(height), Number(weight));
    
    return res.json({
        height,
        weight,
        bmi,
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises }: any = req.body;

     if (target === undefined || daily_exercises === undefined) {
         return res.status(400).json({
             error: 'parameters missing',
         });
     }

    if (
        isNotNumber(target) ||
        !Array.isArray(daily_exercises) ||
        daily_exercises.some((h) => isNotNumber(h))
    ) {
        return res.status(400).json({
            error: 'malformatted parameters',
        });
    }

    const hours: number[] = daily_exercises.map((h) => Number(h));

    return res.json(
        calculateExercises(hours, Number(target)),
    );
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
