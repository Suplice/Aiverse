public class FileService
{
    private readonly IWebHostEnvironment _env;

    public FileService(IWebHostEnvironment env)
    {
        _env = env;
    }

    public async Task<string> SaveFileAsync(IFormFile file, string relativeFolder)
    {
        if (file == null || file.Length == 0)
            throw new Exception("No file uploaded.");

        // Sprawdzamy, czy WebRootPath jest poprawny
        if (_env.WebRootPath == null)
        {
            throw new Exception("WebRootPath is null");
        }

        var uploadsFolder = Path.Combine(_env.WebRootPath, relativeFolder);

        // Tworzymy folder, jeśli nie istnieje
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        // Walidacja rozmiaru pliku (np. maksymalnie 10MB)
        if (file.Length > 10 * 1024 * 1024) // 10MB
        {
            throw new Exception("File size exceeds the maximum allowed size of 10MB.");
        }

        // Sprawdzanie rozszerzenia pliku (np. tylko obrazy)
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

        return $"/{relativeFolder}/{fileName}"; // Zwraca ścieżkę względną
    }


}
