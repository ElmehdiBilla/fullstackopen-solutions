interface HeaderProps {
    name: string;
}

interface TotalProps {
    total: number;
}

interface Course {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    parts: Course[];
}

const Header = ({ name }: HeaderProps) => {
    return <h1>{name}</h1>;
};

const Content = ({ parts }: ContentProps) => {
    return parts.map((item) => (
        <p key={item.name}>
            {item.name} {item.exerciseCount}
        </p>
    ));
};

const Total = ({ total }: TotalProps) => {
    return <p>Number of exercises {total}</p>;
};

const App = () => {
    const courseName = 'Half Stack application development';
    const courseParts = [
        {
            name: 'Fundamentals',
            exerciseCount: 10,
        },
        {
            name: 'Using props to pass data',
            exerciseCount: 7,
        },
        {
            name: 'Deeper type usage',
            exerciseCount: 14,
        },
    ];

    const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

    return (
        <div>
            <Header name={courseName} />
            <Content parts={courseParts} />
            <Total total={totalExercises} />
        </div>
    );
};

export default App;
