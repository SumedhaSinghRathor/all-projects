const PROJECT_API_BASE_URL = "http://localhost:3000/projects"

class ProjectService {
    async getProjects() {
        const response = await fetch(PROJECT_API_BASE_URL)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        return await response.json()
    }
}

export default new ProjectService()