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
        private int _teamCounter;

        public TeamClusterController(ITeamClusterRepository repository)
        {
            _repo = repository;
            _teamCounter = 0;
        }

        #region Create

        [HttpPost]
        public TeamCluster? Add([FromBody] InboundRequestData data)
        {
            // Check data validity
            if (data.Names.Count != data.Ages.Count)
            {
                return null;
            }
            if (data.Names.Count < data.TeamsCount)
            {
                return null;
            }

            foreach (string name in data.Names)
            {
                if (string.IsNullOrWhiteSpace(name))
                {
                    return null;
                }
            }

            // Create objects from incoming data
            List<Person> persons = new List<Person>();
            for (int i = 0; i < data.Names.Count; i++)
            {
                persons.Add(new Person { Name = data.Names[i], Age = data.Ages[i] });
            }

            // Determine the median age
            int[] ages = data.Ages.ToArray();
            Array.Sort(ages);

            float middleIndex = (ages.Length - 1) / 2.0f;
            float medianAge = (ages[(int)Math.Floor(middleIndex)] + ages[(int)Math.Ceiling(middleIndex)]) / 2.0f;

            // Seperate old people from young ones
            List<Person> oldPeople = new List<Person>();
            List<Person> youngPeople = new List<Person>();
            foreach (Person p in persons)
            {
                if (p.IsOld(medianAge))
                {
                    oldPeople.Add(p);
                }
                else
                {
                    youngPeople.Add(p);
                }
            }

            // Shuffle the separeted lists
            Person[] oldPeopleArr = oldPeople.ToArray();
            Person[] youngPeopleArr = youngPeople.ToArray();
            Random.Shared.Shuffle(oldPeopleArr);
            Random.Shared.Shuffle(youngPeopleArr);

            // Make the teams
            Team[] teams = new Team[data.TeamsCount];
            for (int i = 0; i < teams.Length; i++)
            {
                teams[i] = new Team() {Members = new List<Person>()};
            }

            // Distribute people across the teams
            _teamCounter = 0;
            DistributePeopleToTeams(teams, oldPeopleArr);
            DistributePeopleToTeams(teams, youngPeopleArr);

            TeamCluster teamCluster = new TeamCluster();
            teamCluster.Teams = teams.OfType<Team>().ToList();
            _repo.Create(teamCluster);
            return teamCluster;
        }

        #endregion

        #region Read

        [HttpGet]
        public IEnumerable<TeamCluster> Get()
        {
            return _repo.Read();
        }

        [HttpGet("{id}")]
        public TeamCluster? Get(int id)
        {
            return _repo.Read(id);
        }

        #endregion

        #region Update

        [HttpPut]
        public void Update([FromBody] TeamCluster teamCluster)
        {
            // Check if ID is valid
            TeamCluster? tc = _repo.Read(teamCluster.Id);
            if (tc != null)
            {
                _repo.Update(teamCluster);
            }
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

        private void DistributePeopleToTeams(Team[] teams, Person[] people)
        {
            for (int i = 0; i < people.Length; i++)
            {
                // If _teamCounter is out of bounds, reset it
                if (_teamCounter == teams.Length)
                {
                    _teamCounter = 0;
                }
                teams[_teamCounter].Members.Add(people[i]);
                _teamCounter++;
            }
        }
    }
}
