using BACKEND.Models;

namespace BACKEND.Data
{
    public class TeamClusterRepository : ITeamClusterRepository
    {
        private List<TeamCluster> _data;

        private int _id;
        private int GetNextId() => _id++;

        public TeamClusterRepository()
        {
            _data = new List<TeamCluster>();
        }

        public void Create(TeamCluster teamCluster)
        {
            teamCluster.Id = GetNextId();
            _data.Add(teamCluster);
        }

        public void Delete(int id)
        {
            _data.Remove(_data.FirstOrDefault(x => x.Id == id));
        }

        public IEnumerable<TeamCluster> Read()
        {
            return _data;
        }

        public TeamCluster? Read(int id)
        {
            return _data.FirstOrDefault(x => x.Id == id);
        }

        public void Update(TeamCluster teamCluster)
        {
            TeamCluster teamClusterToUpdate = _data.FirstOrDefault(x => x.Id == teamCluster.Id);
            teamClusterToUpdate.Teams = teamCluster.Teams;
        }
    }
}
