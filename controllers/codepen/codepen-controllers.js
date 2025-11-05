import { Codepen } from '../../model/codepen/codepen-model.js'

export const createCode = async (req, res) => {
    try {
        const userId = req.userId
        const { codepenId } = req.params

        const { html, css, js } = req.body

        if (!html || !css || !js) {
            return res.status(400).json({ message: "html and css and js are required." });
        }

        const create = await Codepen.create({
            codepenId,
            userId,
            html,
            css,
            js
        })

        res.status(200).json(create)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' })
    }
}

export const getCodePenCode = async (req, res) => {
    try {
        const userId = req.userId
        const { codepenId } = req.params

        const latest = await Codepen.findOne({ userId, codepenId }).sort({ createdAt: -1 })

        if (!latest) {
            return res.json({ html: "", css: "", js: "" })
        }

        res.status(200).json(latest)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' })


    }
}