import "./Comment.css";

function Comment({content,username}) {

  console.log(content);

  return (
    <div className="comment">
      <p>{content}</p>
      <p>{username}</p>
    </div>
  )
}

export default Comment
