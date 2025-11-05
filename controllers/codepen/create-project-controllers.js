import { CodepenProject } from '../../model/codepen/project-model.js'


export const createProject = async (req, res) => {
    try {
        const userId = req.userId
        const { projectFolder } = req.body

        if (!projectFolder) {
            return res.status(400).json({ message: "Project name is required" })
        }

        const newProject = await CodepenProject.create({
            userId,
            projectFolder
        })

        res.status(200).json({ message: "codepen project working", newProject })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" })
    }
}

export const getProject = async (req, res) => {
    try {
        const userId = req.userId

        const findProject = await CodepenProject.find({ userId }).sort({ createdAt: -1 })

        if (!findProject) {
            return res.status(400).json({ message: "Project not found" })
        }

        res.status(200).json(findProject)


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" })

    }
}

export const projectDelete = async (req, res) => {
    try {
        const { id } = req.params

        const findProjectDelete = await CodepenProject.findByIdAndDelete(id)

        if (!findProjectDelete) {
            return res.status(400).json({ message: "Project not found" })
        }

        res.status(200).json(findProjectDelete)


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" })

    }
}