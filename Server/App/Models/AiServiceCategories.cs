using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using ColumnAttribute = System.ComponentModel.DataAnnotations.Schema.ColumnAttribute;
using TableAttribute = Supabase.Postgrest.Attributes.TableAttribute;

[Table("AiServicesCategories")]
public class AiServicesCategories: BaseModel {

    public AiServicesCategories(){}
    [PrimaryKey("Id",false)]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [JsonIgnore]
    public long Id { get; set; } 

    [Column("AiService")]
    public int AiServiceId { get; set; }

    [Column("Category")]
    public int CategoryId { get; set; }

}