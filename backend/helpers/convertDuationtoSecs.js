// Helper function to convert duration string to seconds
const convertDurationToSeconds = (duration) => {
    const [hours, minutes] = duration.split(':').map(Number);
    return (hours * 3600) + (minutes * 60);
}

export default convertDurationToSeconds
