using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace NorgesTiss.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ToiletsController: ControllerBase
{
    private readonly AppDbContext _context;

    public ToiletsController(AppDbContext context)
    {
        _context=context;
    }
    
    [HttpGet]
    public async Task<ActionResult<List<PublicToiletDto>>> GetAll()
    {
            var toilets = await _context.PublicToilets.Select(t => new PublicToiletDto
            {
                Id = t.Id,
                Name = t.Name,
                Latitude = t.Latitude,
                Longitude = t.Longitude,
                IsFree = t.IsFree,
                HasHandicapAccess = t.HasHandicapAccess,
                Description = t.Description,
                Adress = t.Adress,
            }).ToListAsync();

            if (toilets == null)
            {
                return NoContent();
            }
            return Ok(toilets);
    }
    
    [HttpPost]
    public async Task<ActionResult<PublicToiletDto>> Create([FromBody] PublicToiletDto dto)
    {
        var toilet = new PublicToilet
        {
            Name = dto.Name,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude,
            IsFree = dto.IsFree,
            HasHandicapAccess = dto.HasHandicapAccess,
            Description = dto.Description,
            Adress = dto.Adress
        };

        _context.PublicToilets.Add(toilet);
        await _context.SaveChangesAsync();

        dto.Id = toilet.Id;
        return CreatedAtAction(nameof(GetAll), new { id = dto.Id }, dto);
    }
}