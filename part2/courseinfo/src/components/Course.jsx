const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) =>
    parts.map((part, i) => <Part key={i} part={part} />);

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
);

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </>
    );
};

export default Course;
