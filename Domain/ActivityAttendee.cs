namespace Domain
{
    public class ActivityAttendee
    {
        public Activity Activity { get; set; }

        public AppUser AppUser { get; set; }
        public bool IsHost { get; set; }
        public string AppUserId { get; set; }
        public Guid ActivityId { get; set; }
    }
}