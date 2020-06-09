using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using BrokereeSolutionsTestTask.Models;
using Microsoft.AspNetCore.Mvc;

namespace BrokereeSolutionsTestTask.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ResourcesController : ControllerBase
    {
        private static readonly ConcurrentDictionary<string, string> _localResourceStorage = new ConcurrentDictionary<string, string>();


        [HttpGet]
        public ActionResult<IEnumerable<Resource>> GetAll()
        {
            var result = _localResourceStorage.Select(kv => new Resource
            {
                Key = kv.Key,
                Value = kv.Value
            });

            return Ok(result);
        }

        [HttpPost]
        public ActionResult<Resource> Create([FromBody] Resource resource)
        {
            if (_localResourceStorage.TryAdd(resource.Key, resource.Value))
            {
                return Ok(resource);
            }
            var errorMessage = $"Resource with \"{resource.Key}\" key already exists";

            return BadRequest(errorMessage);
        }

        [HttpDelete("{key}")]
        public IActionResult Delete(string key)
        {
            if (_localResourceStorage.TryRemove(key, out _))
            {
                return Ok();
            }
            var errorMessage = $"Cannot delete resource with \"{key}\" key";

            return BadRequest(errorMessage);
        }

        [HttpPut]
        public ActionResult<Resource> Update([FromBody] Resource resource)
        {
            string errorMessage = null;
            if (!_localResourceStorage.TryGetValue(resource.Key, out var currentValue))
            {
                errorMessage = $"Cannot find resource with \"{resource.Key}\" key";
            }
            if (!_localResourceStorage.TryUpdate(resource.Key, resource.Value, currentValue))
            {
                errorMessage = $"Cannot update resource with \"{resource.Key}\" key";
            }
            if (errorMessage != null)
            {
                return BadRequest(errorMessage);
            }

            return Ok(resource);
        }
    }
}

