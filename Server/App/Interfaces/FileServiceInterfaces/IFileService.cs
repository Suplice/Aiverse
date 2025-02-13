
public interface IFileService
{
    Task<string> SaveFileAsync(IFormFile file, string relativeFolder);
    void DeleteFile(string filePath);

}