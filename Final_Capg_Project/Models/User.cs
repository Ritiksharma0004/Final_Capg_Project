//using Final_Capg_Project.Models;
//using System.ComponentModel.DataAnnotations;

//public class User
//{
//    [Key]
//    public Guid UserId { get; set; }

//    public string Name { get; set; } = string.Empty;
//    public string Email { get; set; } = string.Empty;
//    public string PasswordHash { get; set; } = string.Empty;
//    public string Role { get; set; } = string.Empty;

//    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
//}





using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Final_Capg_Project.Models
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Role { get; set; }

        public string? PasswordHash { get; set; }

        public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();

        public virtual ICollection<Course> Courses { get; set; } = new List<Course>();

        public virtual ICollection<Result> Results { get; set; } = new List<Result>();
    }
}
