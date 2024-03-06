import "./Comments.css";
import Comment from "./Comment";
function Comments({relatedComments}) {

  console.log(relatedComments);

  return (
    <div className="comments">
      {relatedComments.map(commentData=>(
        <Comment content={commentData.content} key={commentData.id}></Comment>
        // <p>{commentData.content}</p>
      ))}
    </div>
  )
}

export default Comments
