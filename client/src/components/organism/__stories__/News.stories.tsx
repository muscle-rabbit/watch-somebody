import * as React from 'react';
import { storiesOf } from '@storybook/react';
import News from '../News';
import { INews } from '../../../containers/NewsContainer';

storiesOf('News', module).add('with text', () => {
  const header = {
    title: 'Hey Hey mizuno',
    link: 'https://codesandbox.io/s/xv40xXQzE',
    updated: '2019-05-28T05:30:00.000000000Z'
  };
  const contents =
    '<ol><li><a href="https://natalie.mu/owarai/news/333214" target="_blank">天国の相方へ捧ぐ、千鳥大悟、ナイツ塙、ノブコブ徳井が弔辞シミュレーション</a>&nbsp;&nbsp;<font color="#6f6f6f">ナタリー</font></li><li><a href="https://news.dwango.jp/entertainment/37907-1905" target="_blank">千鳥・ノブも思わず感動、大悟が相方に送る弔辞の言葉とは？</a>&nbsp;&nbsp;<font color="#6f6f6f">ドワンゴジェイピーnews</font></li><li><strong><a href="https://news.google.com/stories/CAAqOQgKIjNDQklTSURvSmMzUnZjbmt0TXpZd1NoTUtFUWlrbTg2bms0QU1FWkRoVGlGVVVlNGlLQUFQAQ?oc=5" target="_blank">Google ニュースですべての記事を表示</a></strong></li></ol>';
  return <News header={header} contents={contents} />;
});
