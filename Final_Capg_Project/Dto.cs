// DTOs/UserCreateDto.cs
using System.ComponentModel.DataAnnotations;

namespace webapi.DTOs
{
    public class UserCreateDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        [MinLength(6)]
        public string PasswordHash { get; set; }
    }


}

// DTOs/AssessmentCreateDto.cs
namespace webapi.DTOs
{
    public class AssessmentCreateDto
    {
        public Guid CourseId { get; set; }
        public string Title { get; set; } = null!;
        public string Questions { get; set; } = null!;
        public int MaxScore { get; set; }
    }
}

// DTOs/CourseCreateDto.cs
namespace webapi.DTOs
{
    public class CourseCreateDto
    {
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public Guid InstructorId { get; set; }
        public string MediaUrl { get; set; } = null!;
    }
}

// DTOs/ResultCreateDto.cs
namespace webapi.DTOs
{
    public class ResultCreateDto
    {
        public Guid AssessmentId { get; set; }
        public Guid UserId { get; set; }
        public int Score { get; set; }
        public DateTime AttemptDate { get; set; }
    }
}



namespace webapi.DTOs
{
    public class EnrollmentRequest
    {
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }
    }
}


namespace Final_Capg_Project.Models
{
    public class EnrollmentResponse
    {
        public string Message { get; set; }
    }
}
