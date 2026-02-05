namespace NorgesTiss.Properties;

public class MockToiletData
{
    public static List<PublicToiletDto> Toilets { get; } = new List<PublicToiletDto>
    {
        new PublicToiletDto
        {
            Id = 1,
            Name = "Oslo Central Station WC",
            Latitude = 59.911491,
            Longitude = 10.757933,
            IsFree = false,
            HasHandicapAccess = true,
            Description = "Paid public toilet located inside Oslo Central Station. Accepts card payments. Clean and well maintained."
        },
        new PublicToiletDto
        {
            Id = 2,
            Name = "Bryggen Public Toilet",
            Latitude = 60.397076,
            Longitude = 5.324383,
            IsFree = true,
            HasHandicapAccess = false,
            Description = "Free public toilet near the Bryggen area. Very busy during tourist season. May be closed at night."
        },
        new PublicToiletDto
        {
            Id = 3,
            Name = "Stavanger City Park WC",
            Latitude = 58.969975,
            Longitude = 5.733107,
            IsFree = true,
            HasHandicapAccess = true,
            Description = "Free public toilet located in the city park. Accessible for wheelchair users. Usually clean."
        },
        new PublicToiletDto
        {
            Id = 4,
            Name = "Trondheim Torvet Toilet",
            Latitude = 63.430515,
            Longitude = 10.395053,
            IsFree = false,
            HasHandicapAccess = true,
            Description = "Paid toilet near Torvet square. Modern facilities with automatic cleaning system."
        },
        new PublicToiletDto
        {
            Id = 5,
            Name = "Tromsø Harbour Public WC",
            Latitude = 69.649205,
            Longitude = 18.955324,
            IsFree = true,
            HasHandicapAccess = false,
            Description = "Free public toilet near the harbour. Basic facilities. Can be closed during winter nights."
        }
    };
}