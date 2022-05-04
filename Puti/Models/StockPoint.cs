namespace Puti.Models
{
    public class StockPoint
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TypeWaste { get; set; }
        public double Latitude { get; set; } //Широта
        public double Longitude { get; set; } //Долгота
        public string Address { get; set; }
    }
}
