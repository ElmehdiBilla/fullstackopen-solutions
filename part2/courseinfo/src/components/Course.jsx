const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) =>
    parts.map((part, i) => <Part key={i} part={part} />);

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
);

const Total = ({ total }) => <p>total of {total} exercises</p>;

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total
                total={
                    course.parts[0].exercises +
                    course.parts[1].exercises +
                    course.parts[2].exercises
                }
            />
        </>
    );
};

export default Course;
