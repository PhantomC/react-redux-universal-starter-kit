import * as articleWatchers from 'shared/modules/article/watchers';
import * as memberWatchers from 'shared/modules/member/watchers';
import * as contactWatchers from 'shared/modules/contact/watchers';

export default function* rootSaga() {

  let watchers = [];
  let mergedWatchers = {
    ...articleWatchers, 
    ...memberWatchers, 
    ...contactWatchers
  };

  for (let watcher in mergedWatchers) {
    watchers.push(mergedWatchers[watcher]());
  }

  yield watchers;
}