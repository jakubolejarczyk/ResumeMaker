using Microsoft.AspNetCore.Mvc;
using ResumeMakerApi.Dtos;
using ResumeMakerApi.Services;

namespace ResumeMakerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DogController(IDogService dogService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<DogResponse>>> GetDogs()
        {
            return Ok(await dogService.GetAllDogsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DogResponse?>> GetDogById(int id)
        {
            var dog = await dogService.GetDogByIdAsync(id);
            if (dog is null)
            {
                return NotFound("Dog with the given ID not found");
            }
            return Ok(dog);
        }
    }
}
