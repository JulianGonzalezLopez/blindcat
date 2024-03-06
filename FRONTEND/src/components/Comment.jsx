import "./Comment.css";

function Comment({content}) {

  console.log(content);

  return (
    <div className="comment">
      <p>{content}</p>
    </div>
  )
}

export default Comment
