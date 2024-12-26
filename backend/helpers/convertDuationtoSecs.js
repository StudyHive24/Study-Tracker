// Helper function to convert duration string (e.g., '00:15') to seconds
const convertDurationToSeconds = (duration) => {
    const [hours, minutes] = duration.split(':').map(Number);
    return (hours * 3600) + (minutes * 60);
}

export default convertDurationToSeconds
