import React, { useEffect } from 'react';

const MyNotes = () => {
    useEffect(()=> {
document.title = 'My Notes - Notedly';
    });
    return(
        <div>
            <p>My notes</p>
        </div>
    );
};

export default MyNotes;