const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');

const prisma = new PrismaClient();

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        const token = generateToken(user);
        res.status(201).json({ user: { id: user.id, email: user.email }, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(user);
        res.status(200).json({ user: { id: user.id, email: user.email }, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
