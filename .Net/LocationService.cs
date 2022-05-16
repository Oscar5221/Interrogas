using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Domain.LookUps;
using Sabio.Models.Requests.Locations;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class LocationService : ILocationService
    {
        IDataProvider _data = null;

        public LocationService(IDataProvider data)
        {
            _data = data;
        }

        public int Add(LocationAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[Locations_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                MapParameters(model, col);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object oId = returnCol["@Id"].Value;
                Int32.TryParse(oId.ToString(), out id);
            });
            return id;
        }

        public Location Get(int id)
        {
            string procName = "[dbo].[Locations_SelectByIdV2]";

            Location location = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                location = MapLocation(reader, ref startingIndex);
            });
            return location;
        }

        public void Update(LocationUpdateRequest model)
        {
            string procName = "[dbo].[Locations_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                UpdateMapParameter(model, col);
            }, returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Locations_Delete_ById]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, null
            );
        }

        private static void MapParameters (LocationAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@LocationTypeId", model.LocationTypeId);
            col.AddWithValue("@LineOne", model.LineOne);
            col.AddWithValue("@LineTwo", model.LineTwo);
            col.AddWithValue("@City", model.City);
            col.AddWithValue("@Zip", model.Zip);
            col.AddWithValue("@StateId", model.StateId);
            col.AddWithValue("@Latitude", model.Latitude);
            col.AddWithValue("@Longitude", model.Longitude);
        }

        private static void UpdateMapParameter(LocationUpdateRequest model, SqlParameterCollection col)
        {    
            MapParameters(model, col);
            col.AddWithValue("@Id", model.Id);
        }

        private Location MapLocation(IDataReader reader, ref int startingIndex)
        {
            Location location = new Location();

            location.Id = reader.GetSafeInt32(startingIndex++);
            location.LocationType = new LookUp();
            location.LocationType.Id = reader.GetSafeInt32(startingIndex++);
            location.LocationType.Name = reader.GetSafeString(startingIndex++);
            location.LineOne = reader.GetSafeString(startingIndex++);
            location.LineTwo = reader.GetSafeString(startingIndex++);
            location.City = reader.GetSafeString(startingIndex++);
            location.Zip = reader.GetSafeString(startingIndex++);
            location.State = new State();
            location.State.Id = reader.GetSafeInt32(startingIndex++);
            location.State.Name = reader.GetSafeString(startingIndex++);
            location.State.Code = reader.GetSafeString(startingIndex++);
            location.Latitude = reader.GetSafeDouble(startingIndex++);
            location.Longitude = reader.GetSafeDouble (startingIndex++);

            return location;
        }
    }
}
