function Course({ courses }) {
  return (
    <>
      <Content courses={courses} />
    </>
  );
}

const Content = ({ courses }) => {
  return (
    <>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header title={course.name} />
            <Part parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        );
      })}
    </>
  );
};

const Header = ({ title }) => {
  return (
    <>
      <h1> {title} </h1>
    </>
  );
};

const Part = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        );
      })}
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return <h4>total of {total} exercises</h4>;
};

export default Course;
