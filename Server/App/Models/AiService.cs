using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using ColumnAttribute = System.ComponentModel.DataAnnotations.Schema.ColumnAttribute;
using TableAttribute = Supabase.Postgrest.Attributes.TableAttribute;

namespace Server.App.Models {
[Table("AiServices")]
public class AiService: BaseModel {

    public AiService(){}
    [PrimaryKey("Id",false)]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [JsonIgnore] 
    public long Id { get; set; }
    [Column("ModelName")]
    public string ModelName { get; set; }
    [Column("Producer")]
    public string Producer { get; set; }
    [Column("ShortDescription")]
    public string ShortDescription { get; set; }
    [Column("FullDescription")]
    public string FullDescription { get; set; }
    [Column("PricingModel")]
    public string PricingModel { get; set; }
    [Column("VerificationStatus")]
    public string VerificationStatus {get; set;} 
    [Column("CreatedAt")]
    public DateTime CreatedAt { get; set; }
}
}