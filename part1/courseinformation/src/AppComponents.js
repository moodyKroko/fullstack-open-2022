export const Header = (props) => {
  return <h1>{props.course}</h1>;
};

export const Content = ({ parts }) => {
  return (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

export const Total = ({ parts }) => {
  let total = 0;
  parts.forEach((part) => {
    total += part.exercises;
  });

  return <p>Number of exercises {total}</p>;
};
