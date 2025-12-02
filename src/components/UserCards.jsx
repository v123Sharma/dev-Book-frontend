import React from 'react'

const UserCards = ({user}) => {
  const {firstName, lastName, photoUrl, gender, age, about} = user;
    
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Photo" />
  </figure>
  <div className="card-body">
    <h1 className="card-title flex justify-center">{firstName + " " + lastName}</h1>
    {age && gender && <h2>{age +", "+ gender}</h2>}
    <h3>{about}</h3>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Inetersted</button>
    </div>
    
  </div>
</div>
  )
}

export default UserCards;
