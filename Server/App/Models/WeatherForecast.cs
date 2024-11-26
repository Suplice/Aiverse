using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using ColumnAttribute = System.ComponentModel.DataAnnotations.Schema.ColumnAttribute;
using TableAttribute = Supabase.Postgrest.Attributes.TableAttribute;

namespace Server.App.Models
{
    [Table("WeatherForecasts")]
    public class WeatherForecast : BaseModel
    {
        public WeatherForecast()
        {
        }
        [PrimaryKey("id", false)] 
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        [JsonIgnore]
        public long Id { get; set; }
        

        [Column("Date")]
        public DateTimeOffset Date { get; set; }


        [Column("TemperatureC")]
        public int TemperatureC { get; set; }

 
        [Column("Summary")]
        public string? Summary { get; set; }


    }
}