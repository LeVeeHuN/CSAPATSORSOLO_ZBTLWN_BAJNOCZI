using BACKEND.Data;
using BACKEND.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controllers.TeamClusterController
{
    [Route("[controller]")]
    [ApiController]
    public class TeamClusterController : ControllerBase
    {
        private ITeamClusterRepository _repo;

        public TeamClusterController(ITeamClusterRepository repository)
        {
            _repo = repository;
        }

        #region Create

        [HttpPost]
        public void Add([FromBody] InboundRequestData data)
        {
            throw new NotImplementedException();
        }

        #endregion

        #region Read

        [HttpGet]
        public IEnumerable<TeamCluster> Get()
        {
            throw new NotImplementedException();
        }

        [HttpGet("{id}")]
        public TeamCluster Get(int id)
        {
            throw new NotImplementedException();
        }

        #endregion

        #region Update

        [HttpPut]
        public void Update([FromBody] TeamCluster teamCluster)
        {
            throw new NotImplementedException();
        }

        #endregion

        #region Delete

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            // Check if ID is valid
            TeamCluster? teamCluster = _repo.Read(id);
            if (teamCluster != null)
            {
                _repo.Delete(id);
            }
        }

        #endregion
    }
}
