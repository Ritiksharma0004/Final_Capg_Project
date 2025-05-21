using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Final_Capg_Project.Data;
using Final_Capg_Project.Models;
using webapi.DTOs;

namespace Final_Capg_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssessmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AssessmentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Assessments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Assessment>>> GetAssessments()
        {
            return await _context.Assessments.ToListAsync();
        }

        // GET: api/Assessments/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Assessment>> GetAssessment(Guid id)
        {
            var assessment = await _context.Assessments.FindAsync(id);

            if (assessment == null)
            {
                return NotFound();
            }

            return assessment;
        }

        [HttpPost]
        public async Task<ActionResult<Assessment>> PostAssessment(AssessmentCreateDto assessmentDto)
        {
            if (assessmentDto == null)
            {
                return BadRequest("Assessment data is null.");
            }

            if (string.IsNullOrWhiteSpace(assessmentDto.Title))
            {
                return BadRequest("Title is required.");
            }

            if (string.IsNullOrWhiteSpace(assessmentDto.Questions))
            {
                return BadRequest("Questions JSON is required.");
            }

            // Validate the JSON string is valid
            try
            {
                System.Text.Json.JsonDocument.Parse(assessmentDto.Questions);
            }
            catch (System.Text.Json.JsonException)
            {
                return BadRequest("Questions property is not valid JSON.");
            }

            // **ADD THIS CHECK: Validate CourseId exists in DB**
            bool courseExists = await _context.Courses.AnyAsync(c => c.CourseId == assessmentDto.CourseId);
            if (!courseExists)
            {
                return BadRequest($"Course with id {assessmentDto.CourseId} does not exist.");
            }

            var assessment = new Assessment
            {
                AssessmentId = Guid.NewGuid(),
                CourseId = assessmentDto.CourseId,
                Title = assessmentDto.Title,
                Questions = assessmentDto.Questions,
                MaxScore = assessmentDto.MaxScore
            };

            _context.Assessments.Add(assessment);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                var innerMessage = ex.InnerException?.Message ?? ex.Message;
                return BadRequest($"DB Update failed: {innerMessage}");
            }

            return CreatedAtAction(nameof(GetAssessment), new { id = assessment.AssessmentId }, assessment);
        }


        // PUT: api/Assessments/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssessment(Guid id, Assessment assessment)
        {
            if (id != assessment.AssessmentId)
            {
                return BadRequest("Assessment ID mismatch.");
            }

            // Attach the entity and set state to Modified
            _context.Entry(assessment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssessmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Assessments/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssessment(Guid id)
        {
            var assessment = await _context.Assessments.FindAsync(id);

            if (assessment == null)
            {
                return NotFound();
            }

            _context.Assessments.Remove(assessment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AssessmentExists(Guid id)
        {
            return _context.Assessments.Any(e => e.AssessmentId == id);
        }
    }
}
