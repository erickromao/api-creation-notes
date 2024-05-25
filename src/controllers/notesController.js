const knex = require("../database/knex")

class notesController {

    async create(request, response) {
        const { title, description, tags, links } = request.body
        const { user_id } = request.params

        const [note_id] = await knex("notes").insert({
            title,
            description,
            user_id
        })

        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link
            }
        })

        await knex("links").insert(linksInsert)

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id

            }
        })

        await knex("tags").insert(tagsInsert)

        response.json({ message: "Nota criada com sucesso!" })
    }

    async show(request, response) {
        const { id } = request.params

        const noteInfos = await knex("notes").where({ id }).first()
        const TagsInfos = await knex("tags").where({ note_id: id }).orderBy("name")
        const linksInfos = await knex("links").where({ note_id: id }).orderBy("updated_at")

        return response.json({
            ...noteInfos,
            TagsInfos,
            linksInfos
        })

    }

    async delete(request, response) {
        const { id } = request.params

        await knex("notes").where({ id }).delete()

        return response.json({ message: "Nota deletada com sucesso!" })
    }

    async index(request, response) {
        const { title, user_id, tags } = request.query

        let notes

        if (tags) {
            const filterTags = tags.split(",").map(tags => tags.trim())

            notes = await knex("tags")
                .select([
                    "notes.id",
                    "notes.title",
                    "notes.user_id"
                ])
                .where("notes.user_id", user_id)
                .whereLike("notes.title", `%${title}%`)  
                .whereIn("name", filterTags)
                .innerJoin("notes", "notes.id", "tags.note_id")
                .orderBy("notes.title")

        } else {
            notes = await knex("notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy("title")
        }

        const userTags = await knex("tags").where({ user_id })
       
        const notesWithTags = notes.map(note => {
            const filterNotesTags = userTags.filter(tag => tag.note_id === note.id)
        
            return {
                ...note,
                tags: filterNotesTags
            }
        })

        return response.json(notesWithTags)

    }   
}

module.exports = notesController