import React, { useEffect } from 'react';

const Favorites = () => {
  useEffect(() => {
    document.title = 'Favorites - Notedly';
  });
  return (
    <div>
      <p>My favorites</p>
    </div>
  );
};

export default Favorites;
