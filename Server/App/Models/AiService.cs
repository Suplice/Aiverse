using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using ColumnAttribute = System.ComponentModel.DataAnnotations.Schema.ColumnAttribute;
using TableAttribute = Supabase.Postgrest.Attributes.TableAttribute;

namespace Server.App.Models
{
    [Table("AiServices")]
    public class AiService : BaseModel
    {

        public AiService() { }
        [PrimaryKey("Id", false)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonIgnore]
        public long Id { get; set; }
        [Column("Title")]
        public string Title { get; set; }
        [Column("Description")]
        public string Description { get; set; }
        [Column("FullDescription")]
        public string FullDescription { get; set; }
        [Column("Price")]
        public string Price { get; set; }
        [Column("Image")]
        public string Image { get; set; }
        [Column("Stars")]
        public double Stars { get; set; }
        [Column("Reviews")]
        public int Reviews { get; set; }
        [Column("Status")]
        public string Status { get; set; }
        [Column("ServiceURL")]
        public string ServiceURL { get; set; }
        [Column("CreatedAt")]
        public DateTime CreatedAt { get; set; }
        [Column("CreatorId")]
        public long CreatorId { get; set; }
    }
}