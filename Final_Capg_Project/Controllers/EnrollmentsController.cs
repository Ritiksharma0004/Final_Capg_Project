using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Final_Capg_Project.Models;
using Final_Capg_Project.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Final_Capg_Project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnrollmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EnrollmentsController(AppDbContext context)
        {
            _context = context;
        }





        [HttpGet("student/{userId}")]
        public async Task<IActionResult> GetEnrolledCourses(Guid userId)
        {
            if (userId == Guid.Empty)
                return BadRequest("Invalid userId");

            var enrolledCourses = await _context.Enrollments
                .Where(e => e.UserId == userId)
                .Include(e => e.Course)
                .Select(e => new {
                    e.Course.CourseId,
                    e.Course.Title,
                    e.Course.Description
                })
                .ToListAsync();

            if (enrolledCourses == null || enrolledCourses.Count == 0)
                return NotFound("No enrolled courses found for this user.");

            return Ok(enrolledCourses);
        }






        [HttpPost]
        public async Task<IActionResult> Enroll([FromBody] EnrollmentRequest request)
        {
            if (request == null)
                return BadRequest("Invalid request");

            if (request.UserId == Guid.Empty)
                return BadRequest("UserId is empty");

            if (request.CourseId == Guid.Empty)
                return BadRequest("CourseId is empty");

            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null)
                return NotFound("User not found.");

            var course = await _context.Courses.FindAsync(request.CourseId);
            if (course == null)
                return NotFound("Course not found.");

            var enrollmentExists = await _context.Enrollments
                .AnyAsync(e => e.UserId == request.UserId && e.CourseId == request.CourseId);

            if (enrollmentExists)
                return BadRequest("User already enrolled in the course.");

            var enrollment = new Enrollment
            {
                UserId = request.UserId,
                CourseId = request.CourseId,
                User = user,
                Course = course,
                EnrolledOn = DateTime.UtcNow
            };


            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();

            return Ok($"User {user.Name} enrolled in course {course.Title} successfully.");
        }

    }
}
