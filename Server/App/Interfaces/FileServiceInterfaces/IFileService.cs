
public interface IFileService
{   
    /// <summary>
    /// Saves an uploaded file to the specified folder asynchronously.
    /// </summary>
    /// <param name="file">The file to save, provided as an <see cref="IFormFile"/> object.</param>
    /// <param name="relativeFolder">The relative folder path where the file should be saved.</param>
    /// <returns>The relative file path of the saved file.</returns>
    /// <exception cref="Exception">
    /// Thrown if:
    /// - No file is uploaded.
    /// - The web root path is not available.
    /// - The file size exceeds 10MB.
    /// - The file type is not allowed (only .jpg, .jpeg, .png, and .gif are allowed).
    /// - An error occurs while saving the file.
    /// </exception>
    /// <remarks>
    /// This method validates the file, creates the target folder if it doesn't exist, and saves the file with a unique name.
    /// </remarks>
    Task<string> SaveFileAsync(IFormFile file, string relativeFolder);

    /// <summary>
    /// Deletes a file or directory at the specified path.
    /// </summary>
    /// <param name="filePath">The relative file path or directory path to delete.</param>
    /// <remarks>
    /// This method checks if the file or directory exists and deletes it if found.
    /// If the path is invalid or empty, the method does nothing.
    /// </remarks>
    void DeleteFile(string filePath);

}