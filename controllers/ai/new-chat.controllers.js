import { NewChat } from '../../model/ai/new-chat.model.js'

export const createNewChat = async (req, res) => {
    try {
        const { folderName } = req.body
        const userId = req.userId

        const createFolder = await NewChat.create({
            userId,
            folderName
        })

        res.status(200).json(createFolder)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const findNewChat = async (req, res) => {
    try {
        const { userId } = req.userId

        const newChat = await NewChat.find(userId).sort({ createdAt: -1 })

        if (!newChat) {
            return res.status(404).json({ message: "New Chat not found" })
        }

        res.status(200).json(newChat)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" })

    }
}

// export const newChatId = async (req, res) => {
//     try {
//         // const { userId } = req.userId
//         const { id } = req.params

//         const newChat = await NewChat.findById(id)

//         if (!newChat) {
//             return res.status(404).json({ message: "New Chat not found" })
//         }

//         res.status(200).json(newChat)
//     } catch (error) {
//         console.log(error);

//     }
// }

export const deleteChat = async (req, res) => {
    try {
        const { id } = req.params

        const deleteChat = await NewChat.findByIdAndDelete(id)

        if (!deleteChat) {
            return res.status(404).json({ message: "chat delete not found" })

        }

        res.status(200).json(deleteChat)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" })

    }
}