import * as articleWatchers from 'shared/modules/article/watchers';
import * as memberWatchers from 'shared/modules/member/watchers';
import * as contactWatchers from 'shared/modules/contact/watchers';

export default function* rootSaga() {
  yield [
    articleWatchers.watchGetArticleLatest(),
    articleWatchers.watchGetSearchResults(),
    articleWatchers.watchGetArticleById(),
    articleWatchers.watchGetRelatedArticles(),
    articleWatchers.watchCreateNewArticle(),
    
    contactWatchers.watchSaveContactFormData(),

    memberWatchers.watchMemberLogin(),
    memberWatchers.watchMemberGetMyArticles(),

    articleWatchers.watchEditArticle(),
    articleWatchers.watchDeleteArticle(),
    articleWatchers.watchUpdateArticleById()
  ];
}