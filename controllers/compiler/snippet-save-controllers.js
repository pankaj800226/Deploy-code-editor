import { Snippet } from '../../model/compiler/snippet-save.model.js'


export const createSnippet = async (req, res) => {
    try {
        const userId = req.userId

        const { code, language } = req.body

        if (!code || !language) {
            return res.status(400).json({ message: "Code and language are required." });
        }


        const newSnippet = await Snippet.create({
            userId,
            code,
            language
        })

        return res.status(201).json({
            success: true,
            message: "Snippet saved successfully!",
            snippet: newSnippet,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" })

    }
}

export const getUserSnippets = async (req, res) => {
    try {
        const userId = req.userId

        const getSnippet = await Snippet.find({ userId })

        if (!getSnippet) {
            return res.status(404).json({ message: "Snippet not found" })

        }

        res.status(200).json({
            success: true,
            message: "sucessfully working",
            getSnippet
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" })

    }
}