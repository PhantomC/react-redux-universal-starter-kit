import faker from 'faker';

const generateArticles = () => {
  let articles = [];

  const getFakeBody = function(paragraphs) {
    let body = '';
    for (let i = 0; i < paragraphs; i++) {
      body = `${body}<p>${faker.lorem.paragraphs(1)}</p>`;
    }
    return body;
  } 

  for (let i = 0; i < 500; ++i) {
    const title = faker.lorem.sentence();

    articles.push({
      id: i + 1,
      title: title,
      body: getFakeBody(8),
      author: {
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
      },
      tags: title.replace('.', '').split(' '),
      date: faker.date.past()
    });
  }

  return articles;
};

export default () => {
  return {
    articles: generateArticles()
  };
};