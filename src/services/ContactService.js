class ContactService {
    async getContact() {
        const response = await fetch("http://localhost:3000/contacts")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        return await response.json()
    }
}

export default new ContactService()