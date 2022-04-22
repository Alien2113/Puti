using Puti.Models;

namespace Puti.Servises
{
    public static class WasteService
    {
        public static bool AddPointWaste(List<WasteСollectionPoint> wasteСollectionPoint)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                db.WasteСollectionPoints.AddRange(wasteСollectionPoint);
                db.SaveChanges();
            }
            return true;
        }
        public static List<WasteСollectionPoint> GetWastePoints()
        {
            List<WasteСollectionPoint> points;
            using (ApplicationContext db = new ApplicationContext())
            {
                points = db.WasteСollectionPoints.Where(x=>Convert.ToDouble(x.Rating)>4).ToList();
            }
            return points;
        }
    }
}
