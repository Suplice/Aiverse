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
    [Migration("20241216233330_test1")]
    partial class test1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Server.App.Models.AiService", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("CreatedAt");

                    b.Property<string>("FullDescription")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("FullDescription");

                    b.Property<string>("ModelName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("ModelName");

                    b.Property<string>("PricingModel")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("PricingModel");

                    b.Property<string>("Producer")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("Producer");

                    b.Property<string>("ShortDescription")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("ShortDescription");

                    b.Property<string>("VerificationStatus")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("VerificationStatus");

                    b.HasKey("Id");

                    b.ToTable("AiService");
                });

            modelBuilder.Entity("Server.App.Models.Function", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<long?>("AiServiceId")
                        .HasColumnType("bigint");

                    b.Property<string>("FunctionName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("FunctionName");

                    b.HasKey("Id");

                    b.HasIndex("AiServiceId");

                    b.ToTable("Function");
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

            modelBuilder.Entity("Server.App.Models.WeatherForecast", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTimeOffset>("Date")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("Date");

                    b.Property<string>("Summary")
                        .HasColumnType("text")
                        .HasColumnName("Summary");

                    b.Property<int>("TemperatureC")
                        .HasColumnType("integer")
                        .HasColumnName("TemperatureC");

                    b.HasKey("Id");

                    b.ToTable("WeatherForecasts");
                });

            modelBuilder.Entity("Server.App.Models.Function", b =>
                {
                    b.HasOne("Server.App.Models.AiService", null)
                        .WithMany("Functions")
                        .HasForeignKey("AiServiceId");
                });

            modelBuilder.Entity("Server.App.Models.AiService", b =>
                {
                    b.Navigation("Functions");
                });
#pragma warning restore 612, 618
        }
    }
}
