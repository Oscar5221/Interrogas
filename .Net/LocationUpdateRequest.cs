using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.Locations
{
    public class LocationUpdateRequest : LocationAddRequest, IModelIdentifier
    {
        [Required]
        public int Id { get; set; }
    }
}
