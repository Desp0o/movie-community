import axios from 'axios';
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useUserHook } from '../../hooks/useUserHook';
import { setFeedPath } from '../../Redux/pagePath';

interface RootState {
    feedStore:{
        feedPathStatus: string;
    }
}

export const FeedFunctions = () => {    
    const feedPathReduxStore = useSelector((state:RootState) => state.feedStore.feedPathStatus)
    const [lastPage, setLastPage] = useState(() => {
        const storedLastPage = localStorage.getItem('lastPage');
        return storedLastPage ? parseInt(storedLastPage) : 1;
    });
    const { user } = useUserHook()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(user.isAuthenticated){
            dispatch(setFeedPath(import.meta.env.VITE_AUTH_FEED))
        }else{
            dispatch(setFeedPath(import.meta.env.VITE_GUEST_FEED))
        }
    },[user, dispatch])


    useEffect(() => {
        localStorage.setItem('lastPage', lastPage?.toString());
    }, [lastPage]);


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
        ["feed-query",{feedPathReduxStore}],
        async ({ pageParam = 1 }) => {
            const token = localStorage.getItem("token")

            try {
                const response = await axios.get(`${feedPathReduxStore}${pageParam}`,
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
            getNextPageParam: (_lastPage, allPages) => {
                if (allPages.length >= lastPage) {
                    return;
                }
                return allPages.length + 1;
            },
        },
    );


    return { data,isFetched, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, refetch, isFetching };
};