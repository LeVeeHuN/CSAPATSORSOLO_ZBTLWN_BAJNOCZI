namespace BACKEND.Models
{
    public class Person
    {
        public string Name { get; set; }
        public int Age { get; set; }

        public bool IsOld(float medianAge) => Age > medianAge;
    }
}
