import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { Link } from 'react-router-dom';

interface quizProps {
    id: number;
    name: string
}


const fetchQuizzes = async ({ pageParam = 1 }) => {
  const res = await axios.get(`${import.meta.env.VITE_FETCH_QUIZZES}${pageParam}`);
  return res.data;
};

const QuizComponent = () => {
  const {
    data,
  } = useInfiniteQuery(
    ['quizzes'],
    fetchQuizzes,
    {
      getNextPageParam: (lastPage, pages) => {
        // Assuming the API returns an indicator if there are more pages
        if (lastPage.hasNextPage) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );


  return (
    <div style={{paddingTop:"100px"}}>
      {data?.pages?.map((page, index) => (
        <div className='quizz_list' key={index}>
          {page?.data?.map((quiz: quizProps) => (
            <Link to={`/Quiz/${quiz.id}`} key={quiz.id}>{quiz.name}</Link>
          ))}
        </div>
      ))}
      <div>
        {/* <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button> */}
      </div>
    </div>
  );
};

export default QuizComponent;
