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

  for (let i = 0; i < 10; ++i) {
    const title = faker.lorem.sentence();

    articles.push({
      id: i + 1,
      title: title,
      excerpt: faker.lorem.paragraphs(1),
      body: getFakeBody(8),
      author: {
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
      },
      tags: title.replace('.', '').split(' ')
    });
  }

  return articles;
};

export default () => {
  return {
    articles: generateArticles()
  };
};