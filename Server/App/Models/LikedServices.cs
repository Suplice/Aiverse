using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using System.Text.Json.Serialization;
using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;
using ColumnAttribute = System.ComponentModel.DataAnnotations.Schema.ColumnAttribute;
using TableAttribute = Supabase.Postgrest.Attributes.TableAttribute;

namespace Server.App.Models {

    /// <summary>
    /// Represents the relationship between users and the AI services they have liked.
    /// This class maps to the "LikedServices" table in the database.
    /// </summary>
    /// <remarks>
    /// The <see cref="LikedServices"/> class is used to model the many-to-many relationship
    /// between users and AI services. It inherits from <see cref="BaseModel"/> to provide
    /// common functionality for Supabase Postgrest models.
    /// </remarks>
    [Table("LikedServices")]
    public class LikedServices: BaseModel {

        /// <summary>
        /// Initializes a new instance of the <see cref="LikedServices"/> class.
        /// </summary>
        public LikedServices(){}

        /// <summary>
        /// Gets or sets the unique identifier for the liked service record.
        /// </summary>
        /// <remarks>
        /// This property is the primary key for the "LikedServices" table and is auto-generated by the database.
        /// It is marked with <see cref="JsonIgnore"/> to exclude it from JSON serialization.
        /// </remarks>
        [PrimaryKey("Id",false)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonIgnore]
        public long Id { get; set; }

        /// <summary>
        /// Gets or sets the unique identifier of the AI service associated with this relationship.
        /// </summary>
        /// <remarks>
        /// This property maps to the "AiServiceId" column in the "LikedServices" table and represents
        /// the ID of the AI service that the user has liked.
        /// </remarks>
        [Column("AiServiceId")]
        public long AiServiceId { get; set; } 

        /// <summary>
        /// Gets or sets the unique identifier of the user associated with this relationship.
        /// </summary>
        /// <remarks>
        /// This property maps to the "UserId" column in the "LikedServices" table and represents
        /// the ID of the user who liked the AI service.
        /// </remarks>
        [Column("UserId")]
        public long UserId { get; set; } 

    }
}