class ExperienceService {
    async getExperience() {
        const response = await fetch("http://localhost:3000/experience")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        return await response.json()
    }
}

export default new ExperienceService()