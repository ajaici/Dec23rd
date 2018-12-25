using System.ComponentModel.DataAnnotations;

namespace Datingapp.API.Dtos
{
    public class UserToRegisterDto
    {
        [Required]
        [StringLength(8, MinimumLength=4, ErrorMessage="The length should be between 4 and 8 ")]
        public string UserName { get; set; }    

        [Required]
        public string Password { get; set; }
    }
}