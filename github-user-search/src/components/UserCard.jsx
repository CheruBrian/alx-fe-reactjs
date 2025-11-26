const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="user-card">
      <img src={user.avatar_url} alt="avatar" />
      <h2>{user.login}</h2>
      <p>Followers: {user.followers}</p>
      <p>Public Repos: {user.public_repos}</p>

      <a href={user.html_url} target="_blank">
        Visit GitHub Profile
      </a>
    </div>
  );
};

export default UserCard;
