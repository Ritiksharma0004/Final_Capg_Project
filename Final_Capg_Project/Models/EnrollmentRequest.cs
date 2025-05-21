using System.Runtime.Serialization;

namespace Final_Capg_Project.Models
{
    [DataContract]
    public class EnrollmentRequest
    {
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }
    }



}
