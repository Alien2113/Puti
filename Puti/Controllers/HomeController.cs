using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Puti.Models;
using Puti.Servises;
using System.Diagnostics;

namespace Puti.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public List<WasteСollectionPoint> MapPoints()
        {
            string token = "";
            if (HttpContext.Request.Cookies.ContainsKey("token")) { 
            HttpContext?.Request?.Cookies.TryGetValue("token", out token);
                if (UserService.GetByToken(token) != null)
                    return WasteService.GetWastePoints();
                else return WasteService.GetWastePoints();//null;

            }
            return  WasteService.GetWastePoints(); //null;
           
        }

        public  IActionResult Login()
        {

            return View();
        }

        [HttpPost]
        public async Task LoginPostAsync()
        {
            string body = "";
            using (StreamReader stream = new StreamReader(Request.Body))
            {
                body = await stream.ReadToEndAsync();
            }
            var user = JsonConvert.DeserializeObject<User>(body);
            var newUser = UserService.GetByLoginPassword(user.Email, user.Password);
            HttpContext.Response.Cookies.Append("token", newUser.Token,new CookieOptions() {Expires = DateTime.MaxValue });
            HttpContext.Response.Cookies.Append("name", newUser.Name, new CookieOptions() { Expires = DateTime.MaxValue });
        }

        public IActionResult Registration()
        {
            return View();
        }

      [HttpPost]
        public async Task RegistrationPostAsync()
        {
            string body = "";
            using (StreamReader stream = new StreamReader(Request.Body))
            {
                body = await stream.ReadToEndAsync();
            }
            var user = JsonConvert.DeserializeObject<User>(body);
            UserService.AddUser(user);

 

        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult ChangingPoints()
        {
            return View();
        }

        public IActionResult SimulationModel()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}