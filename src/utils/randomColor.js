const randomArray = (range) => {
  const length = range.length;
  const randomIndex = Math.floor(length * Math.random());
  return range[randomIndex];
};

const randomColor = () => {
  const range = ['8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  return '#' + randomArray(range) + randomArray(range) + randomArray(range) + randomArray(range) + randomArray(range) + randomArray(range)
};

export default randomColor;