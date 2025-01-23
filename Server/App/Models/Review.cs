using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using ColumnAttribute = System.ComponentModel.DataAnnotations.Schema.ColumnAttribute;
using TableAttribute = Supabase.Postgrest.Attributes.TableAttribute;

namespace Server.App.Models {
[Table("Reviews")]
public class Review: BaseModel {

    public Review(){}
    [PrimaryKey("Id",false)]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [JsonIgnore]
    public long Id { get; set; } 

    [Column("Comment")]
    public string CommentValue { get; set; }

    [Column("UserId")]
    public long UserId { get; set; }


    [Column("Stars")]
    public double Stars { get; set; }

    [Column("AiServiceId")]
    public long AiServiceId { get; set; }
    
    [Column("CreatedAt")]
    public DateTime CreatedAt { get; set; }

    [Column("Likes")]
    public int Likes { get; set; }

    [Column("Dislikes")]
    public int Dislikes { get; set; }

    [Column("HasReplies")]
    public bool HasReplies { get; set; }



}
}