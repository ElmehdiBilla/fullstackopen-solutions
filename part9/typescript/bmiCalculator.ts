import { isNotNumber } from './utils';

interface bmiValues {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]): bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);

    if (bmi >= 30) return 'Obese range';
    if (bmi >= 25) return 'Overweight range';
    if (bmi >= 18.5) return 'Normal range';
    return 'Underweight range';
};

if (require.main === module) {
    try {
        const { height, weight } = parseArguments(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}