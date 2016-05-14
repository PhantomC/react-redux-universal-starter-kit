import faker from 'faker';

const generateArticles = () => {
  let articles = [];

  const getFakeBody = function(paragraphs) {
    let body = '';
    for (let i = 0; i < paragraphs; i++) {
      body = `${body}<p>${faker.lorem.paragraphs(1)}</p>`;
    }
    return body;
  };

  for (let i = 0; i < 10; ++i) {
    const title = faker.lorem.sentence();

    articles.push({
      id: i + 1,
      title: title,
      excerpt: faker.lorem.paragraphs(1),
      body: getFakeBody(8),
      tags: title.replace('.', '').split(' '),
      memberId: Math.floor((Math.random() * 3) + 2)
    });
  }

  return articles;
};

export default () => {
  return {
    articles: generateArticles(),
    members: [
      {
        id: 1,
        name: 'Suranart Niamcome',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/alxleroydeval/128.jpg'
      }, {
        id: 2,
        name: faker.name.findName(),
        avatar: faker.image.avatar()
      }, {
        id: 3,
        name: faker.name.findName(),
        avatar: faker.image.avatar()
      }, {
        id: 4,
        name: faker.name.findName(),
        avatar: faker.image.avatar()
      }
    ]
  };
};