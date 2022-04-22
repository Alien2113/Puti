using System;
using System.Collections.Generic;

using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Puti.Models
{
    public class GarbagePoint
    {
       
            [JsonProperty("id")]
            public long Id { get; set; }

            [JsonProperty("lat")]
            public string Lat { get; set; }

            [JsonProperty("lng")]
            public string Lng { get; set; }

            [JsonProperty("title")]
            public string Title { get; set; }

            [JsonProperty("reiting")]
            public string Reiting { get; set; }

            [JsonProperty("address")]
            public string Address { get; set; }

        [JsonProperty("cats")]
        public string Cats { get; set; }

        public WasteСollectionPoint ToWasteСollectionPoint()
        {
          WasteСollectionPoint wasteСollectionPoint  = new();
          wasteСollectionPoint.Address = Address;
          wasteСollectionPoint.Name = Title;
          wasteСollectionPoint.Longitude = Convert.ToDouble( Lng.Replace(".",","));
          wasteСollectionPoint.Latitude = Convert.ToDouble(Lat.Replace(".", ",")); ;
          wasteСollectionPoint.Rating = Reiting;
          wasteСollectionPoint.TypeWaste = Cats;


            return wasteСollectionPoint;
        }

    }

}
