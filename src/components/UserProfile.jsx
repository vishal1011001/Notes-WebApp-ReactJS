export function UserProfile({ userInfo }) {

  return (
    <div className="user-profile-main-div">
      <div className="user-pfp-div">
        <img src="/user.png" height={80}/>
      </div>
      <div className="user-details-div">
        <h4>User Name: {userInfo.userName}</h4>
        <p>Email: {userInfo.email}</p>
      </div>
    </div>
  );
}