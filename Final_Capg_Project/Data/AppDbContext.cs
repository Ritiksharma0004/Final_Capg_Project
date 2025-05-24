using System;
using System.Collections.Generic;
using Final_Capg_Project.Models;
using Microsoft.EntityFrameworkCore;

namespace Final_Capg_Project.Data
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Assessment> Assessments { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<Result> Results { get; set; }
        public virtual DbSet<User> Users { get; set; }


        public virtual DbSet<Enrollment> Enrollments { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//            => optionsBuilder.UseSqlServer("Server=tcp:edusyn.database.windows.net,1433;Initial Catalog=RITIK;Persist Security Info=False;User ID=project_server;Password=Ritik@1650;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Enrollment>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.CourseId });

                entity.HasOne(e => e.User)
                    .WithMany(u => u.Enrollments)
                    .HasForeignKey(e => e.UserId);

                entity.HasOne(e => e.Course)
                    .WithMany(c => c.Enrollments)
                    .HasForeignKey(e => e.CourseId);
            });




            // Assessment entity config
            modelBuilder.Entity<Assessment>(entity =>
            {
                entity.ToTable("Assessment");

                entity.Property(e => e.AssessmentId).ValueGeneratedNever();
                entity.Property(e => e.Questions).HasColumnType("nvarchar(max)");
                entity.Property(e => e.Title).HasMaxLength(50).IsUnicode(false);

                entity.HasOne(d => d.Course)
                    .WithMany(p => p.Assessments)
                    .HasForeignKey(d => d.CourseId)
                    .HasConstraintName("FK_Assessment_Course");
            });

            // Course entity config
            modelBuilder.Entity<Course>(entity =>
            {
                entity.ToTable("Course");

                entity.Property(e => e.CourseId).ValueGeneratedNever();
                entity.Property(e => e.Description).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.MediaUrl).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.Title).HasMaxLength(50).IsUnicode(false);

                entity.HasOne(d => d.Instructor)
                    .WithMany(p => p.Courses)
                    .HasForeignKey(d => d.InstructorId)
                    .HasConstraintName("FK_Course_Users1");
            });

            // Result entity config
            modelBuilder.Entity<Result>(entity =>
            {
                entity.ToTable("Result");

                entity.Property(e => e.ResultId).ValueGeneratedNever();
                entity.Property(e => e.AttemptDate).HasColumnType("datetime");

                entity.HasOne(d => d.Assessment)
                    .WithMany(p => p.Results)
                    .HasForeignKey(d => d.AssessmentId)
                    .HasConstraintName("FK_Result_Assessment");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Results)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Result_Users");
            });

            // User entity config
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId).ValueGeneratedNever();
                entity.Property(e => e.Email).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.Name).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.PasswordHash).HasMaxLength(50).IsUnicode(false);
                entity.Property(e => e.Role).HasMaxLength(50).IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
