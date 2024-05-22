import axios from 'axios';
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useUserHook } from '../../hooks/useUserHook';
// declare global {
//     interface Window {
//         Echo: Echo;
//     }
// }


// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';
// window.Pusher = Pusher;
 
// window.Echo = new Echo({
//     broadcaster: "pusher",
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? "mt1",
//     wsHost: import.meta.env.VITE_PUSHER_HOST
//         ? import.meta.env.VITE_PUSHER_HOST
//         : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? "https") === "https",
//     enabledTransports: ["ws", "wss"],
// });

export const FeedFunctions = () => {
    const { user } = useUserHook();
    const [token, setToken] = useState(localStorage.getItem("token")) //set state to avoid error in path changing
    const [lastPage, setLastPage] = useState(() => {
        // Retrieve lastPage from localStorage or set it to 1 if not present
        const storedLastPage = localStorage.getItem('lastPage');
        return storedLastPage ? parseInt(storedLastPage) : 1;
    });

    useEffect(() => {
        localStorage.setItem('lastPage', lastPage?.toString());
    }, [lastPage]);


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

    // useEffect(() => {
    //     window.Echo.channel('posts') // Replace 'posts' with your channel name
    //         .listen('.post.created', (event) => { // Replace '.post.created' with your event name
    //             // Handle the received event, e.g., update the state or trigger a refetch
    //             console.log('New post created:', event.post);
    //             refetch(); // Refetch data to update the feed
    //         });

    //     return () => {
    //         // Unsubscribe from the channel when the component unmounts
    //         window.Echo.leave('posts');
    //     };
    // }, []);

    return { data,isFetched, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, refetch, isFetching };
};