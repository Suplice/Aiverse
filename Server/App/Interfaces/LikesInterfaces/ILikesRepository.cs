using Server.App.Models;
public interface ILikesRepository
{   

    /// <summary>
    /// Asynchronously removes a like for a specific service by a user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user.</param>
    /// <param name="serviceId">The unique identifier of the AI service.</param>
    /// <returns>
    /// True if the operation is successful; otherwise, false.
    /// </returns>
    /// <remarks>
    /// This method removes a like from the application database context, disassociating the user from the liked service.
    /// If the like is not found or an exception occurs, it is logged, and the method returns false.
    /// </remarks>
    Task<bool> DislikeService(long userId, long serviceId);

    /// <summary>
    /// Asynchronously adds a like for a specific service by a user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user.</param>
    /// <param name="serviceId">The unique identifier of the AI service.</param>
    /// <returns>
    /// True if the operation is successful; otherwise, false.
    /// </returns>
    /// <remarks>
    /// This method inserts a new like into the Supabase database, associating the user with the liked service.
    /// If an exception occurs, it is logged, and the method returns false.
    /// </remarks>
    Task<bool> LikeService(long userId, long serviceId);

    /// <summary>
    /// Retrieves a list of service IDs liked by a specific user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user.</param>
    /// <returns>
    /// A list of service IDs (as <see cref="long"/>) if the operation is successful; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method queries the application database context to retrieve all service IDs liked by the specified user.
    /// If an exception occurs, it is logged, and the method returns null.
    /// </remarks>
    List<long>? GetLikedServices(long userId);
}