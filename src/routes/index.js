module.exports = (expressApp) => ({
    get: (req, res) => {
        return res.status(200).json({ message: "OK" });
    }
});
