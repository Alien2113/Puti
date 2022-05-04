namespace Puti.Models
{
    public class Route
    {
        public int Id { get; set; }
        public int Id_Garbage_Truck { get; set; }
        public int Id_ParkingPoint { get; set; }
        public string Id_WasteСollectionPoint { get; set; }
        public int Id_StockPoint { get; set; }
        public double TypeWaste { get; set; }
        public double Price { get; set; }
        public double V { get; set; }
    }
}
