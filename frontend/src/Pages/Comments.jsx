import { useState, useEffect } from 'react';
import "../Style/Comments.css";
import { useLocation } from "react-router-dom";

function Comments({ movieId }) {

  const location = useLocation();
  const {movieName} = location.state || {} ;

  const [commentText, setCommentText] = useState('');
  const [allComments, setAllComments] = useState([]);

  const user = JSON.parse(localStorage.getItem("userCredentials"));
  //console.log("comments ont the movie", allComments);

  const fetchComment = async() => {

        
        if(!movieName)return;
        try {
        
          const res = await fetch(`http://localhost:5000/comments/${movieName}`)
          const data  = await res.json();
          setAllComments(data);
          
        }catch(e) {
          console.error("Failed to fetch comments:", e.message);
        }
        
      };

    useEffect( () => {
      
    fetchComment();
      
    }, [movieName])

  const handleAddComment = async(e) => {
    e.preventDefault();
    try{
      const res = await fetch(`http://localhost:5000/comments/${movieName}`, {
        method : 'POST', 
        headers : {"Content-Type": "application/json"}, 
        body : JSON.stringify({ movieName : movieName , userId : user._id, comment : commentText }),
      })
      //const data = await res.text();
      alert("comment added");
      setCommentText('');
      fetchComment(); 
    }catch(e){
      console.log("E at handleAddComment FE : ", e.message);
    }
    


  }
  
  return (
    <div className="commentsContainer">
      <h3>{movieName}</h3>

      <div className="addCommentBox">
        <textarea
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleAddComment}>Add</button>
      </div>

      <div className="commentList">
        {allComments.length > 0 ? (
          allComments.map((comment, i) => (
            <div className="commentItem" key={i}>
              <div className="commentHeader">
                <span className="username"><strong>{comment.userId?.name}</strong></span>
                <span className="commentDate">{new Date(comment.createAt).toLocaleString()}</span>
                
              </div>
              <p>{comment.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments on this movie</p>
        )}
      </div>
    </div>
  );
}

export default Comments;
