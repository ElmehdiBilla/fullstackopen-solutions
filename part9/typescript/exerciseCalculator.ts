interface statistic {
    periodLength: number;
    trainingDays: number;
    success: Boolean;
    rating: number;
    ratingDescription: string;
    target: Number;
    average: number;
}

interface exerciseValues {
    target: number;
    dailyHours: number[];
}

const parseArguments = (args: string[]): exerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[2]);
    const dailyHours = args.slice(3).map((n) => Number(n));

    if (isNaN(target) || dailyHours.some((h) => isNaN(h))) {
        throw new Error('Provided values were not numbers!');
    }

    return {
        target,
        dailyHours,
    };
};

const calculateExercises = (dailyExerciseHours: number[], target: number): statistic => {
    const periodLength: number = dailyExerciseHours.length;
    const trainingDays: number = dailyExerciseHours.filter((h) => h > 0).length;
    const average: number = dailyExerciseHours.reduce((acc, h) => acc + h, 0) / periodLength;
    const success: boolean = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'Superior effort; you have surpassed the mark';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'you need to exercise more';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};


try {
    const { target, dailyHours } = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours,target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

