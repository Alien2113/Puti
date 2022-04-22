using Puti.Models;

namespace Puti.Servises
{
    public static class UserService
    {
        public static bool AddUser(User user)
        {
            user.Token = GetRandomString();
            using (ApplicationContext db = new ApplicationContext())
            {
                if((db?.Users?.FirstOrDefault(x=>x.Email==user.Email)??null)!=null)
                    return false;
                db.Users.Add(user);
                db.SaveChanges();
            }
            return true;
        }
      
        public static User GetByToken(string Token)
        {
            User user;
            using (ApplicationContext db = new ApplicationContext())
            {
                user =  db?.Users?.FirstOrDefault(x=>x.Token==Token)??null;
            }
            return user;
        }

        public static User GetByLoginPassword(string email, string password)
        {
            User user;
            using (ApplicationContext db = new ApplicationContext())
            {
                user = db.Users.Where(x => x.Email == email && x.Password==password).First();
            }
            return user;
        }

        public static string GetRandomString()
        {
            Random r = new Random();
            string s = "";
            for (int i = 0; i < 10; i++)
            {
                char a = (char)r.Next(0, 255);
                s += a;
            }
            return s;
        }
    }
}
