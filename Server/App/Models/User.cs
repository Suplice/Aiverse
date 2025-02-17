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
    /// Represents a user in the system.
    /// This class maps to the "Users" table in the database.
    /// </summary>
    /// <remarks>
    /// The <see cref="User"/> class is used to model user data, including authentication details,
    /// profile information, and metadata such as creation date and role. It inherits from
    /// <see cref="BaseModel"/> to provide common functionality for Supabase Postgrest models.
    /// </remarks>
    [Table("Users")]
    public class User: BaseModel {

        /// <summary>
        /// Initializes a new instance of the <see cref="User"/> class.
        /// </summary>
        public User(){}

        /// <summary>
        /// Gets or sets the unique identifier for the user.
        /// </summary>
        /// <remarks>
        /// This property is the primary key for the "Users" table and is auto-generated by the database.
        /// It is marked with <see cref="JsonIgnore"/> to exclude it from JSON serialization.
        /// </remarks>
        [PrimaryKey("Id",false)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonIgnore] 
        public long Id { get; set; }

        /// <summary>
        /// Gets or sets the email address of the user.
        /// </summary>
        [Column("Email")]
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the B.Crypted password of the user.
        /// </summary>
        [Column("Password")]
        public string? Password { get; set; }

        /// <summary>
        /// Gets or sets the authentication provider used by the user (Google, Facebook etc.).
        /// </summary>
        [Column("Provider")]
        public string Provider { get; set; }

        /// <summary>
        /// Gets or sets the name of the user.
        /// </summary>
        [Column("Name")]
        public string? Name { get; set; }

        /// <summary>
        /// Gets or sets the URL of the user's profile picture.
        /// </summary>
        [Column("Picture")]
        public string? Picture { get; set; }

        /// <summary>
        /// Gets or sets the date and time when the user account was created.
        /// </summary>
        [Column("CreatedAt")]
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Gets or sets the role of the user in the system (USER, MANAGER etc.).
        /// </summary>
        [Column("Role")]
        public string Role { get; set; }

    }
}