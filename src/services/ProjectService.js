class ProjectService {
    async getProjects() {
        const response = await fetch("http://localhost:3000/projects")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        return await response.json()
    }
}

export default new ProjectService()