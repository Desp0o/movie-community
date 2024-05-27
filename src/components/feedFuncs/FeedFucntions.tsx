import axios from 'axios';
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useUserHook } from '../../hooks/useUserHook';
import { useRefetchHook } from '../../hooks/useRefetchHook';

export const FeedFunctions = () => {
    const {requestRefetch} = useRefetchHook()
    const { user } = useUserHook();
    const [token, setToken] = useState(localStorage.getItem("token")) //set state to avoid error in path changing
    const [lastPage, setLastPage] = useState(0)


    const [path, setPath] = useState('https://api.pinky.ge/api/guestFeed?page=')
    useEffect(()=>{

      if(!user.name){
        setPath('https://api.pinky.ge/api/guestFeed?page=')
        setToken(token)
      }
      if(user.userID){
        setPath('https://api.pinky.ge/api/authFeed?page=')
        setToken(localStorage.getItem("token"))
      }
      
      refetch();

      
    },[user, token])

    const {
        data,
        fetchNextPage,
        isLoading,
        isFetching,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        isFetched,
    } = useInfiniteQuery(
        ["feed-query",{path, requestRefetch}],
        async ({ pageParam = 1 }) => {
            try {
                const response = await axios.get(`${path}${pageParam}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setLastPage(response?.data?.posts?.last_page);
                return response;
            } catch (error) {
                console.error(error)
            }
        },
        {
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length >= lastPage) {
                    return;
                }
                return pages.length + 1;
            },
        },
    );


    return { data,isFetched, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, refetch, isFetching };
};