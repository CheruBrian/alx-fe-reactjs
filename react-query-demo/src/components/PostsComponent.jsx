import { useQuery } from '@tanstack/react-query';

export default function PostsComponent() {

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["posts"],

    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },

    // Added required options
    staleTime: 1000 * 60,               // 1 minute - data stays "fresh"
    cacheTime: 1000 * 60 * 5,           // 5 minutes - keeps cached data
    refetchOnWindowFocus: false,        // prevent auto refetch on tab focus
    keepPreviousData: true,             // keeps data during refetch
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching posts</p>;

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={() => refetch()}>Refetch</button>

      <ul>
        {data.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
