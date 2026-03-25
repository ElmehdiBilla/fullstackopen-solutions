import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    
    if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) {
        res.status(400).json({
            error: 'malformatted parameters',
        });
    }

    const bmi = calculateBmi(Number(height), Number(weight));
    
    res.json({
        height,
        weight,
        bmi,
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
