using BACKEND.Models;

namespace BACKEND.Data
{
    public interface ITeamClusterRepository
    {
        // CRUD
        /*
         *  - Create
         *  - Read
         *  - Update
         *  - Delete
         */

        void Create(TeamCluster teamCluster);

        IEnumerable<TeamCluster> Read();
        TeamCluster Read(int id);

        void Update(TeamCluster teamCluster);

        void Delete(int id);
    }
}
