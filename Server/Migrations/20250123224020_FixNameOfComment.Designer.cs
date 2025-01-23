﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250123224020_FixNameOfComment")]
    partial class FixNameOfComment
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("AiServicesCategories", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<int>("AiServiceId")
                        .HasColumnType("integer")
                        .HasColumnName("AiService");

                    b.Property<int>("CategoryId")
                        .HasColumnType("integer")
                        .HasColumnName("Category");

                    b.HasKey("Id");

                    b.ToTable("AiServicesCategories");
                });

            modelBuilder.Entity("Server.App.Models.AiService", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("CreatedAt");

                    b.Property<long>("CreatorId")
                        .HasColumnType("bigint")
                        .HasColumnName("CreatorId");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Description");

                    b.Property<string>("FullDescription")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("FullDescription");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Image");

                    b.Property<string>("Price")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Price");

                    b.Property<int>("Reviews")
                        .HasColumnType("integer")
                        .HasColumnName("Reviews");

                    b.Property<double>("Stars")
                        .HasColumnType("double precision")
                        .HasColumnName("Stars");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Status");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Title");

                    b.HasKey("Id");

                    b.ToTable("AiServices");
                });

            modelBuilder.Entity("Server.App.Models.Category", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("FunctionName");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Server.App.Models.Comment", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("CommentValue")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Comment");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("CreatedAt");

                    b.Property<int>("Dislikes")
                        .HasColumnType("integer")
                        .HasColumnName("Dislikes");

                    b.Property<bool>("HasReplies")
                        .HasColumnType("boolean")
                        .HasColumnName("HasReplies");

                    b.Property<int>("Likes")
                        .HasColumnType("integer")
                        .HasColumnName("Likes");

                    b.Property<long>("ParentId")
                        .HasColumnType("bigint")
                        .HasColumnName("ParentId");

                    b.Property<long>("ReviewId")
                        .HasColumnType("bigint")
                        .HasColumnName("ReviewId");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint")
                        .HasColumnName("UserId");

                    b.HasKey("Id");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Server.App.Models.LikedServices", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("AiServiceId")
                        .HasColumnType("bigint")
                        .HasColumnName("AiServiceId");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint")
                        .HasColumnName("UserId");

                    b.HasKey("Id");

                    b.ToTable("LikedServices");
                });

            modelBuilder.Entity("Server.App.Models.Review", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long>("AiServiceId")
                        .HasColumnType("bigint")
                        .HasColumnName("AiServiceId");

                    b.Property<string>("CommentValue")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("CommentValue");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("CreatedAt");

                    b.Property<int>("Dislikes")
                        .HasColumnType("integer")
                        .HasColumnName("Dislikes");

                    b.Property<bool>("HasReplies")
                        .HasColumnType("boolean")
                        .HasColumnName("HasReplies");

                    b.Property<int>("Likes")
                        .HasColumnType("integer")
                        .HasColumnName("Likes");

                    b.Property<double>("Stars")
                        .HasColumnType("double precision")
                        .HasColumnName("Stars");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint")
                        .HasColumnName("UserId");

                    b.HasKey("Id");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("Server.App.Models.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("CreatedAt");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Email");

                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("Name");

                    b.Property<string>("Password")
                        .HasColumnType("text")
                        .HasColumnName("Password");

                    b.Property<string>("Picture")
                        .HasColumnType("text")
                        .HasColumnName("Picture");

                    b.Property<string>("Provider")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Provider");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Role");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
