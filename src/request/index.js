const fetchQuestions = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;

  const response = await fetch(URL);
  const results = await response.json();

  return results;
};

export default fetchQuestions;
