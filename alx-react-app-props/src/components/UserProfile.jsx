 const UserProfile = (props) => {
   return (
     <div>
       <h2>{props.seContext}</h2>
       <p>Age: {props.UserContext}</p>
       <p>Bio: {props.react}</p>
     </div>
   );
 };
 
 export default UserProfile;