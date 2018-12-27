using System.ComponentModel.DataAnnotations;

namespace Datingapp.API.Dtos
{
    public class UserToRegisterDto
    {
        [Required]
        public string UserName { get; set; }    

        [Required]
        [StringLength(8, MinimumLength=4, ErrorMessage="The length should be between 4 and 8 ")]
        public string Password { get; set; }
    }
}