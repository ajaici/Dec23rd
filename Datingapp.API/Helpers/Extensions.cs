using Microsoft.AspNetCore.Http;

namespace Datingapp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationErrors(this HttpResponse response, string message ) //in order to overwrite the reponse we use 'this'
        {

            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error"); //to expose the created header

           // response.Headers.Add("Access-Control-Allow-Origin","*");

        }
        
    }
}