import "./Comment.css";

function Comment({content,username}) {

  console.log(content);

  return (
    <div className="comment">
      <p className="comment-text">{content}</p>
      <p className="creator">- {username}</p>
    </div>
  )
}

export default Comment
