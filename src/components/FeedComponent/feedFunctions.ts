import axios from 'axios';
import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useUserHook } from '../../hooks/useUserHook';

export const FeedFunctions = () => {
    const token = localStorage.getItem("token");
    const [lastPage, setLastPage] = useState(0)
  const {user} = useUserHook()

    const {
        data,
        fetchNextPage,
        isLoading,
        hasNextPage,
        isFetchingNextPage,
        refetch,
      } = useInfiniteQuery(
        "feed-query",
        async ({ pageParam = 1 }) => {
          try {
            const response = await axios.get(user.userID ? `https://api.pinky.ge/api/authFeed?page=${pageParam}` : `https://api.pinky.ge/api/guestFeed?page=${pageParam}`
              ,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            setLastPage(response.data.posts.last_page)
            return response; // Return the data from the response, not the response itself
          } catch (error) {
            throw new Error('Failed to fetch data');
          }
        },
        {
          getNextPageParam: (_lastPage, allPages) => {
            if(allPages.length >= lastPage){
              return;
            }
            
            return allPages.length + 1;
          },
        }
      );


  return {data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, refetch}
}
