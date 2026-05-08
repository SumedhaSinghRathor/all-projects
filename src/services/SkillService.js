class SkillService {
    async getSkills() {
        const response = await fetch("http://localhost:3000/skills")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        return await response.json()
    }
}

export default new SkillService()