namespace Puti.Models
{
    public class WasteСollectionPoint
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TypeWaste { get; set; }
        public double Latitude { get; set; } //Широта
        public double Longitude { get; set; } //Долгота
        public string Address { get; set; }
        public string Rating { get; set; } //Рейтинг точки
    }
}
