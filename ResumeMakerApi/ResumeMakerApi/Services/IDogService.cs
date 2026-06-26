using ResumeMakerApi.Dtos;
using ResumeMakerApi.Models;

namespace ResumeMakerApi.Services
{
    public interface IDogService
    {
        Task<List<DogResponse>> GetAllDogsAsync();

        Task<DogResponse?> GetDogByIdAsync(int id);

        Task<DogResponse> AddDogAsync(Dog dog);

        Task<bool> UpdateDogAsync(int id, Dog dog);

        Task<bool> DeleteDogAsync(int id);
    }
}
