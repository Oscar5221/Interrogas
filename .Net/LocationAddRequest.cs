using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Locations
{
    public class LocationAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int LocationTypeId { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string LineOne { get; set; }
        
        [StringLength(255, MinimumLength = 2)]
        public string LineTwo { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string City { get; set; }

        [StringLength(50, MinimumLength = 2)]
        public string Zip { get; set; }

        [Required]
        [Range( 1, 32)]
        public int StateId { get; set; }

        [Required]
        [Range(-90, 90)]
        public Double Latitude { get; set; }

        [Required]
        [Range(-180, 180)]
        public Double Longitude { get; set; }
    }
}
