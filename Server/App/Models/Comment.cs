using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using ColumnAttribute = System.ComponentModel.DataAnnotations.Schema.ColumnAttribute;
using TableAttribute = Supabase.Postgrest.Attributes.TableAttribute;

namespace Server.App.Models {
[Table("Comments")]
public class Comment: BaseModel {

    public Comment(){}
    [PrimaryKey("Id",false)]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [JsonIgnore]
    public long Id { get; set; } 

    [Column("Comment")]
    public string CommentValue { get; set; }

    [Column("UserId")]
    public long UserId { get; set; }

    [Column("ReviewId")]
    public long ReviewId { get; set; }

    [Column("ParentId")]
    public long ParentId { get; set; }


}
}