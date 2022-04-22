using Newtonsoft.Json;
using Puti.Models;
using Puti.Servises;
using System.IO;

string line;
StreamReader sr = new StreamReader("C:\\Users\\spire\\source\\repos\\Puti\\Parsing\\bin\\Debug\\net6.0\\Point.txt");
line = sr.ReadToEnd();
sr.Close();

var dict = JsonConvert.DeserializeObject<Dictionary<string,GarbagePoint> >(line);

var convertedList = dict.Values.Select(x=>x.ToWasteСollectionPoint());
WasteService.AddPointWaste(convertedList.ToList());
