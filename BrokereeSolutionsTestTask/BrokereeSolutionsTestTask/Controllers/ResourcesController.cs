using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using BrokereeSolutionsTestTask.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BrokereeSolutionsTestTask.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ResourcesController : ControllerBase
    {
        private static readonly ConcurrentDictionary<string, string> _localResourceStorage = new ConcurrentDictionary<string, string>();

        private readonly ILogger<ResourcesController> _logger;

        public ResourcesController(ILogger<ResourcesController> logger)
        {
            _logger = logger;
        }

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
            var errorMessage = $"Resource with {resource.Key} key already exists";

            return BadRequest(errorMessage);
        }

        [HttpDelete("{key}")]
        public IActionResult Delete(string key)
        {
            if (_localResourceStorage.TryRemove(key, out _))
            {
                return Ok();
            }
            var errorMessage = $"Cannot delete resource with {key} key";

            return BadRequest(errorMessage);
        }

        [HttpPut]
        public ActionResult<Resource> Update([FromBody] Resource resource)
        {
            if (_localResourceStorage.ContainsKey(resource.Key))
            {
                _localResourceStorage[resource.Key] = resource.Value;

                return Ok(resource);
            }
            var errorMessage = $"Resource with {resource.Key} key was not found";

            return BadRequest(errorMessage);
        }
    }
}
