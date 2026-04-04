interface HeaderProps {
    name: string;
}

interface TotalProps {
    total: number;
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartDetails extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartDetails {
    kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: 'group';
}

interface CoursePartBackground extends CoursePartDetails {
    backgroundMaterial: string;
    kind: 'background';
}

interface CoursePartSpecial extends CoursePartDetails {
    requirements: string[];
    kind: 'special';
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface ContentProps {
    parts: CoursePart[];
}

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Header = ({ name }: HeaderProps) => {
    return <h1>{name}</h1>;
};

const Part = ({ part }: { part: CoursePart }) => {
    return (
        <div>
            <h3>
                {part.name} {part.exerciseCount}
            </h3>
            {(() => {
                switch (part.kind) {
                    case 'basic':
                        return (
                            <>
                                <p>{part.description}</p>
                            </>
                        );
                    case 'group':
                        return (
                            <>
                                <p>Group Project count: {part.groupProjectCount}</p>
                            </>
                        );
                    case 'background':
                        return (
                            <>
                                <p>{part.description}</p>
                                <p>Background Material: {part.backgroundMaterial}</p>
                            </>
                        );
                    case 'special':
                        return (
                            <>
                                <p>{part.description}</p>
                                <p>Required skills: {part.requirements.join(', ')}</p>
                            </>
                        );
                    default:
                        return assertNever(part);
                }
            })()}
        </div>
    );
};

const Content = ({ parts }: ContentProps) => {
    return parts.map((part) => (
        <div key={part.name}>
            <Part part={part} />
        </div>
    ));
};

const Total = ({ total }: TotalProps) => {
    return <p>Number of exercises {total}</p>;
};

const App = () => {
    const courseName = 'Half Stack application development';
    const courseParts: CoursePart[] = [
        {
            name: 'Fundamentals',
            exerciseCount: 10,
            description: 'This is an awesome course part',
            kind: 'basic',
        },
        {
            name: 'Using props to pass data',
            exerciseCount: 7,
            groupProjectCount: 3,
            kind: 'group',
        },
        {
            name: 'Basics of type Narrowing',
            exerciseCount: 7,
            description: 'How to go from unknown to string',
            kind: 'basic',
        },
        {
            name: 'Deeper type usage',
            exerciseCount: 14,
            description: 'Confusing description',
            backgroundMaterial: 'https://type-level-typescript.com/template-literal-types',
            kind: 'background',
        },
        {
            name: 'TypeScript in frontend',
            exerciseCount: 10,
            description: 'a hard part',
            kind: 'basic',
        },
        {
            name: 'Backend development',
            exerciseCount: 21,
            description: 'Typing the backend',
            requirements: ['nodejs', 'jest'],
            kind: 'special',
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
