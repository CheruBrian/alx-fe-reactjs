import { useQuery } from '@tanstack/react-query';

export default function PostsComponent() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      return res.json();
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts</p>;

  return (
    <div>
        <QueryClientProvider client={queryClient}>
        <PostsComponent />
      </QueryClientProvider>
      
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
