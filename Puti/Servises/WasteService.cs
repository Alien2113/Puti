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

        public static bool AddPointWaste(WasteСollectionPoint wastePoint)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                db.WasteСollectionPoints.Add(wastePoint);
                db.SaveChanges();
            }
            return true;
        }
        public static List<WasteСollectionPoint> GetWastePoints()
        {
            List<WasteСollectionPoint> points;
            using (ApplicationContext db = new ApplicationContext())
            {
                points = db.WasteСollectionPoints.Where(x => Convert.ToDouble(x.Rating) > 4).ToList();
            }
            return points;
        }

        public static void Delete_PointsWaste(int[] arr) {
            using (ApplicationContext db = new ApplicationContext())
            {
                var allitems = db.WasteСollectionPoints.Where(x => arr.Contains(x.Id)).ToList();
                db.RemoveRange(allitems);
                db.SaveChanges();
            }
        }

        public static void Edit_PointsWaste(List<WasteСollectionPoint> arr) {

            using (ApplicationContext db = new ApplicationContext())
            {               
                db.UpdateRange(arr);
                db.SaveChanges();
            }
        }
    }
}
