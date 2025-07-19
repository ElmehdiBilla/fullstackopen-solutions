import Header from "./Header";
import Content from "./content";
import Total from "./Total";

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total
                total={
                    course.parts.reduce((sum,p) => sum + p.exercises , 0)
                }
            />
        </>
    );
};

export default Course;
