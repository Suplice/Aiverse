using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;

namespace Server.App.Services
{   
    /// <summary>
    /// Provides services for managing comments, including adding comments and retrieving comments for reviews or replies.
    /// This service interacts with the <see cref="ICommentsRepository"/> to perform database operations.
    /// </summary>
    /// <remarks>
    /// The <see cref="CommentsService"/> class is responsible for handling business logic related to comments,
    /// such as adding new comments, retrieving comments for a specific review, or fetching replies to a comment.
    /// </remarks>
    public class CommentsService : ICommentsService
    {

        private readonly ICommentsRepository _CommentsRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="CommentsService"/> class.
        /// </summary>
        /// <param name="CommentsRepository">The repository used for comment data access.</param>
        /// <remarks>
        /// This constructor injects the <see cref="ICommentsRepository"/> dependency, which is used to perform database operations.
        /// </remarks>
        public CommentsService(ICommentsRepository CommentsRepository)
        {
            _CommentsRepository = CommentsRepository;
        }

        /// <inheritdoc/>
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

        /// <inheritdoc/>
        public List<Comment>? GetReviewComments(long reviewId)
        {
            var result = _CommentsRepository.GetReviewComments(reviewId);

            return result;
        }

        /// <inheritdoc/>
        public List<Comment>? GetCommentComments(long commentId)
        {
            var result = _CommentsRepository.GetCommentReplies(commentId);

            return result;
        }
    }
}