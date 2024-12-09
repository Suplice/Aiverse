using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using ColumnAttribute = System.ComponentModel.DataAnnotations.Schema.ColumnAttribute;
using TableAttribute = Supabase.Postgrest.Attributes.TableAttribute;

namespace Server.App.Models {
[Table("Users")]
public class User: BaseModel {

    public User(){}
    [PrimaryKey("id",false)]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [JsonIgnore] 
    public long Id { get; set; }
    [Column("Email")]
    public string Email { get; set; }
    [Column("Password")]
    public string? Password { get; set; }
    [Column("Provider")]
    public string Provider { get; set; }
    [Column("Name")]
    public string? Name { get; set; }
    [Column("Picture")]
    public string? Picture { get; set; }
    [Column("CreatedAt")]
    public DateTime CreatedAt { get; set; }
    [Column("Role")]
    public string Role { get; set; }
}
}