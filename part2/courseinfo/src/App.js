function App() {
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];


  return (
    <>
      <Course course={course} />
      <Total parts={course.parts} />
    </>
  );
}

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
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

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        );
      })}
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return <h4>total of {total} exercises</h4>;
};
export default App;
