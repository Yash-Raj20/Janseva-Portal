import CommentSection from '../components/CommentSection';

function IssueDetails({ issue }) {
  return (
    <div className="p-6">
      {/* Issue details above */}
      <CommentSection issueId={issue._id} />
    </div>
  );
}

export default IssueDetails;
