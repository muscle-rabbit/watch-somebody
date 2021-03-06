import * as React from 'react';
import styled from 'styled-components';
import { Subscribe } from 'unstated-typescript';

import Tweet from '../organism/Tweet';
import ProgramsContainer from '../../containers/ProgramsContainer';
import TwitterTimeLineContainer from '../../containers/TwitterTimeLineContainer';
import NewsContainer, { INews } from '../../containers/NewsContainer';
import Program from '../organism/Program';
import News from '../organism/News';

interface Props {}

const component: React.FC<Props> = () => {
  return (
    <Subscribe
      to={[TwitterTimeLineContainer, ProgramsContainer, NewsContainer]}
    >
      {(timeline, programs, news) => {
        return (
          <OutWrapper>
            <Timeline>
              <h1>タイムライン</h1>
              {timeline.state.timeline.map((tweet, i) => (
                <Tweet
                  key={tweet.id}
                  name={tweet.user.name}
                  screen_name={tweet.user.screen_name}
                  profile_image_url_https={tweet.user.profile_image_url_https}
                  url={`https://twitter.com/${tweet.user.screen_name}`}
                  text={tweet.full_text}
                  favorite_count={tweet.favorite_count}
                  created_at={tweet.created_at}
                />
              ))}
            </Timeline>
            <Programs>
              <h1>テレビ欄</h1>
              {programs.state.programs.map((program, i) => (
                <Program
                  key={i}
                  title={program.title}
                  schedule={program.schedule}
                  description={program.description}
                  genre={program.genre}
                  station={program.station}
                />
              ))}
            </Programs>
            <NewsList>
              <h1>News</h1>
              {news.state.newslist.map((news, i) => (
                <News key={i} header={news.header} contents={news.contents} />
              ))}
            </NewsList>
          </OutWrapper>
        );
      }}
    </Subscribe>
  );
};

export default component;

const OutWrapper = styled.div`
  display: flex;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
`;
const Programs = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
`;

const NewsList = styled.div``;
