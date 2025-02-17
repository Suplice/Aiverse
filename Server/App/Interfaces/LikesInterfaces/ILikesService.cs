
using Server.App.Models;
public interface ILikesService
{   
    /// <summary>
    /// Retrieves a list of service IDs liked by a specific user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user.</param>
    /// <returns>A list of service IDs liked by the user if found; otherwise, null.</returns>
    /// <remarks>
    /// This method fetches all service IDs that the specified user has liked.
    /// </remarks>
    List<long>? GetLikedServices(long userId);

    /// <summary>
    /// Adds a like to a specific service for a user asynchronously.
    /// </summary>
    /// <param name="userId">The unique identifier of the user.</param>
    /// <param name="serviceId">The unique identifier of the service to like.</param>
    /// <returns>True if the like operation was successful; otherwise, false.</returns>
    /// <remarks>
    /// This method adds a like to the specified service for the given user.
    /// </remarks>
    Task<bool> LikeService(long userId, long serviceId);

    /// <summary>
    /// Adds a dislike to a specific review for a user asynchronously.
    /// </summary>
    /// <param name="userId">The unique identifier of the user.</param>
    /// <param name="reviewId">The unique identifier of the review to dislike.</param>
    /// <returns>True if the dislike operation was successful; otherwise, false.</returns>
    /// <remarks>
    /// This method adds a dislike to the specified review for the given user.
    /// </remarks>
    Task<bool> DislikeService(long userId, long reviewId);
}