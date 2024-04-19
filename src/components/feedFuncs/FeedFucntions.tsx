import axios from 'axios';
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useUserHook } from '../../hooks/useUserHook';

export const FeedFunctions = () => {
    const { user } = useUserHook();
    const [token, setToken] = useState(localStorage.getItem("token")) //set state to avoid error in path changing
    const [lastPage, setLastPage] = useState(() => {
        // Retrieve lastPage from localStorage or set it to 1 if not present
        const storedLastPage = localStorage.getItem('lastPage');
        return storedLastPage ? parseInt(storedLastPage) : 1;
    });

    useEffect(() => {
        // Save lastPage to localStorage whenever it changes
        localStorage.setItem('lastPage', lastPage.toString());
    }, [lastPage]);

    // useEffect(() => {
    //     //fix scroll in location change
    //     window.addEventListener('popstate', ()=>{});

    //     return () => {
    //         window.removeEventListener('popstate', ()=>{});
    //     };
    // }, []);

    const [path, setPath] = useState('https://api.pinky.ge/api/guestFeed?page=')
    useEffect(()=>{

      if(!user.name){
        setPath('https://api.pinky.ge/api/guestFeed?page=')
        setToken(token)
      }else{
        setPath('https://api.pinky.ge/api/authFeed?page=')
        setToken(localStorage.getItem("token"))
      }
      
      refetch
    },[user.userID,path])

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
                        },
                    }
                );
                setLastPage(response.data.posts.last_page);
                return response;
            } catch (error) {
                console.error(error)
            }
        },
        {
            getNextPageParam: (_lastPage, allPages) => {
                if (allPages.length >= lastPage) {
                    return;
                }
                return allPages.length + 1;
            },
        },
    );

    return { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, refetch, isFetching };
};