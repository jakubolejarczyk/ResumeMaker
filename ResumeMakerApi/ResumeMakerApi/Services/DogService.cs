using Microsoft.EntityFrameworkCore;
using ResumeMakerApi.Data;
using ResumeMakerApi.Dtos;
using ResumeMakerApi.Models;

namespace ResumeMakerApi.Services
{
    public class DogService(AppDbContext context) : IDogService
    {
        public Task<DogResponse> AddDogAsync(Dog dog)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteDogAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<DogResponse>> GetAllDogsAsync()
        {
            var dogs = await context.Dogs.ToListAsync();
            return dogs.Select(d => new DogResponse { Name = d.Name }).ToList();
        }

        public async Task<DogResponse?> GetDogByIdAsync(int id)
        {
            var result = await context.Dogs.FindAsync(id);
            return result == null ? null : new DogResponse { Name = result.Name };
        }

        public Task<bool> UpdateDogAsync(int id, Dog dog)
        {
            throw new NotImplementedException();
        }
    }
}
