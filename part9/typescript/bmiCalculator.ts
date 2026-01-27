const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);

    if (bmi >= 30) return 'Obese range';
    if (bmi >= 25) return 'Overweight range';
    if (bmi >= 18.5) return 'Normal Weight';
    return 'Underweight range';
};

console.log(calculateBmi(180, 74));
