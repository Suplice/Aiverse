using Server.App.Models;

public interface IUserService
{   
    /// <summary>
    /// Retrieves a user by their unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the user.</param>
    /// <returns>The <see cref="User"/> object if found; otherwise, null.</returns>
    /// <remarks>
    /// This method fetches the user details from the database based on the provided user ID.
    /// </remarks>
    Task<User?> GetUserById(long id);

    /// <summary>
    /// Retrieves a user by their email address asynchronously.
    /// </summary>
    /// <param name="email">The email address of the user to retrieve.</param>
    /// <returns>The <see cref="User"/> object if found; otherwise, null.</returns>
    /// <exception cref="ArgumentException">Thrown if the email is null or empty.</exception>
    /// <remarks>
    /// This method fetches the user details from the database based on the provided email address.
    /// </remarks>
    Task<User?> GetUserByEmailAsync(string email);

    /// <summary>
    /// Attempts to update a user's email address after checking if the new email is already in use.
    /// </summary>
    /// <param name="id">The unique identifier of the user.</param>
    /// <param name="newEmail">The new email address to set.</param>
    /// <returns>True if the email was updated successfully; otherwise, false.</returns>
    /// <remarks>
    /// This method checks if the new email is already in use by another user. If not, it updates the user's email address.
    /// </remarks>
    Task<bool> TryUpdateUserEmailAsync(long id, string newEmail);

    /// <summary>
    /// Updates a user's information in the database.
    /// </summary>
    /// <param name="user">The <see cref="User"/> object containing the updated user information.</param>
    /// <remarks>
    /// This method updates the user's details in the database.
    /// </remarks>
    Task UpdateUser(User user);

    /// <summary>
    /// Saves a user's profile image and updates the user's record with the new image path.
    /// </summary>
    /// <param name="userId">The unique identifier of the user.</param>
    /// <param name="image">The image file to save, provided as an <see cref="IFormFile"/> object.</param>
    /// <returns>The relative file path of the saved image.</returns>
    /// <exception cref="ArgumentException">Thrown if the user is not found.</exception>
    /// <remarks>
    /// This method saves the uploaded image to the server and updates the user's profile picture path in the database.
    /// </remarks>
    Task<string> SaveUserImageAsync(long userId, IFormFile image);

    /// <summary>
    /// Updates a user's password after validating the new password.
    /// </summary>
    /// <param name="id">The unique identifier of the user.</param>
    /// <param name="newPassword">The new password to set.</param>
    /// <exception cref="ArgumentException">
    /// Thrown if:
    /// - The user is not found.
    /// - The new password is empty.
    /// - The new password is less than 6 characters long.
    /// - The new password does not meet complexity requirements.
    /// - The new password is the same as the current password.
    /// </exception>
    /// <remarks>
    /// This method validates the new password and updates the user's password in the database using BCrypt for secure hashing.
    /// </remarks>
    Task UpdateUserPasswordAsync(long id, string newPassword);
}
