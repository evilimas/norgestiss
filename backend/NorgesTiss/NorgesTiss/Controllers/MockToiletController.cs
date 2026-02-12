using Microsoft.AspNetCore.Mvc;
using NorgesTiss.Properties;

namespace NorgesTiss.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MockToiletsController : ControllerBase
{
    // GET /api/toilets
    [HttpGet]
    public ActionResult<List<PublicToiletDto>> GetAll()
    {
        return Ok(MockToiletData.Toilets);
    }

    // GET /api/toilets/{id}
    [HttpGet("{id}")]
    public ActionResult<PublicToiletDto> GetById(int id)
    {
        var toilet = MockToiletData.Toilets.FirstOrDefault(t => t.Id == id);
        if (toilet == null) return NotFound();
        return Ok(toilet);
    }

    // POST /api/toilets
    [HttpPost]
    public ActionResult<PublicToiletDto> Create([FromBody] PublicToiletDto dto)
    {
        var newId = MockToiletData.Toilets.Max(t => t.Id) + 1;
        dto.Id = newId;

        MockToiletData.Toilets.Add(dto);
        return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
    }

    // PUT /api/toilets/{id}
    [HttpPut("{id}")]
    public ActionResult<PublicToiletDto> Update(int id, [FromBody] PublicToiletDto dto)
    {
        var toilet = MockToiletData.Toilets.FirstOrDefault(t => t.Id == id);
        if (toilet == null) return NotFound();

        toilet.Name = dto.Name;
        toilet.Latitude = dto.Latitude;
        toilet.Longitude = dto.Longitude;
        toilet.IsFree = dto.IsFree;
        toilet.HasHandicapAccess = dto.HasHandicapAccess;
        toilet.Description = dto.Description;

        return Ok(toilet);
    }

    // DELETE /api/toilets/{id}
    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var toilet = MockToiletData.Toilets.FirstOrDefault(t => t.Id == id);
        if (toilet == null) return NotFound();

        MockToiletData.Toilets.Remove(toilet);
        return NoContent();
    }
}