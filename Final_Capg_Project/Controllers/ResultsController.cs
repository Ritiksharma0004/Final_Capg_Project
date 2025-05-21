using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Final_Capg_Project.Data;
using Final_Capg_Project.Models;
using webapi.DTOs; // Make sure your DTO namespace is included

namespace Final_Capg_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ResultsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Results
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Result>>> GetResults()
        {
            return await _context.Results.ToListAsync();
        }

        // GET: api/Results/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Result>> GetResult(Guid id)
        {
            var result = await _context.Results.FindAsync(id);

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        // POST: api/Results
        [HttpPost]
        public async Task<ActionResult<Result>> PostResult([FromBody] ResultCreateDto resultDto)
        {
            if (resultDto == null)
            {
                return BadRequest("Result data is null.");
            }

            var result = new Result
            {
                ResultId = Guid.NewGuid(),
                AssessmentId = resultDto.AssessmentId,
                UserId = resultDto.UserId,
                Score = resultDto.Score,
                AttemptDate = resultDto.AttemptDate
            };

            _context.Results.Add(result);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ResultExists(result.ResultId))
                {
                    return Conflict("Result with this ID already exists.");
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(GetResult), new { id = result.ResultId }, result);
        }

        // PUT: api/Results/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResult(Guid id, [FromBody] ResultCreateDto resultDto)
        {
            if (resultDto == null)
            {
                return BadRequest("Result data is null.");
            }

            var existingResult = await _context.Results.FindAsync(id);

            if (existingResult == null)
            {
                return NotFound();
            }

            // Update fields from DTO
            existingResult.AssessmentId = resultDto.AssessmentId;
            existingResult.UserId = resultDto.UserId;
            existingResult.Score = resultDto.Score;
            existingResult.AttemptDate = resultDto.AttemptDate;

            _context.Entry(existingResult).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultExists(id))
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

        // DELETE: api/Results/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResult(Guid id)
        {
            var result = await _context.Results.FindAsync(id);

            if (result == null)
            {
                return NotFound();
            }

            _context.Results.Remove(result);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResultExists(Guid id)
        {
            return _context.Results.Any(e => e.ResultId == id);
        }
    }
}
