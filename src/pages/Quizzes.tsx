import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import StandartQuizComponent from '../components/singlePostComp/StandartQuizComponent';
import Footer from '../components/footer/Footer';

interface quizProps {
  id: number;
  name: string;
  user: {
    id: number;
    name: string;
  };
  created_at: string;
  img: string;
}

const fetchQuizzes = async ({ pageParam = 1 }) => {
  const res = await axios.get(`${import.meta.env.VITE_FETCH_QUIZZES}${pageParam}`);
  return res.data;
};

const QuizComponent = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery(
    ['quizzes'],
    fetchQuizzes,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.hasNextPage) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  console.log(data);

  return (
    <>
      <div className='quizz_list'>
        {data?.pages?.map((page) => page?.data?.map((quiz: quizProps) => (
          <StandartQuizComponent
            key={quiz.id}
            postUserId={quiz.user.id}
            postID={quiz.id}
            authorName={quiz.user.name}
            date={quiz.created_at}
            postTitle={quiz.name}
            quiz_id={quiz.id}
            avatar={quiz.img} />
        ))
        )}
        <div>
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? <button onClick={() => fetchNextPage()}>Load More</button>
              : 'Nothing more to load'}
        </div>
      </div>
      {!hasNextPage && !isLoading && <Footer />}
    </>
  );
};

export default QuizComponent;
