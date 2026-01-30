interface statistic {
    periodLength: number;
    trainingDays: number;
    success: Boolean;
    rating: number;
    ratingDescription: string;
    target: Number;
    average: number;
}

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
