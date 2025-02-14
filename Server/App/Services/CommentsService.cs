using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;

namespace Server.App.Services
{
    public class CommentsService : ICommentsService
    {

        private readonly ICommentsRepository _CommentsRepository;

        public CommentsService(ICommentsRepository CommentsRepository)
        {
            _CommentsRepository = CommentsRepository;
        }
        public async Task<Comment?> AddComment(RequestAddCommentDTO comment)
        {
            var newComment = new Comment
            {
                CommentValue = comment.CommentValue,
                UserId = comment.UserId,
                ReviewId = comment.ReviewId,
                ParentId = comment.ParentId == 0 ? null : comment.ParentId,
                HasReplies = false,
                CreatedAt = DateTime.Now,
                Likes = 0,
                Dislikes = 0
            };

            var result = await _CommentsRepository.AddComment(newComment);

            return result;
        }

        public List<Comment>? GetReviewComments(long reviewId)
        {
            var result = _CommentsRepository.GetReviewComments(reviewId);

            return result;
        }

        public List<Comment>? GetCommentComments(long commentId)
        {
            var result = _CommentsRepository.GetCommentReplies(commentId);

            return result;
        }
    }
}