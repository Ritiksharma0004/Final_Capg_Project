using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Final_Capg_Project.Data;
using Final_Capg_Project.Models;
using webapi.DTOs; // your DTO namespace
using System.ComponentModel.DataAnnotations;

namespace Final_Capg_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                var user = await _context.Users
                    .SingleOrDefaultAsync(u => u.Email == loginRequest.Email &&
                                               u.PasswordHash == loginRequest.PasswordHash);

                if (user == null)
                {
                    return BadRequest("Invalid email or password.");
                }

                return Ok(user); // or return a token, etc.
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }



        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            return user;
        }


       




        public class LoginRequest
        {
            public string Email { get; set; }
            public string PasswordHash { get; set; }
        }


        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult> PostUser([FromBody] UserCreateDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest("User data is null.");
            }

            // Map DTO to User entity
            var user = new User
            {
                UserId = Guid.NewGuid(),
                Name = userDto.Name,
                Email = userDto.Email,
                Role = userDto.Role,
                PasswordHash = userDto.PasswordHash,
                Results = new List<Result>()
            };

            _context.Users.Add(user);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (_context.Users.Any(u => u.Email == userDto.Email))
                {
                    return Conflict("A user with this email already exists.");
                }
                else
                {
                    throw;
                }
            }

            // Return a clean and useful response
            return Ok(new
            {
                Message = "User created successfully",
                UserId = user.UserId,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            });
        }


        // PUT: api/Users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, [FromBody] UserCreateDto userDto)
        {
            if (userDto == null)
                return BadRequest("User data is null.");

            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            // Update fields
            user.Name = userDto.Name;
            user.Email = userDto.Email;
            user.Role = userDto.Role;
            user.PasswordHash = userDto.PasswordHash;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "A concurrency error occurred while updating the user.");
            }

            return Ok(new { Message = "User updated successfully." });
        }


        // DELETE: api/Users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(Guid id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
