using System;
using System.Threading.Tasks;
using Datingapp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Datingapp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<User> Login(string userName, string password)
        {

            var user = await _context.Users.FirstOrDefaultAsync(x=> x.UserName == userName);

            if(user == null)
            return null;
            
            if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            return null;

            return user;
            
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            byte[] computedHash;

           using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
           {    
               computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

               for(int i=0; i< passwordHash.Length; i++)
               {
                  if(computedHash[i] != passwordHash[i]) return false;
               }
               return true;

           }
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;

            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
           await _context.SaveChangesAsync();

            return user;
         }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }

        public async Task<bool> UserExists(string userName)
        {
           var user = await _context.Users.FirstOrDefaultAsync(x=>x.UserName == userName);

           if(user == null)
           return false;
           
           return true;
        }
    }
}