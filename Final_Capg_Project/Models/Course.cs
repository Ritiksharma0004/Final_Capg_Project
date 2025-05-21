//using System;
//using System.Collections.Generic;

//namespace Final_Capg_Project.Models;

//public partial class Course
//{
//    public Guid CourseId { get; set; }

//    public string? Title { get; set; }

//    public string? Description { get; set; }

//    public Guid? InstructorId { get; set; }

//    public string? MediaUrl { get; set; }
//    //public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();

//    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();



//    public virtual ICollection<Assessment> Assessments { get; set; } = new List<Assessment>();

//    public virtual User? Instructor { get; set; }
//}




//using Final_Capg_Project.Models;
//using System.ComponentModel.DataAnnotations;

//public class Course
//{
//    [Key]
//    public Guid CourseId { get; set; }

//    public string Title { get; set; } = string.Empty;

//    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
//}



using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Final_Capg_Project.Models
{
    public class Course
    {
        [Key]
        public Guid CourseId { get; set; }

        public string? Title { get; set; }

        public string? Description { get; set; }

        public Guid? InstructorId { get; set; }

        public string? MediaUrl { get; set; }

        public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();

        public virtual ICollection<Assessment> Assessments { get; set; } = new List<Assessment>();

        public virtual User? Instructor { get; set; }
    }
}
