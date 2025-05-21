using System;

namespace Final_Capg_Project.Models
{
    public class Enrollment
    {
        // Composite key: UserId + CourseId
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Course Course { get; set; }

        // Additional property example
        public DateTime EnrolledOn { get; set; }
    }
}
