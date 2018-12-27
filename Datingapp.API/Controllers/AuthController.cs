using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Datingapp.API.Data;
using Datingapp.API.Dtos;
using Datingapp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Datingapp.API.Controllers
{
    [Route("api/[controller]")]

    [ApiController]

    
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserToRegisterDto userToRegisterDto)
        {

            userToRegisterDto.UserName = userToRegisterDto.UserName.ToLower();

            if (await _repo.UserExists(userToRegisterDto.UserName))
                return BadRequest("User already exists!!");

            var userToCreate = new User
            {

                UserName = userToRegisterDto.UserName
            };

            var createdUser = await _repo.Register(userToCreate, userToRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserToLoginDto userToLoginDto)
        {

            // throw new Exception("error exception");
            
            var user = await _repo.Login(userToLoginDto.Username.ToLower(), userToLoginDto.Password);

            if (user == null)
                return Unauthorized();

            var claims = new[] {

            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Appsettings:Token").Value));

           var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

           var tokenDescriptor = new SecurityTokenDescriptor{
               Subject = new ClaimsIdentity(claims),
               Expires = DateTime.Now.AddDays(1),
               SigningCredentials = creds
           };

           var tokenHandler = new JwtSecurityTokenHandler();

          var token = tokenHandler.CreateToken(tokenDescriptor);
    
        return Ok(
            new {
                token = tokenHandler.WriteToken(token)
            }
        );

        }

    }
}