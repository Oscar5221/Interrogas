using Sabio.Models.Domain;
using Sabio.Models.Requests.Locations;

namespace Sabio.Services
{
    public interface ILocationService
    {
        int Add(LocationAddRequest model);
        Location Get(int id);
        void Update(LocationUpdateRequest model);
        void Delete(int id);
    }
}