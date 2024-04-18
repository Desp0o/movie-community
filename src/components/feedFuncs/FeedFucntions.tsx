import axios from 'axios';
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useUserHook } from '../../hooks/useUserHook';

export const FeedFunctions = () => {
    const token = localStorage.getItem("token");
    const [lastPage, setLastPage] = useState(() => {
        // Retrieve lastPage from localStorage or set it to 1 if not present
        const storedLastPage = localStorage.getItem('lastPage');
        return storedLastPage ? parseInt(storedLastPage) : 1;
    });
    const { user } = useUserHook();

    useEffect(() => {
        // Save lastPage to localStorage whenever it changes
        localStorage.setItem('lastPage', lastPage.toString());
    }, [lastPage]);

    const [path, setPath] = useState(import.meta.env.VITE_GUEST_FEED)
    useEffect(()=>{
      if(user.userID){
        setPath(import.meta.env.VITE_FEED_POSTS)
      }else{
        setPath(import.meta.env.VITE_GUEST_FEED)
      }
    },[user])

    const {
        data,
        fetchNextPage,
        isLoading,
        isFetching,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery(
        ["feed-query",path],
        async ({ pageParam = 1 }) => {
            try {
                const response = await axios.get(`${path}${pageParam}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setLastPage(response.data.posts.last_page);
                return response;
            } catch (error) {
                throw new Error('Failed to fetch data');
            }
        },
        {
            getNextPageParam: (_lastPage, allPages) => {
                if (allPages.length >= lastPage) {
                    return;
                }
                return allPages.length + 1;
            },
        }
    );

    return { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, refetch, isFetching };
};