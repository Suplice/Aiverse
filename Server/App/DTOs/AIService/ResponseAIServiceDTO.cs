public class ResponseAIServiceDTO
{

    public long Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string FullDescription { get; set; }
    public string Price { get; set; }
    public string Image { get; set; }
    public double Stars { get; set; }
    public int Reviews { get; set; }
    public string Status { get; set; }
    public string ServiceURL { get; set; }
    public DateTime CreatedAt { get; set; }
    public long CreatorId { get; set; }
    public List<string> GalleryImages { get; set; }
}