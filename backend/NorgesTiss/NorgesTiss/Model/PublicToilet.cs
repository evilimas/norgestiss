namespace NorgesTiss.Model;

public class PublicToilet
{
    public int Id { get; init; } 
    
    public string Name { get; init; }
    public double Latitude { get; init; }  
    public double Longitude { get; init; }
    public string Adress { get; init; }
    
    public bool IsFree { get; init; } 
    public bool HasHandicapAccess { get; init; }
    public string Description { get; init; }
}