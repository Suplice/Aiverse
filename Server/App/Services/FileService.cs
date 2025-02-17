
/// <summary>
/// Provides services for managing file operations, such as saving and deleting files.
/// This service interacts with the web server's file system to handle file storage.
/// </summary>
/// <remarks>
/// The <see cref="FileService"/> class is responsible for handling file-related operations,
/// including saving uploaded files to a specified folder and deleting files or directories.
/// </remarks>
public class FileService : IFileService
{
    private readonly IWebHostEnvironment _env;

    /// <summary>
    /// Initializes a new instance of the <see cref="FileService"/> class.
    /// </summary>
    /// <param name="env">The web hosting environment used to access the web root path.</param>
    /// <remarks>
    /// This constructor injects the <see cref="IWebHostEnvironment"/> dependency, which provides access to the web server's file system.
    /// </remarks>
    public FileService(IWebHostEnvironment env)
    {
        _env = env;
    }

    /// <inheritdoc/>
    public async Task<string> SaveFileAsync(IFormFile file, string relativeFolder)
    {
        if (file == null || file.Length == 0)
            throw new Exception("No file uploaded.");

        if (_env.WebRootPath == null)
        {
            throw new Exception("WebRootPath is null");
        }

        var uploadsFolder = Path.Combine(_env.WebRootPath, relativeFolder);

        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        if (file.Length > 10 * 1024 * 1024)
        {
            throw new Exception("File size exceeds the maximum allowed size of 10MB.");
        }

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
        var fileExtension = Path.GetExtension(file.FileName).ToLower();
        if (!allowedExtensions.Contains(fileExtension))
        {
            throw new Exception("Invalid file type. Only image files are allowed.");
        }

        var fileName = Guid.NewGuid().ToString() + fileExtension;
        var filePath = Path.Combine(uploadsFolder, fileName);

        try
        {
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
        }
        catch (Exception ex)
        {
            throw new Exception($"Error saving file: {ex.Message}");
        }

        return $"/{relativeFolder}/{fileName}";
    }

    /// <inheritdoc/>
    public void DeleteFile(string filePath)
    {
        Console.WriteLine(filePath);

        if (string.IsNullOrEmpty(filePath))
            return;

        var directoryPath = Path.GetDirectoryName(filePath);

        if (directoryPath == null)
            return;

        var fullDirectoryPath = Path.Combine(_env.WebRootPath, directoryPath.TrimStart('/'));

        Console.WriteLine(fullDirectoryPath);

        if (Directory.Exists(fullDirectoryPath))
        {
            Directory.Delete(fullDirectoryPath, true);
        }
    }

}
